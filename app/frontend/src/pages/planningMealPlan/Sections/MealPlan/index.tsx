import React from 'react';
import Section from '../../components/section';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { MealPlansProvider } from '../../../mealPlanPage/MealPlansContext';
import MealPlanView from './MealPlanView';


const CenterDiv = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: right;
  flex-direction: column;
  min-width: 35vw;
`;

const MealPlanSection: React.FC = () => {
    const params = useParams();
    
    return (
        <Section title="Meal Plan" openByDefault sectionName='mealPlan'>
            <CenterDiv>
                <MealPlansProvider params={params}>
                    <MealPlanView />
                </MealPlansProvider>
            </CenterDiv>
        </Section>
    );
};

export default MealPlanSection;
