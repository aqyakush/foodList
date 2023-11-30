import React, { useState } from 'react';
import {DndContext} from '@dnd-kit/core';
import Recipe from './recipe';
import MealPlan from './mealPlan';


const Test = () => {
    const containers = ['Plan 1', 'Plan 2', 'Plan 3'];
    const [parent, setParent] = useState(null);
    const draggableMarkup = (
        <Recipe id="draggable">Drag me</Recipe>
    );

    return (
        <DndContext onDragEnd={handleDragEnd}>
        {parent === null ? draggableMarkup : null}

        {containers.map((id) => (
            // We updated the Droppable component so it would accept an `id`
            // prop and pass it to `useDroppable`
            <MealPlan key={id} id={id}>
            {parent === id ? draggableMarkup : 'Drop here'}
            </MealPlan>
        ))}
        </DndContext>
    );
    
    function handleDragEnd(event: any) {
        const {over} = event;
    
        // If the item is dropped over a container, set it as the parent
        // otherwise reset the parent to `null`
        setParent(over ? over.id : null);
      }
  }

export default Test;
