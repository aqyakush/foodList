import React from 'react';
import useDeleteFetch from '../../../../../../hooks/apiHooks/useDeleteFetch';
import { API_URL, MEAL_PLAN_QUERY, MEAL_PLAN_URL, MEAL_QUERY } from '../../../../../../utils/apis';
import styled from 'styled-components';
import { Meal, MealPlan } from '../../../../../../types';
import { eachDayOfInterval, format } from 'date-fns';
import usePatchFetch from '../../../../../../hooks/apiHooks/usePatchFetch';
import { MealUpdate } from '.';

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
  onDateChange: (value: string) => Promise<void>;
  buttonRef: React.RefObject<HTMLButtonElement>;
  mealPlan: MealPlan;
}

export const Menu = ({ isOpen, onClose, onDelete, buttonRef, mealPlan, onDateChange }: MenuProps) => {
  const menuListRef = React.useRef<HTMLUListElement | null>(null);
  const { start_date, end_date } = mealPlan;

  const dates = [undefined, ...eachDayOfInterval({
    start: new Date(start_date),
    end: new Date(end_date)
  })];

  const handleDateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onDateChange(event.target.value);
    onClose();
};

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
        <select value={""} onChange={handleDateChange}>
          {dates.map((date, index) => {
              if (!date) {
                  return <option key={index} value={''}>Select a date</option>
              } else {
                  const formattedDate = format(date, 'EEE, yyyy-MM-dd');
                  const dateForRequest = format(date, 'yyyy-MM-dd');
                  return <option key={index} value={dateForRequest}>{formattedDate}</option>
              }
          })}
        </select>
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
    meal: Meal;
    mealPlan: MealPlan;
    refetch: () => void;
}

const MealRowActions: React.FC<RowActionsProps> = ({ meal, mealPlan, refetch }) => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const buttonRef = React.useRef(null);
    const { deleteItem } = useDeleteFetch();
    const { patchItem } = usePatchFetch<MealUpdate, Meal>(`${MEAL_PLAN_URL}${MEAL_QUERY}`);
    

    const handleDelete = React.useCallback( async () => {
        await deleteItem(`${API_URL}${MEAL_PLAN_QUERY}${MEAL_QUERY}${meal.id}/`)
        refetch();
    }, [deleteItem, meal.id, refetch]);

    const handleDateChange =  React.useCallback( async (value: string) => {
      await patchItem({date: value}, meal.id.toString());
      refetch();
  }, [meal.id, patchItem, refetch]);

    return (
        <td>
            <MenuButton onClick={() => setIsMenuOpen(!isMenuOpen)} ref={buttonRef}>⋮</MenuButton>
            <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} onDelete={() => handleDelete()}  buttonRef={buttonRef} mealPlan={mealPlan} onDateChange={handleDateChange} />
        </td>
    );
};

export default MealRowActions;
