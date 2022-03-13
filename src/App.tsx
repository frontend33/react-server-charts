import React, { useCallback, useEffect, useState } from 'react'
import './App.css'
import { ChartsLine } from './pages/homePage/components/ChartsLine'
import { TableDeals } from './pages/homePage'
import { getDeals } from './pages/homePage/utils/getDeal'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { CreateDeal } from './pages/homePage/components/CreateDeal'

export const Context = React.createContext<any>(null)

const App = () => {
    const [deals, setDeals] = useState({
        dealsList: [],
        isNext: true,
    })
    const [page, setPage] = useState(1)
    const [activeRow, setActiveRow] = useState('')

    const [context, setContext] = useState({ setDeals, page, setPage, deals, activeRow, setActiveRow })

    useEffect(() => {
        getDeals({ page, setContext })
    }, [])

    return (
        <Context.Provider value={[context, setContext]}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Mango deals
                    </Typography>
                    <CreateDeal />
                </Toolbar>

                <ChartsLine />
                <TableDeals activeRow={activeRow} />
            </AppBar>
        </Context.Provider>
    )
}

export default App
