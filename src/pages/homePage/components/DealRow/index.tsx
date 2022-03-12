import * as React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import {FC, useCallback} from "react";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { DealProps } from './index.typings'
import {DeleteConfirm} from '../DeleteConfirm'
import {getDeatls} from "../../utils/getDeal";

export const DealRow:FC<DealProps> = ({deal, setDeals}) => {
    const onDeleteRow = useCallback(() => {
        fetch(`http://localhost:8080/api/newDeal/${deal.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then(() => getDeatls(setDeals))
            // .then((response) => console.log(response))
    }, [])

    return (
            <TableRow
                key={deal.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row">
                    {deal.value}
                </TableCell>
                <TableCell>{deal.date}</TableCell>
                <TableCell>
                    <DeleteConfirm onDeleteRow={onDeleteRow}/>
                </TableCell>
            </TableRow>
    );
}

