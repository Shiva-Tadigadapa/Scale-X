import React from "react";

const PriceCard = (props) => {
    const { name,price } = props;
  return (
    <div className=" border border-white/10  z-50  rounded-xl px-5 py-5 bg-zinc-900/60 flex flex-col  gap-2 w-[20rem]">
      <h1 className=" uppercase text-md">{name}</h1>
      <p className=" text-2xl font-bold">{price}</p>
    </div>
  );
};

export default PriceCard;
