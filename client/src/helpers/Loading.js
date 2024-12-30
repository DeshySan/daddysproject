import React from "react";

const Loading = () => {
  return (
    <div className='fixed inset-0 bg-slateGray bg-opacity-100 flex justify-center items-center z-50'>
      <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-solid'></div>
    </div>
  );
};

export default Loading;
