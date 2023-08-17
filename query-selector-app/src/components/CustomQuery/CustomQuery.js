import React from 'react'
import './style.scss'

function CustomQuery({handleSubmit}) {
    return (
        <div className="customQueryWrapper">
            <form className="customQuerySelector" onSubmit={(event) => handleSubmit(event)} >
                <textarea name="text" placeholder="Enter a custom query" ></textarea>
                <input className="submitBtn" type="submit" />
            </form>
        </div>
    )
}

export default React.memo(CustomQuery)