import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { GiHamburgerMenu } from "react-icons/gi";
import { AnimatePresence, motion } from "framer-motion";
import { useClickAway } from "react-use";
import { AiOutlineRollback } from "react-icons/ai";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [baseTokenNames, setBaseTokenNames] = useState([]);
  const ref = useRef(null);
  useClickAway(ref, () => setOpen(false));

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://scale-x.onrender.com/get-tokenlist");
      console.log(response.data);
      setBaseTokenNames(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const toggleSidebar = () => setOpen((prev) => !prev);

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="p-3 border-2  flex items-center gap-4 absolute top-5 left-5  text-white border-zinc-800 rounded-xl"
        aria-label="toggle sidebar"
      >
          <h1>All Token Price List </h1>
        <GiHamburgerMenu />
      </button>

      <AnimatePresence mode="wait" initial={false}>
        {open && (
          <>
            <motion.div
              {...framerSidebarBackground}
              aria-hidden="true"
              className="fixed bottom-0 left-0 right-0 top-0 z-40 bg-[rgba(0,0,0,0.1)] backdrop-blur-sm"
            ></motion.div>

            <motion.div
              {...framerSidebarPanel}
              className="fixed top-0 no-scrollbar bottom-0 left-0 z-50 w-full max-w-xs border-r-2 border-zinc-800  backdrop-blur-xl   bg-black/30 text-white overflow-y-auto scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-gray-200"
              ref={ref}
              aria-label="Sidebar"
            >
              <div className="flex  items-center justify-between p-5 border-b-2 border-zinc-800">
                <span className=" text-xl">Token List In DataBase</span>
                <button
                  onClick={toggleSidebar}
                  className="p-3 border-2 text-white border-zinc-800 rounded-xl"
                  aria-label="close sidebar"
                >
                  <AiOutlineRollback />
                </button>
              </div>
              <ul>
                {baseTokenNames.map((tokenName, idx) => (
                  <li key={idx}>
                    <Link
                      to={`/tokenID/${tokenName._id}`}
                      onClick={toggleSidebar}
                      className="flex items-center justify-between gap-5 p-5 transition-all border-b-2 hover:bg-zinc-900 border-zinc-800"
                    >
                      <motion.span {...framerText(idx)}>
                        {tokenName.baseToken.name}
                      </motion.span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

const framerSidebarBackground = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0, transition: { delay: 0.2 } },
  transition: { duration: 0.3 },
};

const framerSidebarPanel = {
  initial: { x: "-100%" },
  animate: { x: 0 },
  exit: { x: "-100%" },
  transition: { duration: 0.3 },
};

const framerText = (delay) => {
  return {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    transition: {
      delay: 0.1 + delay / 10,
    },
  };
};

export default Sidebar;
