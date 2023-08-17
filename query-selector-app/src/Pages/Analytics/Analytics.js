import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Table from '../../components/Table/Table';
import Calculator from '../../components/Calculator/Calculator';
import Chart from '../../components/Chart/Chart';
import './style.scss'

export default function Analytics() {

    const { state } = useLocation();

    const tableRows = state?.tableRows
    const values = state?.values

    const [column, setColumn] = useState("")

    return (
        <div className="AnalyticsWrapper">
            <div className="AnalyticsHeader">
                <h2>Analyse The Data</h2>
                <Link to="/">
                    <div className="backLink">Go Back</div>
                </Link>
            </div>
            <Table tableRows={tableRows} values={values} />
            <div className="AnalyticsSubWrapper">
                <div className="CalcWrapper">
                    <Calculator tableRows={tableRows} values={values} />
                </div>
                <div className="ChartWrapper">
                    <Chart tableRows={tableRows} values={values} />
                </div>
            </div>

        </div>
    )
}
