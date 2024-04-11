import React from 'react';
import { MealPlan } from '../../../types';
import { eachDayOfInterval, format } from 'date-fns';
import MealRowEdit from './mealPlanEdit';

type MealPlanCalendarProps = {
    mealPlan: MealPlan;
}

const mealOrder = ['breakfast', 'brunch', 'lunch', 'linner', 'dinner', 'snack'];

const MealPlanCalendar: React.FC<MealPlanCalendarProps> = ({ mealPlan }) => {
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
                        {mealsForTheDay && mealsForTheDay.sort((a, b) => {
                            if (a.meal_type === undefined || a.meal_type === null) return 1;
                            if (b.meal_type === undefined || b.meal_type === null) return -1;
                            return mealOrder.indexOf(a.meal_type) - mealOrder.indexOf(b.meal_type);
                        }).map((meal) => (
                            meal && <MealRowEdit key={meal.id} meal={meal} mealPlan={mealPlan}/>
                        ))}
                    </div>
                );
            })}
        </div>
    );
};

export default MealPlanCalendar;