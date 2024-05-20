import { useEffect, useState } from "react";

const API_URL = "https://api.quicksell.co/v1/internal/frontend-assignment";
const useFetchTaskData = () => {
    const [tickets, setTickets] = useState([]);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async () => {
        try {
            const res = await fetch(API_URL);
            const data = await res.json();
            if(data) {
                setIsLoading(false);
                setTickets(data?.tickets || []);
                setUsers(data?.users || []);
            }
        } catch(err) {
            setIsLoading(false);
            setError(err.message);
        } 
    }

    useEffect(() => {
        setIsLoading(true);
        fetchData();
    }, [])

    return [tickets, users, isLoading, error];
}

export default useFetchTaskData;