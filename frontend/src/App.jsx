import { useState } from "react";
import DataInput from "./components/DataInput";
import { Toaster, toast } from "sonner";
import Home from "./components/Home";
import { Routes, Route, useLocation } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="h-[100vh] bg-black">
        <Toaster position="top-center" richColors />
        <Routes>
          <Route path="/" element={<Home checker={1} />} />
          <Route
            path="*"
            element={
              <h1 className=" text-white text-5xl  flex items-center justify-center h-full">
                Page Not Found😔
              </h1>
            }
          />
          <Route path="/dataInput" element={<DataInput />} />
          <Route path="/tokenID/:ID" element={<Home checker={0} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
