import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../../../App";
// @ts-ignore
import {CanvasJSChart} from 'canvasjs-react-charts'

export const ChartsLine = () => {
    const [context] = useContext(Context);

    const { deals, setActiveRow } = context

    const onMouseOut = () => {
        setActiveRow('')
    }

    const onMouseover = (e: any) => {
        setActiveRow(String(e.dataPoint.id))
    }

    const options: any = {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: "Deals"
        },
        axisY: {
            title: "Deals",
            logarithmic: true
        },
        data: [{
            type: "spline",
            showInLegend: true,
            legendText: "Deals",
            dataPoints: [],
            mouseover: onMouseover,
            mouseout: onMouseOut,
        }]
    }

    const [dataChart, setDataChart] = useState<any>(options);

    useEffect(() => {
        if (!!deals.dealsList.length) {
            deals.dealsList.forEach((deal: any) => {
                options.data[0].dataPoints.push({
                    x: new Date(deal.date),
                    y: Number(deal.value),
                    id: deal.id,
                })
            })
        }

        setDataChart(options)

    },[deals])

    return <CanvasJSChart options={dataChart} />;
}
