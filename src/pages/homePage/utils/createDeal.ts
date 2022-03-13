import {getDeals} from './getDeal'

type GetDealRequest = {
    setContext: (value: any) => void;
    page: number;
    deal: any;
}

export const createDeals = ({ page, setContext, deal }:GetDealRequest) => {
    fetch('http://localhost:8080/api/v1/newDeal', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({...deal}),
    })
        .then((response) => response.json())
        .then(() => getDeals({ page, setContext }))
}
