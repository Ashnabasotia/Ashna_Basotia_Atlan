import React, { useState, useEffect, useCallback } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import Papa from "papaparse";
import Table from '../../components/Table/Table';
import History from '../../components/History/History';
import Menu from '../../components/Menu/Menu'
import DropdownQuery from '../../components/DropdownQuery/DropdownQuery';
import CustomQuery from '../../components/CustomQuery/CustomQuery';
import { customers } from "../../data/customers"
import { employees } from "../../data/employees"
import { products } from "../../data/products"
import { suppliers } from "../../data/suppliers"
import "./style.scss"

function HomePage() {

  const [tableRows, setTableRows] = useState([]);
  const [values, setValues] = useState([]);
  const [history, setHistory] = useState([])

  const predefinedQueries = {
    "SELECT * FROM CUSTOMERS ORDER BY companyName": customers,
    "SELECT * FROM EMPLOYEES": employees,
    "SELECT * FROM PRODUCTS": products,
  }

  const LIMIT_HISTORY = 3;

  const navigate = useNavigate();

  useEffect(() => {
    const handleInitialState = () => {
      if (!localStorage.getItem("history"))
        localStorage.setItem("history", JSON.stringify(history));
      else {
        const histString = localStorage.getItem("history");
        const histArr = JSON.parse(histString);
        setHistory(histArr);
        if (histArr.length > 0) {
          handleTableRows(histArr[histArr.length - 1].tableRows);
          handleValues(histArr[histArr.length - 1].values);
        }

      }
    }
    handleInitialState();
  }, [])


  
  const handleHistory = (tableRows, values, query, index) => {
    let tempHist = JSON.parse(localStorage.getItem("history"))
    if (tempHist.length === LIMIT_HISTORY) {
      if (index === -1)
        tempHist.splice(0, 1)
      else
        tempHist.splice(index, 1)
    }
    localStorage.setItem("history", JSON.stringify([...tempHist, { "query": query, "tableRows": tableRows, "values": values }]));
    setHistory([...tempHist, { "query": query, "tableRows": tableRows, "values": values }]);
  }
  const handleValues = (data) => {
    setValues([...data])
  }
  const handleTableRows = (data) => {
    setTableRows([...data])
  }
  const handleSelect = (event) => {
    if (!event.target.value) {
      handleValues([]);
      handleTableRows([]);
    }
    else {
      handleTableRenderer(predefinedQueries[event.target.value], event.target.value);
    }

  }
  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    if (event.target[0].value) {
      handleTableRenderer(suppliers, event.target[0].value);
    }
    else {
      handleValues([]);
      handleTableRows([]);
    }
  },[])
  const handleSort = useCallback((event) => {
    let index = event.target.value
    let arr = values
    arr.sort((a, b) => a[index].localeCompare(b[index]))
    handleValues(arr);
  }, [values, handleValues]);
  
  const handleFilterSubmit = useCallback((event) => {
    event.preventDefault();
    const data = JSON.parse(localStorage.getItem("history"))
    const dataValues = data[data.length - 1].values
    const items = Object.values(event.target)
    const colName = items[0].value
    const searchVal = items[1].value
    const res = dataValues.filter((arr) => {
      return (arr[colName].toLocaleLowerCase().includes(searchVal.toLocaleLowerCase()))
    })
    handleValues(res);
  }, [handleValues]);

  const onHistorySelection = useCallback((query, index) => {
    const data = JSON.parse(localStorage.getItem("history"))
    const dataValues = data[index].values
    const dataRows = data[index].tableRows;
    handleValues(dataValues);
    handleTableRows(dataRows)
    handleHistory(dataRows, dataValues, query, index);
  }, [handleHistory, handleValues, handleTableRows]);

  const handleTableRenderer =useCallback((data, query) => {
    const index = history.findIndex((obj) => {
      return obj.query === query
    })
    if (index !== -1) {
      handleTableRows(history[index].tableRows);
      handleValues(history[index].values);
      handleHistory(history[index].tableRows, history[index].values, query, index)
    }
    else {
      Papa.parse(data, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          const rowsArray = [];
          const valuesArray = [];
          results.data.map((d) => {
            rowsArray.push(Object.keys(d));
            valuesArray.push(Object.values(d));
          });
          handleTableRows(rowsArray[0]);
          handleValues(valuesArray);
          handleHistory(rowsArray[0], valuesArray, query, index);
        }
      })
    }
  }, [history, handleHistory, handleTableRows, handleValues]);
  return (
    <div className="Home">
      <div className="left">
        <History className="history" history={history} onHistorySelection={onHistorySelection} />
      </div>
      <div className="right">
        <CustomQuery handleSubmit={handleSubmit} />
        <DropdownQuery predefinedQueries={predefinedQueries} handleSelect={handleSelect} />
        <Menu tableRows={tableRows} values={values} handleSort={handleSort} handleFilterSubmit={handleFilterSubmit} />
        <Table tableRows={tableRows} values={values} />
        <Link to="/Analytics" state={{"tableRows": tableRows, "values": values}}><div className="AnalyticsLink">Click Here to Perform Data Analysis</div></Link>
      </div>
    </div>
  );
}
export default HomePage;