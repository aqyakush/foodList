import React, { ReactNode } from 'react';
import Modal from 'react-modal';

import styled from 'styled-components';

const ContentWrapper = styled.div`
  position: relative;
  background: white;
  padding: 40px;
  max-width: 90%; // Adjust this value as needed
  max-height: 90%; // Adjust this value as needed
  border: 1px solid #ccc; // Add a border
  border-radius: 4px; // Round the corners
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); // Add a shadow
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 2em;
  color: gray;
  transition: color 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    color: darkgray;
  }

  &:active {
    transform: scale(0.9);
  }
`;

const StyledModal = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  maxWidth: 90%; // Adjust this value as needed
  maxHeight: 90%; // Adjust this value as needed
  margin: auto;
  overflow: auto; // Add scroll if content is larger
`;

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
};

const Modals: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    return (
        <StyledModal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="My Modal"
            >
            <ContentWrapper>
                {children}
                <CloseButton onClick={onClose}>&times;</CloseButton>
            </ContentWrapper>
        </StyledModal>
    );
};

export default Modals;
