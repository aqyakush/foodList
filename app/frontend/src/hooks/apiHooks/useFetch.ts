import { useState, useEffect } from 'react';

const useFetch = <T>(url: string, params?: string) => {
    const [query, setQuery] = useState(params ?? "");
    const [data, setData] = useState<T>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${url}${query}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data: T = await response.json();
                setData(data);
                setIsLoading(false);
            } catch (err: any) {
                setError(err.message);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [url, query]);

    return { data, setQuery, isLoading, error };
};

export default useFetch;