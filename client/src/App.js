import React from "react";
import logo from './logo.svg';
import './App.css';

function App() {
  const [data, setData] = React.useState(null);
  const [responseToPostValues, setState] = React.useState({
    post: '',
    responseToPost: '',
  })
  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch('/api/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({post:responseToPostValues.post}),
    });
    const result = await response.text();

    setState({ ...responseToPostValues, responseToPost: result });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <p>
            <strong>Get from Server:</strong>
        </p>
        <p>{!data ? "Loading..." : data}</p>

        <form onSubmit={handleSubmit}>
          <p>
            <strong>Post to Server:</strong>
          </p>
          <input
            type="text"
            value={responseToPostValues.post}
            onChange={e => setState({ ...responseToPostValues, post: e.target.value })}
          />
          <button type="submit">Submit</button>
        </form>
        <p>{responseToPostValues.responseToPost}</p>
      </header>
    </div>
  );
}

export default App;
