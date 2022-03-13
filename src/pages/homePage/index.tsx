import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {FC, useCallback, useContext} from "react";
import {DealRow} from './components/DealRow'
import Button from "@mui/material/Button";
import {Context} from "../../App";
import {getDeals} from "./utils/getDeal";
import "./index.css"

export const TableDeals:FC<any> = ({activeRow}: any) => {
    const [context, setContext] = useContext(Context);
    const { page, deals } = context

    const onNextClick = useCallback(() => {
        getDeals({deals, setContext, page: parseInt(page) + 1})
        setContext({
            ...context,
            page: parseInt(page) + 1
        })
    },[page, deals, context])

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Value</TableCell>
                        <TableCell>Date and Time</TableCell>
                        <TableCell>Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {!!deals?.dealsList.length && deals.dealsList.map((row: any) => (
                        <DealRow activeRow={activeRow} key={row.id} deal={row}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
            {
                deals.isNext && <div className="loadButton">
                    <Button size="small" variant="contained" onClick={onNextClick}>Load next page</Button>
                </div>
            }
        </Paper>
    );
}

