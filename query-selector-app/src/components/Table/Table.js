import React, {useState, useEffect} from 'react'

import './style.scss'
import EmptyTable from '../EmptyTable/EmptyTable';

 function Table({tableRows, values}) {
    const LIMIT = 5
    const NUMBER_OF_PAGES = Math.ceil(values.length/LIMIT)

    const [page, setPage] = useState(1);

    useEffect(() => {
        const handlePageState = () => {
            setPage(1);
        }
        handlePageState()
    },[tableRows,values])
   
    const renderPage = () => {
        let start = (page-1)*LIMIT;
        let end = start + LIMIT;
        const pageData = values.slice(start,end);
        return (
            pageData.map((data)=>{
                return  (
                    <tr>
                        {
                            data.map((element) => {
                                return (<td>{element}</td>)
                            })
                        }
                    </tr>
                )
            })
        )    
    }

    const handlePrevChange = () => {
        if(page > 1)
            setPage(page-1)
        else
            setPage(NUMBER_OF_PAGES)
    }

    const handleNextChange = () => {
        if(page < NUMBER_OF_PAGES)
            setPage(page+1)
        else
           setPage(1)
    }

  return (
    <div className="tableWrapper">
        <table>
            <thead>
                {tableRows.map((column) => {
                    return(<th>{column}</th>)
                })}
            </thead>
            {(tableRows.length && values.length ) ? renderPage() : <EmptyTable/>}
        </table>
       <div className="PageToggler">
        <span onClick={()=>handlePrevChange()}><button>PREV</button></span>
        <span className="PageNumber">{page}</span>
        <span onClick={()=>handleNextChange()}><button>NEXT</button></span>
       </div>

    </div>
  )
}

export default React.memo(Table);
