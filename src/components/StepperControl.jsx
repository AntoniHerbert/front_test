import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

const StepperControl = ( ) => {
    return <div className="container flex justify-around mt-4 mb-8">

        <button className=" text-slate-400 flex flex-row items-center uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer hover:bg-slate-700 hover: text-white transition duration-200 ease-in-out"><IoIosArrowBack />Anterior</button>

        <button className=" text-slate-400 flex flex-row items-center uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer hover:bg-slate-700 hover: text-white transition duration-200 ease-in-out">Próximo<IoIosArrowForward /></button>

    </div>;
};

export default StepperControl;