import React from 'react';
import styled from 'styled-components';
import StyledNavLink from '../../../components/Navigation/StyledNavLink';
import { MealPlan } from '../../../types';
import useDeleteFetch from '../../../hooks/apiHooks/useDeleteFetch';
import { API_URL, MEAL_PLAN_QUERY } from '../../../utils/apis';
import { useNavigate } from 'react-router-dom';
import Modals from '../../../components/Modal';
import UpdateMealPlanForm from '../../mealPlanPage/MealPlans/UpdateMealPlanForm';

const StyledLi = styled.li`
    display: flex;
    position: relative;
`;

const MenuButton = styled.button`
    position: absolute;
    flex: 0;
    right: 0;
    background: transparent;
    border: none;
    font-size: 1.5em;
    color: gray;
    cursor: pointer;
    height: 100%;

    &:active {
      background-color: green; // Change the background color when clicked
    }
  `;

type MenuDivProps = {
  isOpen: boolean;
}

const MenuList = styled.ul<MenuDivProps>`
    display: ${props => props.isOpen ? 'block' : 'none'};
    position: absolute;
    top: 100%; // Position it right below the parent element
    right: 0; // Align it to the right edge of the parent element
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
  onUpdate: () => void;
  buttonRef: React.RefObject<HTMLButtonElement>;
}

export const Menu = ({ isOpen, onClose, onDelete, onUpdate, buttonRef }: MenuProps) => {
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

  const handleUpdateClick = () => {
    onUpdate();
    onClose();
  }

  return (
    <MenuList isOpen={isOpen} ref={menuListRef}>
      <MenuItem>
        <SubMenu onClick={handleDeleteClick}>Delete</SubMenu>
        <SubMenu onClick={handleUpdateClick}>Update</SubMenu>
      </MenuItem>
    </MenuList>
  );
};

type MealPlanNavProps = {
    mealPlan: MealPlan;
    refetch: () => void;
};

const MealPlanNav: React.FC<MealPlanNavProps> = ({ mealPlan, refetch }) => {
    const navigate = useNavigate();
    const [isUpdateModalOpen, setIsUpdateModalOpen] = React.useState(false);
  
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const buttonRef = React.useRef(null);
    const { deleteItem } = useDeleteFetch();
    
    const handleDelete = React.useCallback( async (mealId:number) => {
      await deleteItem(`${API_URL}${MEAL_PLAN_QUERY}${mealId}/`)
      refetch();
      navigate('viewing/mealPlans'); 
    }, [deleteItem, navigate, refetch]);

    const handleUpdate = React.useCallback(() => {
      setIsUpdateModalOpen(true);
    }, []);

    const handleAction = React.useCallback(() => {
      setIsUpdateModalOpen(false)
      navigate(0); 
    }, [navigate]);

    return (
      <>
        <StyledLi>
            <StyledNavLink to={`planning/mealPlans/${mealPlan.id}`}>
              {mealPlan.name}
            </StyledNavLink>
            <MenuButton onClick={() => setIsMenuOpen(!isMenuOpen)} ref={buttonRef}>⋮</MenuButton>
            <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} onDelete={() => handleDelete(mealPlan.id)} onUpdate={() => handleUpdate()} buttonRef={buttonRef} />
        </StyledLi>
        <Modals isOpen={isUpdateModalOpen} onClose={() => setIsUpdateModalOpen(false)} >
          <UpdateMealPlanForm handleAction={handleAction} mealPlan={mealPlan} />
        </Modals>
      </>
        
    );
};

export default MealPlanNav;
