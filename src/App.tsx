import React, {useCallback, useEffect} from 'react';
import './App.css';

function App() {
  useEffect( () => {
      fetch("http://localhost:8080/deals", {
        method: "get"
      }).then(response => console.log('response', response))
  },[])

    const onAddRow = useCallback(() => {
        fetch("http://localhost:8080/newDeal", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user: 'test'})
        }).then(response => response.json()).then(response => console.log(response))
    },[])

    const id = "GAXU_bL7H--qhTzDZtDsf'"

    const onDeleteRow = useCallback(() => {
        fetch(`http://localhost:8080/api/newDeal/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            // body: JSON.stringify({id: 'GAXU_bL7H--qhTzDZtDsf'})
        }).then(response => response.json()).then(response => console.log(response))
    },[])

  return (
    <div className="App">
      <header className="App-header">
          <button onClick={onAddRow}>
              Added
          </button>

          <button onClick={onDeleteRow}>
              Deleted
          </button>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
