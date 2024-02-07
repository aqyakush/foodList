import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #f8f9fa;
  text-align: center;
  padding: 10px;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <p>© 2024 FoodList</p>
    </FooterContainer>
  );
};

export default Footer;