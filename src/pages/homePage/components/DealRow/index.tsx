import React, {useContext} from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import {FC, useCallback} from "react";
import { DealProps } from './index.typings'
import {DeleteConfirm} from '../DeleteConfirm'
import {getDeals} from "../../utils/getDeal";
import {Context} from '../../../../App'

export const DealRow:FC<DealProps> = ({deal, activeRow}) => {
    const [context, setContext] = useContext(Context);

    const { page } = context

    const onDeleteRow = useCallback(() => {
        fetch(`http://localhost:8080/api/newDeal/${deal.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then(() => getDeals({ page, setContext}))
    }, [])

    const isActiveRow = activeRow === deal.id

    return (
            <TableRow
                key={deal.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                selected={isActiveRow}
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

