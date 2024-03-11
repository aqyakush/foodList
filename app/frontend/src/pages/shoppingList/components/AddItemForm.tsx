import React from 'react';
import { useForm } from 'react-hook-form';
import Item from '../../../types/item';
import usePostFetch from '../../../hooks/apiHooks/usePostFetch';
import { SHOPPING_LIST_ITEMS_URL } from '../../../utils/apis';
import InputField from '../../../components/Form/Fields/InputField';
import Button from '../../../components/Button';
import DropdownSelect from '../../../components/Form/Fields/DropdownSelectField';
import styled from 'styled-components';

const ButtonContainer = styled.div`
    margin-bottom: 20px;
    padding: 10px;
    font-size: 16px;
`;

const Form = styled.form`
  display: flex;
  gap: 20px;
  align-items: flex-start;
`;


const UNIT_OPTIONS = ['kg','g', 'ml', 'l', 'tbsp', 'tsp', 'piece','unit','cup'];

type AddItemFormProps = {
    shoppingList: number;
    handleAction: () => void;
};

const AddItemForm: React.FC<AddItemFormProps> = ({ shoppingList, handleAction }) => {
    const { control, handleSubmit, reset, formState: { errors } } = useForm<Item>();
    
    const { postData }  = usePostFetch<Item>(`${SHOPPING_LIST_ITEMS_URL}`);

    const onSubmit = (data: Item) => {
        try {
            const finalData = {
                ...data,
                ingredient: null,
                shopping_list: shoppingList,
                is_bought: false,
            }
            console.log(finalData);
            postData(finalData);
            reset({
                name: '',
                unit: '',
                amount: 0.0,
                ingredient: undefined,
                shopping_list: undefined,
                is_bought: false,
              });
            handleAction();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <InputField 
                control={control} 
                name="name" 
                label="Name:" 
                rules={{ required: true }} 
                error={errors.name}
            />
            <InputField 
                control={control} 
                name="amount" 
                label="Amount:" 
                rules={{ required: true }} 
                error={errors.amount}
            />
            <DropdownSelect 
                control={control} 
                name={`unit`} 
                label="Unit:" 
                rules={{ required: true }} 
                error={errors.unit}
                selectOptions={UNIT_OPTIONS}/>
            <ButtonContainer>
                <Button buttonType="primary" type="submit">
                    Create Item
                </Button>
            </ButtonContainer>
        </Form>
    );
};

export default AddItemForm;
