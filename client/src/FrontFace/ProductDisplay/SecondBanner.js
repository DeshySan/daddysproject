import React from "react";
import clickcollect from "../../assets/clickcollect.png";
import freeshipping from "../../assets/freeshipping.png";
const secondBanner = () => {
  return (
    <div className='mx-20 flex justify-center items-center'>
      <div>
        <img src={clickcollect} alt='' className='h-[450px] w-[650px]' />
      </div>
      <div>
        <img src={freeshipping} alt='' className='h-[450px] w-[650px]' />
      </div>
    </div>
  );
};

export default secondBanner;
