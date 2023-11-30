import React from 'react';
import {useDraggable} from '@dnd-kit/core';
import styled from 'styled-components';

const RecipeDiv = styled.div`
    border: 1px solid #ccc;
    padding: 10px;
    margin: 10px;
`;


type RecipeProps = {
    children: React.ReactNode;
    id: string;
}

const Recipe: React.FC<RecipeProps> = (props) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: props.id,
    });
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

    return (
        <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
            <RecipeDiv>
                {props.children}
            </RecipeDiv>
            
        </button>
    );
}

export default Recipe;