import React, { useState } from 'react';

const apiUrl = 'http://localhost:5000/api'
const method = 'POST'
const mode = 'cors'
const headers = {
    'content-type': 'application/json'
}

const jsonData = [ {"TV":17.2, "Radio":45.9, "Newspaper":69.3} ]


const makeRequest = async (data) => {

    const res = await fetch(apiUrl, {
      method: method,
      mode: mode,
      cache: "no-cache",
      credentials: "same-origin",
      headers: headers,
      body: JSON.stringify(data)
    });
    const response = await res.json();
    return response;
  };

  export default function App() {
    const [answer, setAnswer] = useState();

    const submit = async () => {
      const res = await makeRequest(jsonData);
      setAnswer(parseFloat(res.prediction.replace("[", "").replace("]", "")));
    };
  
    return (
      <>
        <button onClick={submit}>Send</button>
        <div><p>Sales: {JSON.stringify(answer)}</p></div>
      </>
    );
  }
  