import React from 'react';
import DropdownMenu from '../../../components/Navigation/DropdownMenu';
import StyledNavLink from '../../../components/Navigation/StyledNavLink';
import MoreButton from '../../../components/Navigation/MoreButton';

type ViewingNavigationProps = {
    isViewingOpen?: boolean;
}

const ViewingNavigation: React.FC<ViewingNavigationProps> = () => {
    return (
        <MoreButton title='Viewing'>
            <li>
                <StyledNavLink to="/viewing/recipes">Recipes</StyledNavLink>
            </li>
            <li>
                <StyledNavLink to="/viewing/mealPlans">Meal Plans</StyledNavLink>
            </li>
            <li>
                <StyledNavLink to="/viewing/shoppingLists">Shopping Lists</StyledNavLink>
            </li>
        </MoreButton>
    );
}

export default ViewingNavigation;
