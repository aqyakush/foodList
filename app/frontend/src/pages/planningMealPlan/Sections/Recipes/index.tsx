import React from 'react';
import SearchRecipe from '../../../mainPage';
import Section from '../../components/section';
import styled from 'styled-components';

const ScrollableContent = styled.div`
  overflow-y: auto;
  max-height: 100vh;
`;

const RecipesSection: React.FC = () => {
    return (
        <Section title="Recipes" isPossibleToClose openByDefault>
              <ScrollableContent>
                <SearchRecipe />
              </ScrollableContent>
        </Section>
    );
};

export default RecipesSection;
