import { useState, useEffect } from 'react';

const useFetch = <T>(url: string, params?: string) => {
    const [query, setQuery] = useState(params ?? "");
    const [data, setData] = useState<T>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reload, setReload] = useState(0);

    const refetch = () => setReload(prevReload => prevReload + 1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${url}${query}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data: T = await response.json();
                setData(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [url, query, reload]);
    // const fetchMealPlan = async () => {
    //     try {
    //         const response = await fetch(`${url}${query}`);
    //         if (!response.ok) {
    //             throw new Error(`HTTP error! status: ${response.status}`);
    //         }
    //         const data: T = await response.json();
    //         setData(data);
    //     } catch (error: any) {
    //         setError(error.message);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    // useEffect(() => {
    //     fetchMealPlan();
    // }, []);

    return { data, setQuery, isLoading, error, refetch};
};

export default useFetch;