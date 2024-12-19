import React from "react"; 

const Stepper = ( )=> {
    return (<div className="mx-4 p-4 flex justify-between items-center">
        <div  className="relative flex flex-col items-center text-teal-600">

        
            <div className=" transition duration-500 ease-in-out border-t-2 border-teal-600 flex items-center justify-center py-3" >1.Dados da empresa</div>
            <div  className="absolute top-0 text-center mt-16 w-32 text-xs font-medium uppercase"></div>
        </div>
        <div className="flex-auto border-t-2 transition duration-500 ease-in-out"></div>
    </div>);
};

export default Stepper;