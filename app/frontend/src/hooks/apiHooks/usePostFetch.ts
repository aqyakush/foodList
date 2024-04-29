import { useState, useCallback } from 'react';
import { useNotification } from '../../components/Notifications/useNotification';
import { useNavigate } from 'react-router-dom';

const usePostFetch = <T>(url: string, redirectUrl?: string) => {
    const addNotification = useNotification();
    const navigate = useNavigate();
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
                if (redirectUrl) {
                    navigate(`${redirectUrl}${responseData.id}`);
                }
                addNotification('Data created', 'Created successfully', 'success');
            } catch (error: any) {
                setError(error.message);
                addNotification('Error', `Failed to create ${error.message}`, 'error');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [addNotification, navigate, redirectUrl, url]);

    return { response, isLoading, error, postData };
};

export default usePostFetch;