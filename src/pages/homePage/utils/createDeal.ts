import {getDeals} from './getDeal'
import { Deal } from '../index.typings'

type GetDealRequest = {
    setContext: (value: any) => void;
    page: number;
    deal?: Deal;
    setNotify?: (value: boolean) => void;
}

export const createDeals = ({ page, setContext, deal, setNotify }:GetDealRequest) => {
    fetch('http://localhost:8080/api/v1/newDeal', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({...deal}),
    })
        .then((response) => response.json())
        .then(() => {
            console.log('create', setNotify)
            setNotify && setNotify(true)
            getDeals({ page, setContext })}
        )
}
