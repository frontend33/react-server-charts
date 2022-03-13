type GetDealRequest = {
    setContext: (value: any) => void;
    page: number;
    deals?: any;
}

const limit = 10

export const getDeals = ({ page, deals, setContext }:GetDealRequest) => {
    fetch(`http://localhost:8080/api/v1/deals?page=${page}&limit=${limit}`, {
        method: 'get',
    }).then((response) => response.json())
        .then((response) => {
            let dealsList = !!deals?.dealsList.length ? deals.dealsList.concat(response.dealsList) : response.dealsList
            let dealsData = {
                dealsList,
                isNext: response.isNext
            }

            setContext((prevState: any) => ({
                ...prevState,
                deals: dealsData
            }));
            }

        )
}
