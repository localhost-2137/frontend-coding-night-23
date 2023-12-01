import {useEffect, useState} from "react";

export default function useFetch(path: string, options?: any) {

    const [response, setResponse] = useState(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const url = `${import.meta.env.VITE_API_URL}/${path}`;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            const res = await fetch(url, options);

            if (!res.ok) {
                return setError(res.statusText);
            }

            const json = await res.json();
            setResponse(json);
        };

        fetchData();
    }, []);

    return {response, error, loading};
}