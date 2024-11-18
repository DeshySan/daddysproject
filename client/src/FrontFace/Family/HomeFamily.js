import React, { useEffect, useState } from "react";
import Dashboard from "../Dashboard";
import axios from "axios";

const HomeFamily = () => {
  const [family, setFamily] = useState(null);

  const getFamilyDetails = async () => {
    try {
      const { data } = await axios.get(`/api/v1/family/get-family`);
      //   console.log(data);
      const filteredFamily = data.family?.filter((item) => item.image);

      setFamily(filteredFamily);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getFamilyDetails();
  }, []);
  return (
    <>
      <div className='flex justify-center  items-center w-full flex-col md:flex-row space-x-1 '>
        {family?.map((item) => (
          <div
            className='firstFam mx-4 w-full sm:w-1/2 md:1/2 h-[800px] relative bg-cover bg-no-repeat bg-center flex justify-center items-center '
            style={{
              backgroundImage: `url(http://localhost:1234/${item.image})`,
            }}>
            <div className='bg-black bg-opacity-60 w-full h-full flex justify-center items-center'>
              <h1 className='text-3xl font-semibold text-white text-center'>
                {item.name}
              </h1>
            </div>
          </div>
        ))}
      </div>
      <div className='flex justify-center  items-center w-full flex-col md:flex-row space-x-1 mt-4'>
        {family?.slice(2, 4).map((item) => (
          <div
            className='firstFam mx-4 w-full sm:w-1/2 md:1/2 h-[800px] relative bg-cover bg-no-repeat bg-center flex justify-center items-center '
            style={{
              backgroundImage: `url(http://localhost:1234/${item.image})`,
            }}>
            <div className='bg-black bg-opacity-60 w-full h-full flex justify-center items-center'>
              <h1 className='text-3xl font-semibold text-white text-center'>
                {item.name}
              </h1>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default HomeFamily;
