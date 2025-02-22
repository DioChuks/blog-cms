import React from 'react'

interface ButtonProps {
    kind: "button";
    title: string;
    cnames: string;
    onclick?: () => void;
}

const Button: React.FC<ButtonProps> = ({kind, title, cnames, onclick}) => {
  return (
    <button
        onClick={onclick} 
        type={kind || "submit"} 
        className={`px-4 py-3 font-bold text-center text-white transition-all border-none w-fit ${cnames} rounded hover:-translate-y-1 hover:shadow-lg`}
    >
    {title}
    </button>
  )
}

export default Button