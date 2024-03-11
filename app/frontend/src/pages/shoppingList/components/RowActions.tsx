import React from 'react';
import Item from '../../../types/item';
import useDeleteFetch from '../../../hooks/apiHooks/useDeleteFetch';
import { SHOPPING_LIST_ITEMS_URL } from '../../../utils/apis';
import styled from 'styled-components';

type MenuDivProps = {
  isOpen: boolean;
}

const MenuList = styled.ul<MenuDivProps>`
    position: absolute;
    display: ${props => props.isOpen ? 'block' : 'none'};
    border: 1px solid #ccc; // Add a border
    border-radius: 4px; // Round the corners
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); // Add a shadow
    background-color: lightgray;
    list-style-type: none;
    z-index: 1; // Bring to front
    padding-left: 0;
`;

const MenuItem = styled.li`
  text-align: left;
`;

const SubMenu = styled.div`
  padding: 10px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:hover {
    background-color: gray;
    cursor: pointer;
  }
  &:active {
    background-color: darkgray; // Change the background color when clicked
  }
`;
  
type MenuProps = {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  buttonRef: React.RefObject<HTMLButtonElement>;
}

export const Menu = ({ isOpen, onClose, onDelete, buttonRef }: MenuProps) => {
  const menuListRef = React.useRef<HTMLUListElement | null>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (buttonRef.current && buttonRef.current.contains(event.target as Node)) {
        // If the clicked target is the MenuButton, do not close the menu
        return;
      }

      if (menuListRef.current && !menuListRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside as EventListener);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [buttonRef, onClose]);

  const handleDeleteClick = () => {
    onDelete();
    onClose();
  };

  return (
    <MenuList isOpen={isOpen} ref={menuListRef}>
      <MenuItem>
        <SubMenu onClick={handleDeleteClick}>Delete</SubMenu>
      </MenuItem>
    </MenuList>
  );
};

const MenuButton = styled.button`
    position: relative;
    right: 0;
    background: transparent;
    border: none;
    font-size: 1em;
    color: gray;
    cursor: pointer;

    &:active {
        background-color: gray;
    }
  `;

type RowActionsProps = {
    item: Item;
    refetch: () => void;
}

const RowActions: React.FC<RowActionsProps> = ({ item, refetch }) => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const buttonRef = React.useRef(null);
    const { deleteItem } = useDeleteFetch();
    
    const handleDelete = React.useCallback( async () => {
      await deleteItem(`${SHOPPING_LIST_ITEMS_URL}${item.id}/`)
      refetch();
  }, [deleteItem, item.id, refetch]);

    return (
        <td>
            <MenuButton onClick={() => setIsMenuOpen(!isMenuOpen)} ref={buttonRef}>⋮</MenuButton>
            <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} onDelete={() => handleDelete()}  buttonRef={buttonRef} />
        </td>
    );
};

export default RowActions;
