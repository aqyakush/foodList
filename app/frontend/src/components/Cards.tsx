import React, { ReactNode } from 'react';
import styled from 'styled-components';

type CardProps = {
    children: ReactNode;
};

const CardWrapper = styled.div`
    border: 1px solid rgba(0, 0, 0, 0.1); // less visible border
    padding: 20px;
    border-radius: 10px; // more rounded corners
    margin: 20px;
    width: 50%;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); // add shadow
    transition: 0.3s; // smooth transition
    background-color: #fff; // white background
`;

const Card = ({ children }: CardProps) => {
    return (
        <CardWrapper>
            {children}
        </CardWrapper>
    );
};

export default Card;
