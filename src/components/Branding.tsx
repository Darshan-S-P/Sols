import React,{FC} from 'react'

const Branding:FC = ({image,title,message}) => {
  return (
    <div className="ps-4 hidden py-4 lg:block">
      <div className="relative h-full w-full overflow-hidden rounded-xl "> 
        <img src={`assets/images/ai/${image}.jpg`} alt="" />
      </div>
    </div>
  );
};

export default Branding;