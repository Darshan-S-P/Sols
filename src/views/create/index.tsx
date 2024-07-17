import React, { FC, useCallback, useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Keypair, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import { MINT_SIZE, TOKEN_PROGRAM_ID, createInitializeMintInstruction, getMinimumBalanceForRentExemptMint, getAssociatedTokenAddress, createMintToInstruction, createAssociatedTokenAccountInstruction } from '@solana/spl-token';
import { PROGRAM_ID, createCreateMetadataAccountV3Instruction } from '@metaplex-foundation/mpl-token-metadata';
import { notify } from '../../utils/notifications';
import { ClipLoader } from 'react-spinners';
import Branding from '../../components/Branding';
import { InputView } from "../index";
import { useNetworkConfiguration } from 'contexts/NetworkConfigurationProvider';
//UI part import
import { AiOutlineClose } from 'react-icons/ai';
import CreateSVG from '../../components/SVG/CreateSVG';
import axios from 'axios';

export const CreateView: FC = ({ setOpenCreateModal }) => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const { networkConfiguration } = useNetworkConfiguration();

    const [tokenUri, setTokenUri] = useState("");
    const [tokenMintAddress, setTokenMintAddress] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [token, setToken] = useState({
        name: "",
        symbol: "",
        decimals: "",
        amount: "",
        image: "",
        description: ""
    });

    const handleFormFieldChange = (fieldName, e) => {
        setToken({ ...token, [fieldName]: e.target.value });
    };

    // Create Token Function
    const createToken = useCallback(
        async (token) => {
            const lamports = await getMinimumBalanceForRentExemptMint(connection);
            const mintKeypair = Keypair.generate();
            const tokenATA = await getAssociatedTokenAddress(
                mintKeypair.publicKey,
                publicKey
            );
            try {
                const metadataUrl = await uploadMetadata(token);
                console.log(metadataUrl);

                const createMetadataInstruction = 
                createCreateMetadataAccountV3Instruction({
                    metadata: PublicKey.findProgramAddressSync(
                        [
                            Buffer.from("metadata"),
                            PROGRAM_ID.toBuffer(),
                            mintKeypair.publicKey.toBuffer(),
                        ],
                        PROGRAM_ID
                    )[0],
                    mint: mintKeypair.publicKey,
                    mintAuthority: publicKey,
                    payer: publicKey,
                    updateAuthority: publicKey,
                },
                {
                  createMetadataAccountArgsV3:{
                    data:{
                      name:token.name,
                      symbol:token.symbol,
                      uri:metadataUrl,
                      creators:null,
                      sellerFeeBasisPoints:0,
                      uses: null,
                      collection: null,
                    },
                    isMutable: false,
                    collectionDetails: null,
                    },
                  }
                );

                const createNewTokenTransaction = new Transaction().add(
                  SystemProgram.createAccount({
                    fromPubkey: publicKey,
                    newAccountPubkey: mintKeypair.publicKey,
                   space: MINT_SIZE,
                   lamports: lamports,
                   programId: TOKEN_PROGRAM_ID,
                  }),
                  createInitializeMintInstruction(
                    mintKeypair.publicKey,
                    Number(token.decimals),
                    publicKey,
                    publicKey,
                    TOKEN_PROGRAM_ID
                  ),
                  createAssociatedTokenAccountInstruction(
                    publicKey,
                    tokenATA,
                    publicKey,
                    mintKeypair.publicKey

                  ),
                  createMintToInstruction(
                    mintKeypair.publicKey,
                    tokenATA,
                    publicKey,
                    Number(token.amount)* Math.pow(10, Number(token.decimals))
                  ),
                  createMetadataInstruction
                );
                const signature = await sendTransaction(
                  createNewTokenTransaction,
                  connection,
                  {
                    signers: [mintKeypair],
                  }
                );
                setTokenMintAddress(mintKeypair.publicKey.toString());
                notify({
                  type:"success",
                  message:"Token creation successfully",
                  txid:signature,
                });

            } catch (error: any) {
                notify({type: "error",message:"Token creation failed, try later"});
            }
            setIsLoading(false);
        },
        [ publicKey, connection, sendTransaction]
    );

    // Image Upload IPFS
    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const imgUrl = await uploadImagePinata(file);
            setToken({ ...token, image: imgUrl });
        }
    };

    const uploadImagePinata = async (file) => {
        if (file) {
            try {
                const formData = new FormData();
                formData.append("file", file);

                const response = await axios({
                    method: 'post',
                    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                    data: formData,
                    headers: {
                        pinata_api_key: "0281214db5108a6f5901",
                        pinata_secret_api_key: "d427682fe9525e6fc5fb2114fa587ae12bff36f50ead3bad1379dcc0fcb253fb",
                        "Content-Type": "multipart/form-data",
                    },
                });

                const ImgHash = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
                return ImgHash;
            } catch (error:any) {
                notify({ type: "error", message: "Upload to Pinata failed" });
            }
            setIsLoading(false);
        }
    };

    // Metadata
    const uploadMetadata = async (token) => {
        setIsLoading(true);
        const { name, symbol, description, image } = token;
        if (!name || !symbol || !description || !image) {
            return notify({type:"error", message:"Data is Missing"});
        }

        const data = JSON.stringify({
            name: name,
            symbol: symbol,
            description: description,
            image: image
        });

        try {
            const response = await axios({
                method: 'POST',
                url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
                data: data,
                headers: {
                    pinata_api_key: "0281214db5108a6f5901",
                    pinata_secret_api_key: "d427682fe9525e6fc5fb2114fa587ae12bff36f50ead3bad1379dcc0fcb253fb",
                    "Content-Type": "application/json",
                },
            });

            const url = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
            return url;
        } catch (error) {
            notify({ type: "error", message: "Upload to Pinata JSON failed" });
        }
        setIsLoading(false);
    };

    return( <>
    {isLoading &&(
          <div className="absolute top-0 left-0 z-50
          flex h-screen w-full items-center
          justify-center bg-black/[.3] backdrop-blur-
          [10px]"> 
            <ClipLoader />
          </div>
        )}
        {!tokenMintAddress ? (
          <section className="flex w-full
          items-center py-6 px-0 lg:h-screen lg:p-10">
            <div className="container">
              <div className="bg-default-950/40
              mx-auto max-w--5xl overflow-hidden rounded-2xl backdrop-blur-2xl">
                <div className="grid gap-10 lg:grid-cols-2">
                  <div className="ps-4 hidden py-4 pt-10 lg:block">
                    <div className="upload relative w-full overflow-hidden rounded-xl">
                      {token.image ?(
                          <img src={token.image} alt="token" className="w-full max-w-full" />
                        ):(
                          <label htmlFor="file" className="custum-file-upload">
                            <div className="icon">
                              <CreateSVG/>
                            </div>
                            <div className="text">
                              <span>Click To Upload Image</span>
                            </div>
                            <input type="file" id="file" onChange={handleImageChange}/>
                          </label>
                        )}
                    </div>
                    <textarea rows="6" onChange={(e)=>handleFormFieldChange("description", e)} className="border-default-200 relative mt-48 block w-full rounded border-white/10 bg-transparent py-1.5 px-3 text-white/80 focus:border-white/25 focus:ring-transparent"
                      placeholder="Description of your token ">
                    </textarea>
                    </div>

                    <div className="lg:ps-0 flex flex-col p-10">
                      <div className="pb-6 my-auto">
                        <h4 className="mb-4 text-2xl font-bold text-white">
                          Solana Token Creator
                        </h4>
                        <p className="text-default-300 mb-8 max-w-sm">
                          Kindly provide all the details about your token  
                        </p>

                        <div className="text-start">
                          <InputView name="Name"
                          placeholder="name"
                          clickhandle={(e)=>
                            handleFormFieldChange
                            ("name", e)}/>
                            <InputView name="Symbol"
                          placeholder="symbol"
                          clickhandle={(e)=>
                            handleFormFieldChange
                            ("symbol", e)}/>
                            <InputView name="Decimals"
                          placeholder="decimals"
                          clickhandle={(e)=>
                            handleFormFieldChange
                            ("decimals", e)}/>
                            <InputView name="Amount"
                          placeholder="amount"
                          clickhandle={(e)=>
                            handleFormFieldChange
                            ("amount", e)}/>
                            <div className="mb-6 text-center"> 
                            <button onClick={()=> createToken(token)} className="bg-primary-600/90 hover:bg-primary-600 group mt-5 inline-flex w-full items-center justify-center rounded-lg px-6 py-2 text-white backdrop-blur-2xl transition-all duration-500
                            "type="submit">
                              <span className="fw-bold">Create Token </span>
                            </button>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="text-center"> 
                          <ul className="flex flex-wrap items-center justify-center gap-2">
                            <li>
                              <a onClick={()=>setOpenCreateModal(false)} className="group inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur-2xl transition-all duration-500 hover:bg-blue-600/60">
                                <i className="text-2xl text-white group-hover:text-white">
                                  <AiOutlineClose/>
                                </i>
                                </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
            </div>  
          </section>

        ):(
          <section className="flex w-full
          items-center py-6 px-0 lg:h-screen lg:p-10">
            <div className="container">
              <div className="bg-default-950/40
              mx-auto max-w--5xl overflow-hidden rounded-2xl backdrop-blur-2xl">
                <div className="grid gap-10 lg:grid-cols-2">
                {/* //First */}
                <Branding 
                image="auth-img"
                title="To Build your solana token Creator"
                message="Try and create your first ever solana project"
                />
                {/* SECOND */}
                <div className="lg:ps-0 flex h-full flex-col p-10">
                  <div className="pb-10">
                    <a className="flex">
                      <img src="assets/images/logo1.png" alt="" className="h-10" />
                    </a>
                  </div>
                  <div className="my-auto pb-6 text-center"> 
                    <h4 className="mb-4 text-2xl font-bold text-white">
                      Link to your new token
                    </h4>
                    <p className="text-default-300 mx-auto mb-5 max-w-sm"> 
                      Your Solana token is successfully created,Check now explorer
                    </p>
                    <div className="flex items-start justify-center"> 
                      <img src={token.image || "assets/images/logo1.png"} alt="" className="h-40" />
                    </div>

                    <div className="mt-5 w-full text-center"> 
                      <p className="text-default-300 text-base font-medium leading-6"> 
                        <InputView name={"Token Adress"} placeholder={tokenMintAddress}/>
                        <span className="cursor-pointer" onClick={()=> navigator.clipboard.writeText(tokenMintAddress)}> 
                          Copy
                        </span>
                      </p>
                      <div className="mb-6 text-center"> 
                        <a href={`https://explorer.solana.com/address/${tokenMintAddress}?cluster=${networkConfiguration}`}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-primary-600/90 hover:bg-primary-600 group mt-5 inline-flex w-full items-center justify-center rounded-lg px-6 py-2 text-white backdrop-blur-2xl transition-all duration-500"
                        >
                          <span className="fw-bold"> 
                            View On Solana
                          </span>
                        </a>
                      </div>

                      <div>
                        <div className="text-center"> 
                          <ul className="flex flex-wrap items-center justify-center gap-2">
                            <li>
                              <a onClick={()=>setOpenCreateModal(false)} className="group inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur-2xl transition-all duration-500 hover:bg-blue-600/60">
                                <i className="text-2xl text-white group-hover:text-white">
                                  <AiOutlineClose/>
                                </i>
                                </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </div>  
          </section>
        )}
    </>
    );
};