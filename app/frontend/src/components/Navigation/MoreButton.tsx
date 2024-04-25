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
    openByDefault?: boolean;
}

const MoreButton: React.FC<MoreButtonProps> = ({ title, openByDefault, children }) => {
    const [isOpen, setIsOpen] = React.useState(openByDefault);
    // Load saved state from localStorage when component mounts
    React.useEffect(() => {
      const savedState = localStorage.getItem(`navState-${title}`);
      if (savedState) {
        try {
          setIsOpen(JSON.parse(savedState));
        }
        catch (err) {
          console.error('Failed to parse section state: ', err);
        }
      } 
    }, [title]);

    // Save state to localStorage whenever it changes
    React.useEffect(() => {
      if (isOpen) {
      localStorage.setItem(`navState-${title}`, JSON.stringify(isOpen));
      }
    }, [isOpen, title]);

    const content = React.useMemo(() => isOpen ? children : null, [isOpen, children]);
    return (
        <div>
            <StyledDiv onClick={() => setIsOpen(!isOpen)}>
                <Text>{title}</Text>
                <Text>
                  <ExpandArrow isExpanded={isOpen ?? false} />
                </Text>
            </StyledDiv>
            {content}
        </div>
    );
}

export default MoreButton;
