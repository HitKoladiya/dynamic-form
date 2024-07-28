import React, { useState } from 'react';

interface TooltipProps {
    info: string;
    validation: string[];
}

const Tooltip: React.FC<TooltipProps> = ({ info ,validation }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    const validationMessage = validation.join(' and ').replace(/_/g, ' ');
    console.log(validationMessage);
    
    const message = `{info}`;

    return (
        <div className="relative inline-block ml-6">
            <svg
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                className='cursor-pointer ml-2 h-5 w-5'
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#000000"} fill={"none"}>
                <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="currentColor" strokeWidth="1.5" />
                <path d="M12.2422 17V12C12.2422 11.5286 12.2422 11.2929 12.0957 11.1464C11.9493 11 11.7136 11 11.2422 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M11.992 8H12.001" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {showTooltip && (
                <div className="absolute capitalize text-wrap left-1/2 transform -translate-x-1/2 mt-2 md:w-64 w-40 p-4 bg-blue-600 text-white text-sm rounded shadow-lg z-10 px-2">
                    <p className='font-bold'>{info.replaceAll('/',"/ ")}</p>
                    <p>{validationMessage.replaceAll('/',"/ ")}</p>
                </div>
            )}
        </div>
    );
};

export default Tooltip;
