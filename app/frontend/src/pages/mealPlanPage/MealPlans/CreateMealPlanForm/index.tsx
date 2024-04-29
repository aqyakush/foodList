import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import React from 'react';
import { MealPlan } from '../../../../types';
import usePostFetch from '../../../../hooks/apiHooks/usePostFetch';
import { API_URL, MEAL_PLAN_QUERY } from '../../../../utils/apis';
import Button from '../../../../components/Button';
import Form from '../../../../components/Form/Form';
import InputField from '../../../../components/Form/Fields/InputField';
import DateField from '../../../../components/Form/Fields/DateField';
import { format, isValid } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 20px; // Add top margin
`;

type CreateMealPlanFormProps = {
    handleAction?: () => void;
    returnUrl?: string;
};

const CreateMealPlanForm: React.FC<CreateMealPlanFormProps> = ({handleAction, returnUrl}) => {
    const { control, handleSubmit, reset, formState: { errors } } = useForm<MealPlan>();
    const { postData }  = usePostFetch<MealPlan>(`${API_URL}${MEAL_PLAN_QUERY}`, returnUrl);

    const onSubmit = (data: MealPlan) => {
        try {
            if (data.start_date && isValid(data.start_date)) {
                // @ts-ignore-error FIXME: Type 'Date' is not assignable to type 'string'.
                data.start_date = format(data.start_date, 'yyyy-MM-dd'); // Format the date here
            }
            if (data.end_date && isValid(data.end_date)) {
                // @ts-ignore-error FIXME: Type 'Date' is not assignable to type 'string'.
                data.end_date = format(data.end_date, 'yyyy-MM-dd'); // Format the date here
            }
            postData(data);
            // Handle successful creation of mealPlan
            reset({
                name: '',
                start_date: undefined,
                end_date: undefined,
                meals: [],
              });
            handleAction && handleAction();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <InputField 
                    control={control} 
                    name="name" 
                    label="Name:" 
                    rules={{ required: true }} 
                    error={errors.name}
                />
                <DateField 
                    control={control} 
                    name="start_date" 
                    label="Start date" 
                    rules={{ required: true }}
                    error={errors.start_date}/>
                <DateField 
                    control={control} 
                    name="end_date" 
                    label="End date"
                    rules={{ required: true }} 
                    error={errors.end_date}
                />
                <ButtonContainer>
                    <Button buttontype="primary" type="submit">
                        Create Meal plan
                    </Button>
                </ButtonContainer>
            </Form>
        </>
    );
};

export default CreateMealPlanForm;
