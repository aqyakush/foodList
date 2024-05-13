import React from 'react';
import SearchRecipe from '../../../mainPage';
import Section from '../../components/section';
import styled from 'styled-components';
import { GiCook } from 'react-icons/gi';

const ScrollableContent = styled.div`
  overflow-y: auto;
  max-height: 100vh;
`;

const RecipesSection: React.FC = () => {
    return (
        <Section title="Recipes" isPossibleToClose openByDefault sectionName='recipes' icon={GiCook}>
              <ScrollableContent>
                <SearchRecipe />
              </ScrollableContent>
        </Section>
    );
};

export default RecipesSection;
