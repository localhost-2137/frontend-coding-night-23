import {useEffect, useState} from "react";

export default function useFetch(path: string, options?: any, timeout?: number) {

    const [response, setResponse] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const url = `${import.meta.env.VITE_API_URL}/${path}`;

    useEffect(() => {

        const fetchData = async () => {
            setLoading(true);

            const res = await fetch(url, options);

            if (!res.ok) {
                setLoading(false)
                return setError(res.statusText);
            }

            const json = await res.json();
            setLoading(false)
            setError(null)
            setResponse(json);
        };

        if (timeout) {
            setInterval(() => {
                fetchData();
            }, timeout)
        } else {
            fetchData();
        }
    }, []);

    return {response, error, loading};
}