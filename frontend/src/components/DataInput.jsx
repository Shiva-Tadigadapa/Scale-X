import React, { useState } from "react";
import axios from "axios";
import InputField from "./InputFeild";
import { Toaster, toast } from 'sonner'
import { Link } from "react-router-dom";
import { IoHome } from "react-icons/io5";



const DataInput = () => {
  const [pair, setPair] = useState({
    chainId: "injective",
    dexId: "dojoswap",
    pairAddress: "",
    baseToken: {
      address: "",
      name: "",
      symbol: "babyDOJO",
    },
    quoteToken: {
      address: "",
      name: "Dojo Token",
      symbol: "DOJO",
    },
    priceNative: "0.006545",
    priceUsd: "",
    txns: {
      m5: { buys: 1, sells: 110 },
      h1: { buys: 0, sells: 45 },
      h6: { buys: 3, sells: 34 },
      h24: { buys: 1, sells: 76 },
    },
    volume: { h24: 0, h6: 0, h1: 0, m5: 0 },
    priceChange: { m5: 232, h1: 32, h6: 2.3, h24: 2.32 },
    liquidity: { usd: 3232323, base: 33233, quote: 22323 },
    pairCreatedAt: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [parentName, childName] = name.split(".");
    if (childName) {
      setPair((prevState) => ({
        ...prevState,
        [parentName]: {
          ...prevState[parentName],
          [childName]: value,
        },
      }));
    } else {
      setPair((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("https://scale-x.onrender.com/pairs", pair);
      console.log(response);
  
      // Check if the response status is OK (2xx range)
      if (response.status >= 200 && response.status < 300) {
        // Assuming your response contains the data you need
        console.log(response.data);
        toast.success(`${pair.baseToken.name} has been successfully submitted to MongoDB!`);
      } else {
        // Handle non-2xx status codes
        console.error("Error submitting data:", response.statusText);
        toast.error("Error submitting data");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error(`Error submitting data: Enter Number only in volume and price fields`);
    }
  };
  
  

  return (
    <>
     <Link to="/">
        <div className="absolute flex items-center justify-center text-white top-5  transform translate-x-1/2">
          <button
            className="p-3 border-2 flex items-center justify-center gap-3 text-white border-zinc-800 rounded-xl"
            aria-label="toggle sidebar"
          >
            <h1>Go to Sample Data Set</h1>
            <IoHome />
          </button>
        </div>
      </Link>
      <div className="bg-[#323232] flex flex-col  items-center justify-evenly h-[100vh]">
        <h1 className=" text-4xl text-white">Enter The Following Details</h1>
        <form
          onSubmit={handleSubmit}
          className=" gap-10 flex flex-col text-white   items-center justify-center  "
        >
          <div className="flex text-xl    items-center  justify-center">
            <InputField
              label="Base Token Name:"
              name="baseToken.name"
              value={pair.baseToken.name}
              onChange={handleChange}
            />
          </div>
          <div className="flex text-lg  gap-5 flex-col items-center justify-evenly">
            <h1 className="text-2xl text-zinc-300">
              Enter Your Volume Data Here
            </h1>
            <div className=" flex  w-[100vw] justify-evenly ">
              <div className=" flex flex-col items-center justify-center gap-5">
                <InputField
                  label="h24 Volume:"
                  name="volume.h24"
                  value={pair.volume.h24}
                  onChange={handleChange}
                />
                <InputField
                  label="h6 Volume:"
                  name="volume.h6"
                  value={pair.volume.h6}
                  onChange={handleChange}
                />
              </div>

              <div className=" flex flex-col items-center justify-center gap-5">
                <InputField
                  label="h1 Volume:"
                  name="volume.h1"
                  value={pair.volume.h1}
                  onChange={handleChange}
                />
                <InputField
                  label="m5 Volume:"
                  name="volume.m5"
                  value={pair.volume.m5}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="  text-lg text-zinc-300 flex flex-col gap-5 justify-center items-center">
            <h1 className="text-2xl text-zinc-300" >Enter Your Price Details.</h1>
            <InputField
              label="Price (USD):"
              name="priceUsd"
              value={pair.priceUsd}
              onChange={handleChange}
            />
          </div>
          <button
            className="bg-[#323232] border px-8  rounded-lg py-3 hover:bg-white hover:text-black hover:border-[#323232]"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default DataInput;
