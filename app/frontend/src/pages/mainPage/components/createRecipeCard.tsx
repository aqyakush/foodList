import { useFieldArray, useForm } from 'react-hook-form';
import { useState } from 'react';
import styled from 'styled-components';
import Spinner from 'react-spinner-material';

import React from 'react';
import { Amount, Ingredient, Recipe } from '../../../types';
import usePostFetch from '../../../hooks/apiHooks/usePostFetch';
import { API_URL, RECIPES_QUERY } from '../../../utils/apis';
import Card from '../../../components/Cards';
import Button from '../../../components/Button';
import Form from '../../../components/Form/Form';
import Input from '../../../components/Form/InputField';
import ErrorText from '../../../components/Form/ErrorText';
import TextArea from '../../../components/Form/Textarea';
import InputField from '../../../components/Form/InputField';

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const RemoveButton = styled.button`
  background-color: transparent;
  color: red;
  border: none;
  cursor: pointer;
  font-size: 20px;
  padding: 0;

  &:hover {
    color: #0056b3; // Darker shade of blue when hovered over
  }

  &:active {
    color: #003580; // Even darker shade of blue when clicked
  }
`;

const ListItem = styled.li`
  list-style-type: none;
`;

const OPENAI_API_KEY = ''; // Replace with your actual API key

const CreateRecipe = () => {
    const { control, register, handleSubmit, reset, formState: { errors } } = useForm<Recipe>();
    
    const { fields, remove, append } = useFieldArray({
        control,
        name: 'ingredients',
      });
    
    const { postData }  = usePostFetch<Recipe>(`${API_URL}${RECIPES_QUERY}`);

    const onSubmit = (data: Recipe) => {
        try {
            postData(data);
            // Handle successful creation of recipe
            reset({
                name: '',
                description: '',
                ingredients: [],
              });
        } catch (error) {
            console.error(error);
        }
    };

    // const onGetIngredients = async () => {
    //     setIsLoading(true); // Start loading
    //     try {
    //         const recipeName = getValues("name");
    //         if (recipeName.length < 3) {
    //             return;
    //         }
    //         const response = await fetch('https://api.openai.com/v1/chat/completions', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${OPENAI_API_KEY}`,
    //             },
    //             body: JSON.stringify({
    //                 "model": "gpt-3.5-turbo",
    //                 "messages": [{"role": "user", "content": `Please return recipe for ${recipeName}. The response should be a json file. In form {"name":"recipeName","description":"recipe","ingredients":[{"name":"ingredient 1","amount":{"amount":3,"unit":"tsp"}},{"name":"ingredient 2","amount":{"amount":2,"unit":"l"}}]} for unit only use 'kg','g', 'ml', 'l', 'tbsp', 'tsp', 'piece'.`}],
    //                 "temperature": 0.7
    //             }),
    //         });

    //         const data = await response.json();
    //         const recipe = data.choices[0].message.content;
    //         setIsLoading(false); // Stop loading

    //         setIngredients(JSON.parse(recipe).ingredients);
    //         setValue(`description`, JSON.parse(recipe).description);

    //     } catch (error) {
    //         setIsLoading(false); // Stop loading
    //         console.error(error);
    //     }   
    // }

    const ingredients = React.useMemo(() => {
        return (
            <div>
                {fields.length > 0 && "Ingredients:"}
                <ul>
                    {fields.map((field, index) => (
                        <div key={index}><RemoveButton type="button" onClick={() => {
                            remove(index)
                        }}>✖</RemoveButton>
                        <ListItem key={field.id}>
                            <InputField control={control} 
                                        name={`ingredients.${index}.name`} 
                                        label="Name:" 
                                        rules={{ required: true }} 
                                        error={errors.ingredients?.[index]?.name}
                                        defaultValue={field.name}/>
                            <InputField control={control} 
                                        name={`ingredients.${index}.amount.amount`} 
                                        label="Amount:" 
                                        rules={{ required: true }} 
                                        error={errors.ingredients?.[index]?.amount?.amount}
                                        defaultValue={field.amount.amount}/>
                            <InputField control={control} 
                                        name={`ingredients.${index}.amount.unit`} 
                                        label="Unit:" 
                                        rules={{ required: true }} 
                                        error={errors.ingredients?.[index]?.amount?.unit}
                                        defaultValue={field.amount.unit}/>
                        </ListItem></div>
                    ))}
                </ul>
            </div>
        )}, [fields, remove, control, errors.ingredients]);


    return (
        <Card>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <InputField control={control} name="name" label="Name:" rules={{ required: true }} error={errors.name}/>
                <div>
                    Description:
                    <TextArea
                        {...register("description", { required: true })}
                    />
                    {errors.description && <ErrorText>This field is required</ErrorText>}
                </div>
                {ingredients}
                <Button buttonType="secondary" onClick={() => append({ name: '', amount: { amount: 0, unit: ''} })}>Add Ingredient</Button>
                <ButtonContainer>
                    <Button buttonType="primary" type="submit">Create Recipe</Button>
                </ButtonContainer>
            </Form>
        </Card>
    );
};

export default CreateRecipe;
