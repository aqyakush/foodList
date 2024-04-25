import React from "react";
import styled from "styled-components";


type ExpandArrowProps = {
    isExpanded: boolean;
}

const ExpandArrowStyle = styled.span`
    text-align: right;
    cursor: pointer;
`;

const Arrow: React.FC<ExpandArrowProps> = ({ isExpanded }) => {
    return <ExpandArrowStyle>{isExpanded ? '▲' : '▼'}</ExpandArrowStyle>;
};

export default Arrow;