import React, { useId, useState } from 'react';

// prepare request
const apiUrl = 'http://localhost:5000/api'
const method = 'POST'
const mode = 'cors'
const cache = "no-cache"
const credentials = "same-origin"
const headers = {
    'content-type': 'application/json'
}

// default request data
const jsonData = [{"TV":17.2,"Radio":45.9,"Newspaper":69.3}]
const stringData = JSON.stringify(jsonData)

// make request when submit button is pressed
const makeRequest = async (data) => {
    const res = await fetch(apiUrl, {
      method: method,
      mode: mode,
      cache: cache,
      credentials: credentials,
      headers: headers,
      body: JSON.stringify(data)
    });
    const response = await res.json();
    return response;
};

export default function App(props) {
    // get input field value
    const id = useId();
    const [input, setInput] = useState(props?.value ?? '');
    // store api response
    const [answer, setAnswer] = useState();
    // handle submit button press
    const submit = async () => {
      const res = await makeRequest(JSON.parse(input) || jsonData);
      setAnswer(parseFloat(res.prediction.replace("[", "").replace("]", "")));
      console.log(JSON.parse(input))
    };
  
    return (
      <>
        <h1>Sales Predictions</h1>
        <form>
        <fieldset>
          <label>
            <h3>Expenditures for Adverts</h3>
            <p>Please specify the advertisement budget for <strong>TV</strong>, <strong>Radio</strong> and <strong>Newspaper</strong> adverts:</p>
            <label htmlFor={id}><strong>Input JSON Data:</strong> </label>
            <input
                id={id}
                value={input}
                placeholder='  [{"TV":17.2,"Radio":45.9,"Newspaper":69.3}]'
                className="form-control"
                type="json"
                size="32"
                onInput={e => setInput(e.target.value)}
              /><br/>
              <em>Example: <code>{stringData}</code></em>
          </label>
        </fieldset>
        </form>
        <div>
        <button type='submit' onClick={submit}>Send</button>
          <h5>Revenue Prediction:</h5>
          <p>{JSON.stringify(answer)}</p>
        </div>
      </>
    );
}
  