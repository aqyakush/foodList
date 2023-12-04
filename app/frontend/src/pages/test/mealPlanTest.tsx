import React from 'react';
import {useDroppable} from '@dnd-kit/core';
import styled from 'styled-components';

const MealPlanDiv = styled.div`
    border: 1px solid #ccc;
    padding: 20px;
    margin: 20px;
    height: 200px;
    width: 200px;
`;

type MealPlanTestProps = {
    children: React.ReactNode;
    id: string;
}

const MealPlanTest: React.FC<MealPlanTestProps> = (props) => {
    const { isOver, setNodeRef } = useDroppable({
        id: props.id,
    });
    const style = {
        color: isOver ? 'green' : undefined,
    };

    return (
        <div ref={setNodeRef} style={style}>
            <MealPlanDiv>
                {props.children}
            </MealPlanDiv>
        </div>
    );
};

export default MealPlanTest;