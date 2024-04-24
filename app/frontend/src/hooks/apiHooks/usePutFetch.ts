import { useState, useCallback } from 'react';
import { useNotification } from '../../components/Notifications/useNotification';

const usePutFetch = <T, U>(url: string) => {
    const addNotification = useNotification();
    const [data, setData] = useState<U | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateItem = useCallback( (newData: T, urlId: string) => {
        const updateData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`${url}${urlId}/`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ...newData
                    }),
                });
                if (!response.ok) {
                    throw new Error('Failed to updte data');
                }
                const responseData: U = await response.json();
                setData(responseData);
                addNotification('Data Updated', 'Data updated successfully', 'success');
            } catch (error: any) {
                setError(error);
                addNotification('Error', `Failed to update data ${error.message}`, 'error');
            } finally {
                setIsLoading(false);
            }
        };

        updateData();
    }, [url, addNotification]);

    return { data, isLoading, error, updateItem };
};

export default usePutFetch;
