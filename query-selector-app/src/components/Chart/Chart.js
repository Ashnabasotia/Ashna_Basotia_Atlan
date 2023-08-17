import React, { useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { Doughnut, Pie } from 'react-chartjs-2';
import './style.scss'

ChartJS.register(ArcElement, Tooltip);
export default function Chart({ tableRows, values }) {
    const [column, setColumn] = useState(-1);

    const getLabels = () => {
        const labels = values.map((arr) => {
            return (arr[column])
        })
        return labels
    }

    const getUnique = (labels) => {
        const uniqueLabelsArr = Array.from(new Set(labels))
        return uniqueLabelsArr;
    }

    const getLabelCount = (uniqueLabels, labels) => {
        const data = uniqueLabels.map((label) => {
            return labels.reduce((value, currLabel) =>
                (currLabel == label ? value + 1 : value), 0);
        });
        return data;
    }

 
    

    const labels = getLabels();
    const uniqueLabels = getUnique(labels);
    const labelCount = getLabelCount(uniqueLabels, labels);

    const data = {
        labels: [...uniqueLabels],
        datasets: [
            {
                label: 'count',
                data: [...labelCount],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };



    const handleColumnSelection = (event) => {
        setColumn(event.target.value)
    }
    return (

        <>
            <div className="ChartHeader">
                <div className="AnalyticsLabel">Pie Chart For Given Data Table</div>

                <select onChange={(event) => handleColumnSelection(event)}>
                    <option value="">Select a value</option>
                    {
                        tableRows.map((columnName, index) => {
                            return (<option value={index}>{columnName}</option>)
                        })
                    }
                </select>
            </div>
            <div className="DoughnutWrapper">
                <Doughnut data={data} option={{
                    responsive: true,
                    maintainAspectRatio: false,
                }} />
               
            </div>
        </>

    );
}
