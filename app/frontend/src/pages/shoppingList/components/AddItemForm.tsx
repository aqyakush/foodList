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
    padding-top: 20px;
    font-size: 16px;
`;

const Form = styled.form`
  display: flex;
  gap: 40px;
  align-items: flex-start;
`;

const AmountField = styled.div`
  width: 50px; 
`;

const UnitField = styled.div`
  width: 100px;
`;

const UNIT_OPTIONS = ['kg','g', 'ml', 'l', 'tbsp', 'tsp', 'piece','unit','cup'];

type AddItemFormProps = {
    shoppingList: number;
    handleAction: () => void;
};

const AddItemForm: React.FC<AddItemFormProps> = ({ shoppingList, handleAction }) => {
    const { control, handleSubmit, reset, formState: { errors }, watch } = useForm<Item>();

    const values = watch(); 
    
    const { postData }  = usePostFetch<Item>(`${SHOPPING_LIST_ITEMS_URL}`);

    const onSubmit = React.useCallback((data: Item) => {
        try {
            const finalData = {
                ...data,
                ingredient: null,
                shopping_list: shoppingList,
                is_bought: false,
            }
            postData(finalData);
            reset({
                name: '',
                unit: 'piece',
                amount: 1.0,
                ingredient: undefined,
                shopping_list: undefined,
                is_bought: false,
              });
            handleAction();
        } catch (error) {
            console.error(error);
        }
    }, [postData, reset, shoppingList, handleAction]);

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <InputField 
                control={control} 
                name="name" 
                label="Name:" 
                rules={{ required: true }} 
                error={errors.name}
            />
            <AmountField>
                <InputField 
                    control={control} 
                    name="amount" 
                    label="Amount:" 
                    rules={{ required: true }} 
                    error={errors.amount}
                    type='number'
                    defaultValue={1}
                    min={0}
                />
            </AmountField>

            <UnitField>
                <DropdownSelect 
                    control={control} 
                    name={`unit`} 
                    label="Unit:" 
                    rules={{ required: true }} 
                    error={errors.unit}
                    defaultValue={'piece'}
                    selectOptions={UNIT_OPTIONS}/>
            </UnitField>
            <ButtonContainer>
                <Button 
                    buttontype="primary" 
                    type="submit" 
                    disabled={!values.name || !values.amount || !values.unit}
                    title={!values.name || !values.amount || !values.unit ? 'Please provide information to be able to create an item' : ''}>
                    Create Item
                </Button>
            </ButtonContainer>
        </Form>
    );
};

export default AddItemForm;
