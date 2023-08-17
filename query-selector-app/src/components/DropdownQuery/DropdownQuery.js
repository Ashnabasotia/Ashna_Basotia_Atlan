import React from 'react'
import './style.scss'

function DropdownQuery({predefinedQueries,handleSelect}) {
  
    return (
    <div className="dropdown">
          <div className="Or">OR</div>
          <select className="selectQuery"  defaultChecked={null} onChange={(event) => handleSelect(event)}  id="query" name="query" >
            <option value="">Please Choose a Query</option>
            {Object.keys(predefinedQueries).map((query) => {
              return (
                <option value={query}>{query}</option>
                )
              })}
          </select>    
    </div>
  )
}

export default React.memo(DropdownQuery)