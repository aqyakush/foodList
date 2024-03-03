import React from 'react';
import styled from 'styled-components';
import ViewingNavigation from './Viewing';
import PlanningNavigation from './Planning';


const NavDiv = styled.div`
  flex-shrink: 0;
`;

const StyledNav = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  background-color: #333;
  top: 0;
  height: 100%;
  width: auto;
`;

const NavBar = () => {
    return (
      <NavDiv>
          <StyledNav>
            <ViewingNavigation />
            <PlanningNavigation />
          </StyledNav>
      </NavDiv>
    );
}

export default NavBar;