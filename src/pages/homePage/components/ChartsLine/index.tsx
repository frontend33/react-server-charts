import React, {SyntheticEvent, useContext, useEffect, useState} from 'react';
import {Context} from "../../../../App";
// @ts-ignore
import {CanvasJSChart} from 'canvasjs-react-charts'
import { Deal } from '../../index.typings'

export const ChartsLine = () => {
    const [context] = useContext(Context);

    const { deals, setActiveRow } = context

    const onMouseOut = () => {
        setActiveRow('')
    }

    const onMouseover = (e: SyntheticEvent | any) => {
        setActiveRow(String(e.dataPoint.id))
    }
    // TODO не стал искать типы options из библиотеки с целью экономии времени
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

    const [dataChart, setDataChart] = useState(options);

    useEffect(() => {
        if (!!deals.dealsList.length) {
            deals.dealsList.forEach((deal: Deal) => {
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
