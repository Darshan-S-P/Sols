import React, {FC} from 'react'
import { LuArrowRightFromLine } from 'react-icons/lu';
import { RiTokenSwapFill } from 'react-icons/ri';
import { RxTokens } from 'react-icons/rx';
import { MdGeneratingTokens, MdToken } from 'react-icons/md';



interface FeatureViewProps {
  setOpenAirdrop: (value: boolean) => void;
  setOpenContact: (value: boolean) => void;
  setOpenCreateModal: (value: boolean) => void;
  setOpenSendTransaction: (value: boolean) => void;
  setOpenTokenMetaData: (value: boolean) => void;
}

export const FeatureView: FC<FeatureViewProps> = ({
  setOpenAirdrop,
  setOpenContact,
  setOpenCreateModal,
  setOpenSendTransaction,
  setOpenTokenMetaData,
}) => {

  const features = [

  {
    name:"Token Generator",
    icon:<MdGeneratingTokens/>,
    description:"Start working with solana token creator, It allow you to create dolana token by creating and deploying , airdrop, transfering and updating token ",
    function:setOpenCreateModal
  },
  {
    name:"Get Airdrop",
    icon:<MdToken/>,
    description:"Start working with solana token creator, It allow you to create dolana token by creating and deploying , airdrop, transfering and updating token ",
    function:setOpenAirdrop,
  },
  {
    name:"Transfer Sol",
    icon:<RiTokenSwapFill/>,
    description:"Start working with solana token creator, It allow you to create dolana token by creating and deploying , airdrop, transfering and updating token ",
    function:setOpenSendTransaction
  },
  {
    name:"Token MetaData",
    icon:<RxTokens/>,
    description:"Start working with solana token creator, It allow you to create dolana token by creating and deploying , airdrop, transfering and updating token ",
    function:setOpenTokenMetaData
  },
  ];

  return (
 <section className='py-20'>
  <div className="container">
    <div className="mb-10 flex items-end justify-between">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className='mb-4 text-3xl font-medium capitalize text-white'>
          choose Solana Blockchain generator
        </h2>
        <p className='text-default-200 text-sm font-medium'> Now you can create Solana Toekn <br/>
        to without code instanly</p>

      </div>
    </div>
    <div className='bg-default-950/40 flex flex-wrap item-center rounded-3xl backdrop-blur-3xl'>
    {features.map((list, index) => 
    <div key= {index} className={`w-auto grow border-b border-white/10 md:w-1/2 ${ index == 0? "md:border-e" : index == 1 ? "" : index == 2 ? "md:border-e md:border-b-0" : ""}`}>

      <div className="p-8 sm:p-10">
        <div className="bg-primary/10 text-primary mb-10 inline-flex h-16 w-16 items-center justify-center rounded-xl">
        <i data-lucide='farmer'>
          {list.icon}
        </i>
        </div>
        <h2 className='mb-4 text-2xl font-medium text-white'>
          {list.name}
        </h2>
        <p className='text-default-200 mb-6 text-base'>
          {list.description}
        </p>

        <a onClick={() => list.function(true)} className='hover:bg-primary inline-flex items-center justify-center gap-2 rounded-full bordder border-white/10 px-6 py-2 text-white transition-all duration-200'>
      Use Tools 
      <i>
        <LuArrowRightFromLine/>
      </i>
        </a>
      </div>

     </div> 
    )}
    </div>
  </div>
 </section>
  )
}

