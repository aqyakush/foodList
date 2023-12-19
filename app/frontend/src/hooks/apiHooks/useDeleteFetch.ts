import { useState } from 'react';

const useDeleteFetch = () => {
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
            }

            setIsLoading(false);
        };

        return fetchData();
    };

    return { isLoading, error, data, deleteItem };
};

export default useDeleteFetch;
