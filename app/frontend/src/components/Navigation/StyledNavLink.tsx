import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledNavLink = styled(NavLink)`
  display: block;
  color: white;
  text-align: left;
  padding: 14px 30px;
  text-decoration: none;

  &:hover {
    background-color: #111;
  }

  &.active {
    background-color: #4CAF50;
  }
`;

export default StyledNavLink;