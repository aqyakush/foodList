import React from 'react';
import styled from 'styled-components';
import { IconType } from 'react-icons';
import ReactTooltip from 'react-tooltip';

const SectionDiv = styled.div`
    flex-grow: 1;
    border: 1px solid #ddd;
    padding: 10px;
    margin-bottom: 10px;
`;

const ClosedSection = styled.div`
  flex-grow: 0;
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
`;

const OpenTitle = styled.h2` 
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  padding: 10px;
`;

const ClosedTitle = styled.h2` 
  display: flex;
  flex-direction: column;
  cursor: pointer;
  padding: 10px;
  justify-content: space-between;
  gap: 10px;
`;

type SectionProps = {
    title: string;
    children: React.ReactNode;
    isPossibleToClose?: boolean;
    openByDefault?: boolean;
    sectionName?: string;
    icon: IconType;
}

const Section: React.FC<SectionProps> = ({ title, children, isPossibleToClose, openByDefault, sectionName, icon }) => {
    const [isOpen, setIsOpen] = React.useState(openByDefault);

    // Load saved state from localStorage when component mounts
    React.useEffect(() => {
      const savedState = localStorage.getItem(`sectionState-${sectionName}`);
      if (savedState) {
        try {
          setIsOpen(JSON.parse(savedState));
        }
        catch (err) {
          console.error('Failed to parse section state: ', err);
        }
      } 
    }, [sectionName]);

    // Save state to localStorage whenever it changes
    React.useEffect(() => {
      if (isOpen !== undefined && isOpen !== null) {
        localStorage.setItem(`sectionState-${sectionName}`, JSON.stringify(isOpen));
      }
    }, [isOpen, sectionName]);

    const IconComponent = icon;

    const content = isOpen ? 
        <SectionDiv>
            <OpenTitle onClick={() => setIsOpen(!isOpen)}>
                <span>{title}</span>
                {isPossibleToClose && <span>{isOpen ?  '▶' : '◀' }</span>}
            </OpenTitle>
            {children}
        </SectionDiv> : 
        <ClosedSection>
            <ClosedTitle onClick={() => setIsOpen(!isOpen)}>
            {IconComponent && <IconComponent title={title} />} 
            <span title={`Open ${title}!`}>{isOpen ? '▶' : '◀' }</span> 
            </ClosedTitle>
        </ClosedSection>;

    return content;
};

export default Section;
