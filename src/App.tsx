import React, { useCallback, useEffect, useState, useContext } from 'react'
import './App.css'
import { TableDeals } from './pages/homePage'
import { getDeals } from './pages/homePage/utils/getDeal'

export const Context = React.createContext<any>(null)

const App = () => {
    const [deals, setDeals] = useState({
        dealsList: [],
        isNext: true
    })
    const [page, setPage] = useState(1)

    const [context, setContext] = useState({ setDeals, page, setPage, deals })

    useEffect(() => {
        getDeals({ page, setContext })
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
            .then(() => getDeals({ page, setContext }))
    }, [])

    return (
        <Context.Provider value={[context, setContext]}>
            <div className="App">
                <header className="App-header">
                    <button onClick={onAddRow}>Added</button>
                </header>

                <TableDeals />
            </div>
        </Context.Provider>
    )
}

export default App
