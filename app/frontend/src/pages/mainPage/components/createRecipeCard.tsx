import { useFieldArray, useForm } from 'react-hook-form';
import styled from 'styled-components';
import Spinner from 'react-spinner-material';

import React from 'react';
import { Recipe } from '../../../types';
import usePostFetch from '../../../hooks/apiHooks/usePostFetch';
import { API_URL, RECIPES_QUERY } from '../../../utils/apis';
import Card from '../../../components/Cards';
import Button from '../../../components/Button';
import Form from '../../../components/Form/Form';
import InputField from '../../../components/Form/Fields/InputField';
import DropdownSelect from '../../../components/Form/Fields/DropdownSelectField';
import TextAreaField from '../../../components/Form/Fields/TextareaField';

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

// TODO: make a common component for this
export const RemoveButton = styled.button`
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

const UNIT_OPTIONS = ['kg','g', 'ml', 'l', 'tbsp', 'tsp', 'piece','unit','cup'];

type CreateRecipeProps = {
    refetch: () => void;
};

const OPENAI_API_KEY = ''; // Replace with your actual API key

const CreateRecipe: React.FC<CreateRecipeProps> = ({refetch}) => {
    const { control, handleSubmit, reset, formState: { errors } } = useForm<Recipe>();
    
    const { fields, remove, append } = useFieldArray({
        control,
        name: 'amount_set',
      });
    
    const { postData }  = usePostFetch<Recipe>(`${API_URL}${RECIPES_QUERY}`);

    const onSubmit = (data: Recipe) => {
        try {
            postData(data);
            // Handle successful creation of recipe
            reset({
                name: '',
                description: '',
                amount_set: [],
              });
            refetch();
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
                                        name={`amount_set.${index}.ingredient.name`} 
                                        label="Name:" 
                                        rules={{ required: true }} 
                                        error={errors.amount_set?.[index]?.ingredient?.name}
                                        defaultValue={field.ingredient.name}/>
                            <InputField control={control} 
                                        name={`amount_set.${index}.amount`} 
                                        label="Amount:" 
                                        rules={{ required: true }} 
                                        error={errors.amount_set?.[index]?.amount}
                                        defaultValue={field.amount}/>
                            <DropdownSelect 
                                        control={control} 
                                        name={`amount_set.${index}.unit`} 
                                        label="Unit:" 
                                        rules={{ required: true }} 
                                        error={errors.amount_set?.[index]?.unit}
                                        defaultValue={field.unit}
                                        selectOptions={UNIT_OPTIONS}/>
                        </ListItem></div>
                    ))}
                </ul>
            </div>
        )}, [fields, remove, control, errors.amount_set]);


    return (
        <Card>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <InputField 
                    control={control} 
                    name="name" 
                    label="Name:" 
                    rules={{ required: true }} 
                    error={errors.name}
                />
                <TextAreaField 
                    control={control} 
                    name="description" 
                    label="Description:" 
                    rules={{ required: true }} 
                    error={errors.description}
                />
                {ingredients}
                <Button buttonType="secondary" onClick={() => append({ amount: 0, unit: '', ingredient: { name: ''} })}>
                    Add Ingredient
                </Button>
                <ButtonContainer>
                    <Button buttonType="primary" type="submit">
                        Create Recipe
                    </Button>
                </ButtonContainer>
            </Form>
        </Card>
    );
};

export default CreateRecipe;
