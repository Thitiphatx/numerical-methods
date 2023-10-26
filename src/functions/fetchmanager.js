import { useState, useEffect } from "react";
import axios from "axios";

export function FetchManager(method) {
    const [data, setData] = useState([]);

    const getHistory = ()=> {
        axios.get(`http://localhost:3001/getHistory/${method}`).then((response) => {
            setData(response.data);
        })
    }
    useEffect(()=> {
        getHistory();
    }, []) 

    return data;
}