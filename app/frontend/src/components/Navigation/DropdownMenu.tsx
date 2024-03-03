import React from 'react';
import styled from 'styled-components';

type DropdownMenuProps = {
    isOpen: boolean;
}
  
const DropdownMenu = styled.div<DropdownMenuProps>`
    display: ${props => props.isOpen ? 'block' : 'none'};
    width: auto;
`;

export default DropdownMenu;