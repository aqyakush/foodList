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

                console.log("response", response)

                if (!response.ok) {
                    throw new Error('Failed to delete data');
                }

                // Only try to parse the response as JSON if there is a response body
                if (response.status !== 204 && response.body) {
                    const responseData = await response.json();
                    setData(responseData);
                }
                addNotification('Deleted', 'Data deleted successfully', 'success');
            } catch (error: any) {
                console.log("error", error)
                setError(error);
                addNotification('Error', `Failed to patch data ${error.message}`, 'error');
            } finally { 
                setIsLoading(false);
            }
        };

        return fetchData();
    };

    return { isLoading, error, data, deleteItem };
};

export default useDeleteFetch;
