import styled from "styled-components";
import Title from "./Title";
import React from "react";
import ExpandArrow from "./ExpandArrow";

const TitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

type TitleWithArrowProps = {
    title: string;
    isExpanded: boolean;
    onClick: () => void;
};

const TitleWithArrow: React.FC<TitleWithArrowProps> = ({ title, isExpanded, onClick }) => {
    return (
        <TitleContainer onClick={onClick}>
            <Title>{title}</Title>
            <ExpandArrow isExpanded={isExpanded} />
        </TitleContainer>
    );
}

export default TitleWithArrow;

