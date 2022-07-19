import { React, useState} from 'react'
// import data from "./ListData.json"
import './Styles.css'

function List() {
    var queries = [];
    for (var i = 0; i <localStorage.length; i++){
        queries.push(<li>{localStorage.key(i)}</li>)
    }
    return (
        <div className="dataResult">
            <ul>
                {queries}
            </ul>
        </div>
    )
}

export default List