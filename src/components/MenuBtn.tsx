import React from "react";
import menuIcon from "../assets/menu-alt.svg";
import closeIcon from "../assets/close.svg";

interface MenuBtnProps {
  onclick?: () => void;
  isclicked?: boolean;
}

const MenuBtn: React.FC<MenuBtnProps> = ({ onclick, isclicked=false }) => {
  return (
    <figure className="lg:hidden mobile-menu-btn h-fit" onClick={onclick}>
      <img src={isclicked ? closeIcon : menuIcon} alt="open-close-icon" className="w-5 h-5"/>
    </figure>
  );
};

export default MenuBtn;
