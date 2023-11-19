import { useForm } from 'react-hook-form';
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
import Input from '../../../components/Form/Input';
import ErrorText from '../../../components/Form/ErrorText';
import TextArea from '../../../components/Form/Textarea';

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
    const { register, handleSubmit, reset, formState: { errors }, setValue, getValues } = useForm<Recipe>();
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const { postData }  = usePostFetch<Recipe>(`${API_URL}${RECIPES_QUERY}`);

    const onSubmit = (data: Recipe) => {
        try {
            postData(data);

            // Handle successful creation of recipe
            reset();
            setIngredients([]);
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


    const addIngredient = () => {
        setIngredients([...ingredients, { name: '', amount: { amount: 0, unit: ''} }]);
    };

    const removeIngredient = (index: number) => {
        const newIngredients = [...ingredients];
        newIngredients.splice(index, 1);
        setIngredients(newIngredients);
    };

    const handleIngredientChange = (index: number, field: keyof Ingredient | keyof Amount, value: string | number) => {
        const newIngredients = [...ingredients];
        if (field === 'amount') {
            console.log(value)
            newIngredients[index]['amount'][field] = value as number;
            // Update react-hook-form's internal state
            // TODO: Check why we need to setValue sepparately for amount.amount
            setValue(`ingredients.${index}.amount.amount`, value as number);
        } else if (field === 'name') {
            newIngredients[index][field] = value as string;
        } else if (field === 'unit') {
            console.log(value)
            newIngredients[index]['amount'][field] = value as string;
        }
        setIngredients(newIngredients);
    };

    return (
        <Card>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    Name:
                    <Input type="text" {...register("name", { required: true })} />
                    {errors.name && <ErrorText>This field is required</ErrorText>}
                    {/* {isLoading ? <Spinner /> : <button type="button" onClick={onGetIngredients}>
                        Get recipe Ingredient
                    </button>} */}
                </div>
                <div>
                    Description:
                    <TextArea
                        {...register("description", { required: true })}
                    />
                    {errors.description && <ErrorText>This field is required</ErrorText>}
                </div>
                <div>
                    {ingredients.length > 0 && "Ingredients:"}
                    <ul>
                        {ingredients.map((ingredient, index) => (
                            <div key={index}><RemoveButton type="button" onClick={() => removeIngredient(index)}>✖</RemoveButton>
                            <ListItem key={index}>
                                <div>
                                    Name:
                                    <Input
                                        type="text"
                                        value={ingredient.name}
                                        {...register(`ingredients.${index}.name`, { required: true })}
                                        onChange={(e) => handleIngredientChange(index, 'name', e.target.value)} />
                                    {errors.ingredients?.[index]?.name && (
                                        <ErrorText>This field is required</ErrorText>
                                    )}
                                </div>
                                <div>
                                    Amount:
                                    <Input
                                        type="number"
                                        value={ingredient.amount.amount}
                                        {...register(`ingredients.${index}.amount.amount`, { required: true })}
                                        onChange={(e) => handleIngredientChange(index, 'amount', Number(e.target.value))} />
                                    {errors.ingredients?.[index]?.amount?.amount && (
                                        <ErrorText>This field is required</ErrorText>
                                    )}
                                </div>
                                <div>
                                    Unit:
                                    <Input
                                        type="text"
                                        value={ingredient.amount.unit}
                                        {...register(`ingredients.${index}.amount.unit`, { required: true })}
                                        onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)} />
                                    {errors.ingredients?.[index]?.amount?.unit && (
                                        <ErrorText>This field is required</ErrorText>
                                    )}
                                </div>
                            </ListItem></div>
                        ))}
                    </ul>
                </div>
                <Button buttonType="secondary" onClick={addIngredient}>Add Ingredient</Button>
                <ButtonContainer>
                    <Button buttonType="primary" type="submit">Create Recipe</Button>
                </ButtonContainer>
            </Form>
        </Card>
    );
};

export default CreateRecipe;
