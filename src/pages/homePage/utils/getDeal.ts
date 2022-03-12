import { Dispatch } from 'react';

export const getDeatls = (setDeals: Dispatch<any>) => {
    fetch('http://localhost:8080/deals', {
        method: 'get',
    }).then((response) => response.json())
        .then((response) => setDeals(response))
}
