import React, {useCallback, useEffect, useState} from 'react'
import './App.css'
import { TableDeals } from './pages/homePage'
import { getDeatls } from './pages/homePage/utils/getDeal'

const App = () => {
    const [deals, setDeals] = useState([])

    useEffect(() => {
        getDeatls(setDeals)
    }, [])

    const onAddRow = useCallback(() => {
        fetch('http://localhost:8080/newDeal', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user: 'test' }),
        })
            .then((response) => response.json())
            .then((response) => console.log(response))
    }, [])

    const id = "GAXU_bL7H--qhTzDZtDsf'"

    const onDeleteRow = useCallback(() => {
        fetch(`http://localhost:8080/api/newDeal/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            // body: JSON.stringify({id: 'GAXU_bL7H--qhTzDZtDsf'})
        })
            .then((response) => response.json())
            .then((response) => console.log(response))
    }, [])

    return (
        <div className="App">
            <header className="App-header">
                <button onClick={onAddRow}>Added</button>

                <button onClick={onDeleteRow}>Deleted</button>
            </header>

            <TableDeals deals={deals} setDeals={setDeals}/>
        </div>
    )
}

export default App
