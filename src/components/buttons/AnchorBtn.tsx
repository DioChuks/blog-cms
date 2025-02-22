import React from 'react'

interface AnchorButtonProps {
    href: string;
    title: string;
    target?: string;
    cnames: string;
}

const AnchorButton: React.FC<AnchorButtonProps> = ({href, title, target, cnames}) => {
  return (
    <a 
      href={href ?? "#"}
      target={target ?? "_self"}
      className={`px-4 py-3 font-bold text-center transition-all w-fit ${cnames} rounded hover:-translate-y-1 hover:shadow-lg`}
    >
    {title}
    </a>
  )
}

export default AnchorButton