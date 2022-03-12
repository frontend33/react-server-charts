import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {FC} from "react";
import {Deals} from "./index.typings";
import {DealRow} from './components/DealRow'

export const TableDeals:FC<Deals> = ({ deals, setDeals}) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Value</TableCell>
                        <TableCell>Date and Time</TableCell>
                        <TableCell>Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {deals.map((row) => (
                        <DealRow key={row.id} deal={row} setDeals={setDeals}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

