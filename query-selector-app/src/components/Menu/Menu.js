import React from 'react'
import './style.scss'

function Menu({ tableRows, values, handleSort, handleFilterSubmit }) {
  return (
    <div className="Menu">
      <div className="sort">
        Sort By:
        <select onChange={(event) => { handleSort(event) }}>
          <option value="null">Please Select a value</option>
          {
            tableRows.map((column, index) => {
              return (<option value={index}>{column}</option>)
            })
          }
        </select>
      </div>
      <form onSubmit={(event) => handleFilterSubmit(event)} className="filter">
        Filter:
        <select>
          <option>Please select a value</option>
          {
            tableRows.map((column, index) => {
              return (<option value={index}>{column}</option>)
            })
          }
        </select>
        <input type="text"></input>
        <button>Search</button>
      </form>
    </div>
  )
}

export default React.memo(Menu)