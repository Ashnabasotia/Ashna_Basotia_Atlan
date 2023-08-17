import React from 'react'

function EmptyTable() {
  return (
    <div className="emptyTable">
        <h2>No Query Requested</h2>
    </div>
  )
}

export default React.memo(EmptyTable)