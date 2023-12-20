import { useState } from 'react';
import { useNotification } from '../../components/Notifications/useNotification';

const useDeleteFetch = () => {
    const addNotification = useNotification();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [data, setData] = useState(null);

    const deleteItem = (url: string) => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(url, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error('Failed to delete data');
                }

                const responseData = await response.json();
                setData(responseData);
            } catch (error: any) {
                setError(error);
                addNotification(`Failed to patch data ${error.message}`, 'error');
            }
            addNotification('Data deleted successfully', 'success');
            setIsLoading(false);
        };

        return fetchData();
    };

    return { isLoading, error, data, deleteItem };
};

export default useDeleteFetch;
