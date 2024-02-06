import React from 'react';
import { MealPlan } from '../../../types';
import { eachDayOfInterval, format } from 'date-fns';
import MealRow from './mealRow';

interface MealPlanCalendarProps {
    mealPlan: MealPlan;
    onDelete: (mealId: number) => Promise<void>
    refetch: () => void;
}

const MealPlanCalendar: React.FC<MealPlanCalendarProps> = ({ mealPlan, onDelete, refetch }) => {
    const { start_date, end_date, meals } = mealPlan;

    const dates = eachDayOfInterval({
        start: new Date(start_date),
        end: new Date(end_date)
    });

    return (
        <div>
            {dates.map((date, index) => {
                const formattedDate = format(date, 'yyyy-MM-dd');
                const mealsForTheDay = meals?.filter(meal => format(new Date(meal.date), 'yyyy-MM-dd') === formattedDate);

                return (
                    <div key={index}>
                        <h3>{format(date, 'EEEE, yyyy-MM-dd')}</h3>
                        {mealsForTheDay && mealsForTheDay.map((meal) => { return meal && <MealRow meal={meal} handleDelete={onDelete} mealPlan={mealPlan} refetch={refetch}/>})}
                    </div>
                );
            })}
        </div>
    );
};

export default MealPlanCalendar;