import React, { useState } from 'react';
import styled from 'styled-components';

const NavItem = styled.li`
  font-family: 'Noto Sans KR', sans-serif;
  position: relative;
  padding: 10px;
  font-weight: bold;
  color: black;
  &:hover {
    cursor: pointer;
  }
  &:after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -5px;
    width: 0;
    height: 5px;
    background-color: #395144;
    transition: width 0.3s ease-in-out;
  }
  &:hover:after {
    width: 100%;
  }
  ${({ active }) =>
    active &&
    `
    &:after {
      width: 100%;
    }
  `}
`;



function Navbar() {
  const [activeLink, setActiveLink] = useState('home');

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <nav>
      <ul>
        <NavItem active={activeLink === 'home'} onClick={() => handleLinkClick('home')}>
          Home
        </NavItem>
        <NavItem active={activeLink === 'about'} onClick={() => handleLinkClick('about')}>
          About
        </NavItem>
        <NavItem active={activeLink === 'contact'} onClick={() => handleLinkClick('contact')}>
          Contact
        </NavItem>
      </ul>
    </nav>
  );
}


export default Navbar;