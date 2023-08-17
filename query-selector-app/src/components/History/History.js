import React,{useEffect,useState,useRef} from 'react'
import './style.scss'

export default function History({history,onHistorySelection}) {
  

  const [show,setShow] = useState(true) 
  const ref = useRef()
  useEffect(() => {
    const initialShowHistory= () =>
    {
        if(show)
            ref.current.style.display = 'none'
        else
            ref.current.style.display = 'flex'
    }
    initialShowHistory()
  },[])

  const handleClick = (query,index) => {
    onHistorySelection(query,index)
  }

 ;

  const handleHistoryClick = (event) => {
     if(!show)
        ref.current.style.display = 'none'
    else
        ref.current.style.display = 'flex'
    setShow(!show);
  }

  return (
    <>
        <div className="historyHeader"><button onClick={(event)=>{handleHistoryClick(event)}}>{show ? "SHOW ": "HIDE "} HISTORY</button></div>
        <div ref={ref}   id="historyWrapper" className="historyWrapper">
            {
                history.map((object,index) => {
                    return (
                        <div onClick={() => handleClick(object.query, index)} className="historyData">
                            <div className="queryLabel">Query {index + 1} :</div>
                            <div className="query">{object.query}</div>
                        </div>
                    )      
                })
            }
           
        </div>
    </>
  )
}
