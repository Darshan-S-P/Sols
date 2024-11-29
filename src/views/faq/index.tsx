import { FC } from 'react';

export const FaqView: FC = ({}) => {
  const questions = [
    {
      question: "What is this application about?",
      answer:
        "This application is a decentralized NFT Marketplace that allows users to mint, buy, sell, and trade Non-Fungible Tokens (NFTs) on the Solana blockchain.",
      id: "faq-1",
    },
    {
      question: "How do I create an NFT?",
      answer:
        "To create an NFT, click on the Mint NFT button on the platform. Upload your artwork, add metadata like name and description, and confirm the transaction using your Solana wallet.",
      id: "faq-2",
    },
    {
      question: "What wallet should I use?",
      answer:
        "We recommend using wallets compatible with the Solana blockchain, such as Phantom or Solflare. Ensure your wallet is funded with Solana (SOL) for transactions.",
      id: "faq-3",
    },
    {
      question: "Are there any fees for buying or selling NFTs?",
      answer:
        "Yes, there are small transaction fees for minting, buying, and selling NFTs, which are paid in SOL. These fees go to the blockchain validators to process transactions.",
      id: "faq-4",
    },
    {
      question: "Is this platform secure?",
      answer:
        "Yes, the platform leverages blockchain technology to ensure all transactions are secure, transparent, and immutable. Additionally, user data is protected through wallet integrations rather than centralized storage.",
      id: "faq-5",
    },
    {
      question: "What happens if I lose access to my wallet?",
      answer:
        "If you lose access to your wallet, you will not be able to recover your NFTs or funds. We recommend securely storing your wallet's recovery phrase and never sharing it with anyone.",
      id: "faq-6",
    },
  ];

  return (
    <section id='faq' className='py-20'>
      <div className="container">
        <div className="mb-10 flex items-end justify-between">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className='mb-4 text-3xl font-medium capitalize text-white'>
              Any Question
            </h2>
            <p className='text-default-200 text-xl font-medium'>
              Here are the most frequently asked questions on Solana Token
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-3xl">
          <div className="hs-accordion-group space-y-4">
            {questions.map((question, index) => (
              <div key={index} className={`hs-accordion bd-default-950/40 overflow-hidden rounded-lg bordder border-white/10 backdrop-blur-3xl`} id={question.id}>
                <button className='hs-accordion-toggle inline-flex items-center justify-between gap-x-3 px-6 py-4 text-left capitalize text-white tansition-all'
                  aria-controls={`faq-accordion-${index + 1}`}>
                  <h5 className='flex text-2xl font-semibold'> {/* Increased font size here */}
                    <i className='m2-3 h-5 w-5 stroke-white align-middle'></i>
                    {question.question}
                  </h5>
                  <i className='hs-accordion-active:-rotate-180 h-4 w-4 transition-all duration-500'></i>
                </button>
                <div id={`faq-accordion-${index + 1}`} className='hs-accordion-content w-full overflow-hidden trasition-[height] duration-300'
                  aria-labelledby={question.id}>
                  <div className="px-6 pb-4 pt-0">
                    <p className='text-default-300 mb-2 text-l font-medium'>
                      {question.answer}
                    </p>
                    
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}