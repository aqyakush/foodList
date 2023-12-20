import { useState, useCallback } from 'react';
import { useNotification } from '../../components/Notifications/useNotification';

const usePostFetch = <T>(url: string) => {
    const addNotification = useNotification();
    const [response, setResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const postData = useCallback((data: T) => {
        const fetchData = async () => {
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const responseData = await response.json();
                setResponse(responseData);
                addNotification('Created successfully', 'success');
            } catch (error: any) {
                setError(error.message);
                addNotification(`Failed to create ${error.message}`, 'error');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { response, isLoading, error, postData };
};

export default usePostFetch;