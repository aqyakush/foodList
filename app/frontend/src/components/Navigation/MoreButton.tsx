import React from 'react';
import styled from 'styled-components';
import ExpandArrow from '../ExpandArrow';

const Text = styled.p`
  display: block;
  color: white;
  text-align: center;
  padding: 0px 16px;
  text-decoration: none;
`;

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:hover {
    background-color: #111;
    cursor: pointer;
  }
`;

interface MoreButtonProps {
    title: string;
}

interface MoreButtonProps {
    title: string;
    children: React.ReactNode;
}

const MoreButton: React.FC<MoreButtonProps> = ({ title, children }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const content = React.useMemo(() => isOpen ? children : null, [isOpen, children]);
    return (
        <li>
            <StyledDiv onClick={() => setIsOpen(!isOpen)}>
                <Text>{title}</Text>
                <Text>
                  <ExpandArrow isExpanded={isOpen} />
                </Text>
            </StyledDiv>
            {content}
        </li>
    );
}

export default MoreButton;
