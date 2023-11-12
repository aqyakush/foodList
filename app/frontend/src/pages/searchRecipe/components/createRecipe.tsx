import { useForm } from 'react-hook-form';
import { useState } from 'react';
import styled from 'styled-components';

import React from 'react';

export type Recipe = {
    name: string,
    description: string,
    ingredients: Array<Ingredient>
  }
  
  export type Ingredient = {
    name: string;
    amount: Amount
  }

  export type Amount = {
    amount: number;
    unit: string;
  }

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
`;

const Input = styled.input`
  margin-bottom: 20px;
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const TextArea = styled.textarea`
  margin-bottom: 20px;
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  background-color: #007BFF;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  float: right;

  &:hover {
      background-color: #0056b3;
  }
`;

const ErrorText= styled.span`
  color: darkred;
  margin-top: -15px;
  margin-bottom: 15px;
  display: inline-block;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const AddIngredientButton = styled(Button)`
  background-color: white;
  color: #007BFF;

  &:hover {
      background-color: #f2f2f2;
  }
`;

const RemoveButton = styled.button`
  background-color: transparent;
  color: red;
  border: none;
  cursor: pointer;
  font-size: 20px;
  padding: 0;
`;

const ListItem = styled.li`
  list-style-type: none;
`;


const CreateRecipe = () => {
    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm<Recipe>();
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);

    const onSubmit = async (data: Recipe) => {
        try {
            console.log(data)
            const response = await fetch('http://192.168.49.2/api/recipes/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Failed to create recipe');
            }

            // Handle successful creation of recipe
            reset();
            setIngredients([]);
        } catch (error) {
            console.error(error);
        }
    };

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
        console.log(newIngredients);
        setIngredients(newIngredients);
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <label>
                Name:
                <Input type="text" {...register("name", { required: true })} />
                {errors.name && <ErrorText>This field is required</ErrorText>}
            </label>
            <label>
                Description:
                <TextArea
                    {...register("description", { required: true })}
                />
                {errors.description && <ErrorText>This field is required</ErrorText>}
            </label>
            <label>
                {ingredients.length > 0 && "Ingredients:"}
                <ul>
                    {ingredients.map((ingredient, index) => (
                        <><RemoveButton type="button" onClick={() => removeIngredient(index)}>✖</RemoveButton>
                        <ListItem key={index}>
                            <label>
                                Name:
                                <Input
                                    type="text"
                                    value={ingredient.name}
                                    {...register(`ingredients.${index}.name`, { required: true })}
                                    onChange={(e) => handleIngredientChange(index, 'name', e.target.value)} />
                                {errors.ingredients?.[index]?.name && (
                                    <ErrorText>This field is required</ErrorText>
                                )}
                            </label>
                            <label>
                                Amount:
                                <Input
                                    type="number"
                                    value={ingredient.amount.amount}
                                    {...register(`ingredients.${index}.amount.amount`, { required: true })}
                                    onChange={(e) => handleIngredientChange(index, 'amount', Number(e.target.value))} />
                                {errors.ingredients?.[index]?.amount?.amount && (
                                    <ErrorText>This field is required</ErrorText>
                                )}
                            </label>
                            <label>
                                Unit:
                                <Input
                                    type="text"
                                    value={ingredient.amount.unit}
                                    {...register(`ingredients.${index}.amount.unit`, { required: true })}
                                    onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)} />
                                {errors.ingredients?.[index]?.amount?.unit && (
                                    <ErrorText>This field is required</ErrorText>
                                )}
                            </label>
                        </ListItem></>
                    ))}
                </ul>
            </label>
            <AddIngredientButton type="button" onClick={addIngredient}>Add Ingredient</AddIngredientButton>
            <ButtonContainer>
                <Button type="submit">Create Recipe</Button>
            </ButtonContainer>
        </Form>
    );
};

export default CreateRecipe;
