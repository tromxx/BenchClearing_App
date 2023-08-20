import React from "react";
import styled from "styled-components";

    const DesktopFooter = styled.div`
        width: 100vw;
        height: 150px;
        background-color: #704F4F;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        color: white;

        @media(max-width: 768px) {
            display: none;
        }
    `;



const Footer = () => {
    return(
            <DesktopFooter>
                <p>Copyright by Bench Clearing. All rights reserved. Since 2023</p>
            </DesktopFooter>  
    );
};

export default Footer;