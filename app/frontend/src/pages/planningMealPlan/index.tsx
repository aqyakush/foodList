import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import CenterDiv from '../../components/CenterDiv';
import styled from 'styled-components';


type SectionProps = {
    isOpen: boolean;
}

// const Sections = styled.div`
//     display: flex;
//     justify-content: space-between;
// `;

const Section = styled.div`
    flex-grow: 1;
`;

const Content = styled.div<SectionProps>`
    display: ${props => (props.isOpen ? 'block' : 'none')};
    border: 1px solid #ddd;
    padding: 10px;
    margin-bottom: 10px;
`;

const Space = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: row;
`;

const ClosedSection = styled.div`
  flex-grow: 0;
`;

const OpenTitle = styled.h2` 
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  padding: 10px;
`;

const ClosedTitle = styled.h2` 
  writing-mode: vertical-lr;
  display: flex;
  cursor: pointer;
  padding: 10px;
  justify-content: space-between;
  gap: 10px;
`;


const PlanningMealPlan: React.FC = () => {
  const params = useParams();
  const [isOpenRecipes, setIsOpenRecipes] = useState(true);
  const [isOpenMealPlan, setIsOpenMealPlan] = useState(true);
  const [isOpenShoppingList, setIsOpenShoppingList] = useState(true);

  return (
    <Space>
      {/* <h1>Planning Meal Plan</h1> */}
      {/* <Sections> */}
      { isOpenRecipes ? <Section>
            <OpenTitle onClick={() => setIsOpenRecipes(!isOpenRecipes)}>
              <span>Recipes</span>
              <span>{isOpenRecipes ? '◀' : '▶' }</span> 
            </OpenTitle>
            <Content isOpen={isOpenRecipes}>
            {/* Your Recipes content */}
            </Content>
        </Section> : 
        <ClosedSection>
          <ClosedTitle onClick={() => setIsOpenRecipes(!isOpenRecipes)}>
            <span>Recipes</span>
            <span>{isOpenRecipes ? '◀' : '▶' }</span> 
          </ClosedTitle>
        </ClosedSection>
      }
      {
        isOpenMealPlan ?
        <Section>
            <OpenTitle onClick={() => setIsOpenMealPlan(!isOpenMealPlan)}>
              <span>Meal Plan</span>
              <span>{isOpenMealPlan ? '◀' : '▶'}</span>
            </OpenTitle>
            <Content isOpen={isOpenMealPlan}>
            {/* Your Meal Plan content */}
            </Content>
        </Section> :
        <ClosedSection>
          <ClosedTitle onClick={() => setIsOpenMealPlan(!isOpenMealPlan)}>
            <span>Meal Plan</span>
            <span>{isOpenMealPlan ? '◀' : '▶'}</span>
          </ClosedTitle>
        </ClosedSection>
      }  
      {
        isOpenShoppingList ?
        <Section>
            <OpenTitle onClick={() => setIsOpenShoppingList(!isOpenShoppingList)}>
              <span>Shopping List</span>
              <span>{isOpenShoppingList ? '◀' : '▶'}</span>
            </OpenTitle>
            <Content isOpen={isOpenShoppingList}>
            {/* Your Shopping List content */}
            </Content>
        </Section> :
        <ClosedSection>
          <ClosedTitle onClick={() => setIsOpenShoppingList(!isOpenShoppingList)}>
            <span>Shopping List</span>
            <span>{isOpenShoppingList ? '◀' : '▶'}</span>
          </ClosedTitle>
        </ClosedSection>
      }  
        
      {/* </Sections> */}
    </Space>
  );
}

export default PlanningMealPlan;
