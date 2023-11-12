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

const OPENAI_API_KEY = 'XXXX'; // Replace with your actual API key

const CreateRecipe = () => {
    const { register, handleSubmit, reset, formState: { errors }, setValue, getValues } = useForm<Recipe>();
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

    const onGetIngredients = async () => {
        try {
            const recipeName = getValues("name");
            if (recipeName.length < 3) {
                return;
            }
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                },
                body: JSON.stringify({
                    "model": "gpt-3.5-turbo",
                    "messages": [{"role": "user", "content": `Please return recipe for ${recipeName}. The response should be a json file. In form {"name":"recipeName","description":"recipe","ingredients":[{"name":"ingredient 1","amount":{"amount":3,"unit":"tsp"}},{"name":"ingredient 2","amount":{"amount":2,"unit":"l"}}]} for unit only use 'kg','g', 'ml', 'l', 'tbsp', 'tsp', 'piece'`}],
                    "temperature": 0.7
                }),
            });

            const data = await response.json();
            const recipe = data.choices[0].message.content;

            setIngredients(JSON.parse(recipe).ingredients);
            setValue(`description`, JSON.parse(recipe).description);

        } catch (error) {
            console.error(error);
        }   
    }


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
            <div>
                Name:
                <Input type="text" {...register("name", { required: true })} />
                {errors.name && <ErrorText>This field is required</ErrorText>}
                <button type="button" onClick={onGetIngredients}>
                    Get recipe Ingredient
                </button>
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
            <AddIngredientButton type="button" onClick={addIngredient}>Add Ingredient</AddIngredientButton>
            <ButtonContainer>
                <Button type="submit">Create Recipe</Button>
            </ButtonContainer>
        </Form>
    );
};

export default CreateRecipe;
