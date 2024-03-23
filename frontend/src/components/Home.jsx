import React from "react";
import PriceCard from "./utils/PriceCard";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import NavBar from "./utils/NavBar";
import { toast } from "sonner";

const Home = (props) => {
  const { checker } = props;
  const [data, setData] = useState([]);

  const { ID } = useParams();
  useEffect(() => {
    if (checker) {
      axios
        .get(
          "https://api.dexscreener.com/latest/dex/tokens/inj19dtllzcquads0hu3ykda9m58llupksqwekkfnw"
        )
        .then((res) => {
          // console.log(res.data);
          setData(res.data);
          toast.success("Sample Data Fetched Successfully",{
            position:"bottom-right"
          });
        });
    } else {
      if (ID) {
        axios
          .get(`http://localhost:3000/getPrice/${ID}`)
          .then((res) => {
            // console.log(res.data);
            setData(res.data);
            toast.success("Data Fetched Successfully",{
              position:"bottom-right"
            });
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      }
    }
  }, [checker, ID]);
  return (
    <>
      <div className="h-full ">
        <NavBar />
        {checker && checker ? (
          <div className=" flex items-center  flex-col text-white ">
            <div className="mt-[8%] flex flex-col  gap-4 items-center justify-center">
              <h1 className="  text-5xl font-thin">
                BABY <span className=" font-semibold">DOJO</span>
              </h1>
              <h1 className=" text-xl font-thin">ChainID type : injective</h1>
            </div>
            <div className=" flex flex-col  mt-[5%] items-center justify-center">
              <div
                className=" bg-gradient-to-r from-black via-pink-700/60 to-black
      rounded-full  absolute  z-30  blur-3xl   w-[100%] h-[15rem]"
              ></div>
              <div className=" flex flex-col gap-10 z-30">
                <div className=" flex items-center  gap-10">
                  <PriceCard
                    name={"BABYDOJO Price"}
                    price={
                      data && data.pairs && data.pairs.length > 0
                        ? data.pairs[0].priceUsd
                        : 0
                    }
                  />
                  <PriceCard
                    name={"Volume h24"}
                    price={
                      data && data.pairs && data.pairs.length > 0
                        ? data.pairs[0].volume.h24
                        : 0
                    }
                  />
                  <PriceCard
                    name={"Volume h6"}
                    price={
                      data && data.pairs && data.pairs.length > 0
                        ? data.pairs[0].volume.h6
                        : 0
                    }
                  />
                </div>
                <div className=" flex items-center  gap-10">
                  <PriceCard
                    name={"Name"}
                    price={
                      data && data.pairs && data.pairs.length > 0
                        ? data.pairs[0].baseToken.name
                        : 0
                    }
                  />
                  <PriceCard
                    name={"Volume h1"}
                    price={
                      data && data.pairs && data.pairs.length > 0
                        ? data.pairs[0].volume.h1
                        : 0
                    }
                  />
                  <PriceCard
                    name={"Volume m5"}
                    price={
                      data && data.pairs && data.pairs.length > 0
                        ? data.pairs[0].volume.m5
                        : 0
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className=" flex items-center  flex-col text-white ">
            <div className="mt-[8%] flex flex-col  gap-4 items-center justify-center">
              <h1 className="  text-5xl font-thin uppercase">
                {data.baseToken ? data.baseToken.name : ""}
              </h1>
              <h1 className=" text-xl font-thin">ChainID type : injective</h1>
            </div>
            <div className=" flex flex-col  mt-[5%] items-center justify-center">
              <div
                className=" bg-gradient-to-r from-black via-pink-700/60 to-black
    rounded-full  absolute  z-30  blur-3xl   w-[100%] h-[15rem]"
              ></div>
              <div className=" flex flex-col gap-10 z-30">
                <div className=" flex items-center  gap-10">
                  <PriceCard
                    name={data.baseToken ? `${data.baseToken.name} Price` : ""}
                    price={data && data.priceUsd ? data.priceUsd : 0}
                  />
                  <PriceCard
                    name={"Volume h24"}
                    price={data && data.volume ? data.volume.h24 : 0}
                  />
                  <PriceCard
                    name={"Volume h6"}
                    price={data && data.volume ? data.volume.h6 : 0}
                  />
                </div>
                <div className=" flex items-center  gap-10">
                  <PriceCard
                    name={"Name"}
                    price={data.baseToken ? data.baseToken.name : ""}
                  />
                  <PriceCard
                    name={"Volume h1"}
                    price={data && data.volume ? data.volume.h1 : 0}
                  />
                  <PriceCard
                    name={"Volume m5"}
                    price={data && data.volume ? data.volume.m5 : 0}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
