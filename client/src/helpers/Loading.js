import React from "react";

const Loading = () => {
  return (
    <div className='fixed inset-0 bg-slateGray bg-opacity-80 flex justify-center items-center'>
      <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-solid'></div>
    </div>
  );
};

export default Loading;
