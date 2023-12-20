import { useState, useCallback } from 'react';
import { useNotification } from '../../components/Notifications/useNotification';

const usePatchFetch = <T, U>(url: string) => {
    const addNotification = useNotification();
    const [data, setData] = useState<U | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const patchItem = useCallback( (newData: T, urlId: string) => {
        const patchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`${url}${urlId}/`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ...newData
                    }),
                });
                if (!response.ok) {
                    throw new Error('Failed to patch data');
                }
                const responseData: U = await response.json();
                setData(responseData);
            } catch (error: any) {
                setError(error);
                addNotification(`Failed to patch data ${error.message}`, 'error');
            } finally {
                addNotification('Data fetched successfully', 'success');
                setIsLoading(false);
            }
        };

        patchData();
    }, [url, data]);

    return { data, isLoading, error, patchItem };
};

export default usePatchFetch;
