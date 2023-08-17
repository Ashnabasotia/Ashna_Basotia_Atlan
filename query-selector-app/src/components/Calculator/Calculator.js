import React, { useState } from 'react'
import './style.scss'

export default function Calculator({ tableRows, values }) {

    const [column, setColumn] = useState(-1);
    const [mean, setMean] = useState("-");
    const [median, setMedian] = useState("-");
    const [mode, setMode] = useState("-");



    const handleColumnSelection = (event) => {
        const col = event.target.value
        setColumn(col)
        calculateMean(col)
        calculateMedian(col)
        calculateMode(col)
    }

    const calculateMean = (col) => {
        let sum = 0.0;

        for (let i = 0; i < values.length; i++) {
            if (col !== -1 && col < tableRows.length) {
                let currVal = parseFloat(values[i][col]);
                if (isNaN(currVal)) {
                    setMean('Cannot calculate mean of NAN values')
                    return
                }
                else
                    sum += currVal
            }
            else {
                setMean('Invalid Column Selected')
                return
            }
        }

        const res = sum / (values.length)
        setMean(res.toString())
    }

    const calculateMedian = (col) => {

        const n = values.length
        if (col === -1 || col > tableRows.length) {
            setMedian('Invalid Column Selection')
            return
        }

        for (let i = 0; i < values.length; i++) {
            let currVal = values[i][col]
            if (isNaN(currVal)) {
                setMedian('Cannot calculate median of NAN value')
                return
            }
        }

        const data = values.map((val) => {
            return (val[col])
        })

        data.sort((a, b) => a - b)
        let res = 0
        if (n % 2)
            res = data[(n - 1) / 2]
        else
            res = (data[n / 2] + data[(n / 2) - 1]) / 2
        setMedian(res.toString())
    }

    const calculateMode = (col) => {

        if (col === -1 || col > tableRows.length) {
            setMode('Invalid Column Selection')
            return
        }
        const data = values.map((val) => {
            return (val[col])
        })

        const uniqueData = Array.from(new Set(data))
        const frequencyArray = uniqueData.map((key) => {
            return data.reduce((currVal, currdata) =>
                (currdata == key ? currVal + 1 : currVal), 0)
        })
        let index = 0
        let res = frequencyArray[0];
        for (let i = 1; i < uniqueData.length; i++) {
            if (res < frequencyArray[i]) {
                res = frequencyArray[i]
                index = i;
            }
        }
        setMode(uniqueData[index])
    }
    return (
        <div className="CalculatorWrapper">
            <div className="CalcHeader">
                <div className="AnalyticsLabel">Calculate Central Tendencies For Selected Column</div>

                <select onChange={(event) => handleColumnSelection(event)}>
                    <option value="">Select a value</option>
                    {
                        tableRows.map((columnName, index) => {
                            return (<option value={index}>{columnName}</option>)
                        })
                    }
                </select>
            </div>
            <div className="CentralTendencyWrapper">

                <div className="Mean">
                    <div>Mean</div>
                    <div className="meanResult">{mean}</div>
                </div>
                <div className="Median">
                    <div>Median</div>
                    <div className="medianResult">{median}</div>
                </div>
                <div className="Mode">
                    <div>Mode</div>
                    <div className="modeResult">{mode}</div>
                </div>
            </div>
        </div>
    )
}
