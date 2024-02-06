import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledNavLink = styled(NavLink)`
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;

  &:hover {
    background-color: #111;
  }

  &.active {
    background-color: #4CAF50;
  }
`;

const StyledNav = styled.nav`
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #333;
    position: fixed;
    top: 0;
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
`;

const NavBar = () => {
    return (
        <StyledNav>
            <ul>
                <li>
                    <StyledNavLink to="/">Recipes</StyledNavLink>
                </li>
                <li>
                    <StyledNavLink to="/mealPlans">Meal Plans</StyledNavLink>
                </li>
                <li>
                    <StyledNavLink to="/shoppingLists">Shopping Lists</StyledNavLink>
                </li>
            </ul>
        </StyledNav>
    );
}

export default NavBar;