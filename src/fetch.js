import axios from "axios";
import React from "react";
import { useState } from "react";

export default function FetchTest() {
    const [test, setTest] = useState("");

    function getData() {
        axios.get('http://localhost:3001/', { corssdomain: true })
        .then(response => {
            console.log(response.data)
        })
    }

    return (
        <div>
            <button onClick={getData}>fetch</button>
            <h1>{test}</h1>
        </div>
    )
}