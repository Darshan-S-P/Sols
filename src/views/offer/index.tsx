import React, { FC } from 'react';

export const OfferView: FC = () => {
  return (
    <section id="features" className='py-20'>
      <div className="container">
        <div className="mb-10 flex items-end justify-between">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className='mb-4 text-3xl font-medium capitalize text-white'>
              Solana Token Popularity
            </h2>
            <p className='text-default-100 text-xl font-medium'>
              Here are some reviews written by some of our customers<br />
             
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* first Section */}
          <div className='space-y-6'>
            <div className="bg-default-950/40 hover:-translate-y-2 border-primary border-s-2 rounded-xl backdrop-blur-3xl transition-all duration-500">
              <div className="p-10">
                <h3 className='mb-4 mt-8 text-2xl font-medium text-white'>
                John D
                </h3>

                <p className='text-default-100 mb-4 text-sm font-medium'>
                "The Solana Token Builder exceeded my expectations! It made creating and managing tokens on the Solana blockchain seamless and incredibly fast. Highly recommend it to developers and creators!"
                </p>
                <a href="" className='text-primary group relative inline-flex items-center gap-2'>
                  
                </a>
              </div>
            </div>
          </div>

          {/* second Section */}
          <div className='space-y-6'>
            <div className="bg-default-950/40 hover:-translate-y-2 border-primary border-s-2 rounded-xl backdrop-blur-3xl transition-all duration-500">
              <div className="p-10">
                <h3 className='mb-4 mt-8 text-2xl font-medium text-white'>
                Sarah M.
                </h3>

                <p className='text-default-100 mb-4 text-sm font-medium'>
                "A fantastic tool for anyone looking to dive into token creation. The user interface is intuitive, and the platform provides all the features you need for token management."                </p>
                <a href="" className='text-primary group relative inline-flex items-center gap-2'>
                 
                </a>
              </div>
            </div>
          </div>

          {/* third Section */}
          <div className='space-y-6'>
            <div className="bg-default-950/40 hover:-translate-y-2 border-primary border-s-2 rounded-xl backdrop-blur-3xl transition-all duration-500">
              <div className="p-10">
                <h3 className='mb-4 mt-8 text-2xl font-medium text-white'>
                Alex T.
                </h3>

                <p className='text-default-100 mb-4 text-sm font-medium'>
                "I was new to blockchain development, but this platform made it easy to mint and trade tokens without any hassle. Great job!"

                </p>
                <a href="" className='text-primary group relative inline-flex items-center gap-2'>
                  
                </a>
              </div>
            </div>
          </div>
          <div className='space-y-6'>
            <div className="bg-default-950/40 hover:-translate-y-2 border-primary border-s-2 rounded-xl backdrop-blur-3xl transition-all duration-500">
              <div className="p-10">
                <h3 className='mb-4 mt-8 text-2xl font-medium text-white'>
                Emma K.
                </h3>

                <p className='text-default-100 mb-4 text-sm font-medium'>
                "The responsiveness of the platform and the ease of use make it a standout in the crypto space. Love the design and the performance!"
                </p>
               
              </div>
            </div>
          </div>
          <div className='space-y-6'>
            <div className="bg-default-950/40 hover:-translate-y-2 border-primary border-s-2 rounded-xl backdrop-blur-3xl transition-all duration-500">
              <div className="p-10">
                <h3 className='mb-4 mt-8 text-2xl font-medium text-white'>
                Michael R.
                </h3>

                <p className='text-default-100 mb-4 text-sm font-medium'>
                "I've been using this for a while now, and I must say it's one of the best platforms for token building. The integration with wallets like Phantom is seamless, and transactions are super smooth."
                </p>
                <a href="" className='text-primary group relative inline-flex items-center gap-2'>
                 
                </a>
              </div>
            </div>
          </div>
          <div className='space-y-6'>
            <div className="bg-default-950/40 hover:-translate-y-2 border-primary border-s-2 rounded-xl backdrop-blur-3xl transition-all duration-500">
              <div className="p-10">
                <h3 className='mb-4 mt-8 text-2xl font-medium text-white'>
                Olivia H.
                </h3>

                <p className='text-default-100 mb-4 text-sm font-medium'>
                "The support team was quick to respond to my questions, and the platform is both powerful and user-friendly. Highly recommend it to anyone in the NFT and token space!"
                </p>
                <a href="" className='text-primary group relative inline-flex items-center gap-2'>
                  
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};