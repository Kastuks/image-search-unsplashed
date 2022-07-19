import React, { Component, useState, useEffect } from 'react'
// import { View, Text, StyleSheet } from 'react-native';
// import Images from './Images';
import App from '../App';
import './Styles.css'
import Autocomplete from './Autocomplete';

// import { Provider, History, Trigger} from 'react-history-search';

const SearchBar = () => {
    
    // console.log(process.env.REACT_APP_API_KEY);
    const [img, setImg] = useState("");
    const [res, setRes] = useState([]);
    var queries = [];

    for (var i = 0; i < localStorage.length; i++){
        // queries.push(<li>{localStorage.key(i)}</li>)

        queries.push(localStorage.key(i))
    }

    const fetchRequest = async () => {
        const data = await fetch(
            // `https://api.unsplash.com/search/photos?page=1&query=${img}&client_id=${process.env.REACT_APP_API_KEY}&per_page=20`
            `https://api.unsplash.com/search/photos?page=1&query=${img}&client_id=${process.env.REACT_APP_API_KEY}&per_page=20`
        );
        const dataJ = await data.json();
        const result = dataJ.results;
        console.log(Autocomplete.value);
        //   window.sessionStorage.setItem("searchDetails",JSON.stringify({searchQuery:img,searchDetails:result}))
        if (img != "")
            localStorage.setItem(img, res);
        // console.log(img);
        // console.log(result);
        setRes(result);
    };
  
    const Submit = () => {
      fetchRequest();
      setImg("");
    };

    useEffect(() => {
        for (var i = 0; i < localStorage.length; i++)
        {
            console.log(localStorage.key(i));
            console.log(i);
        }
        // for (var i = 0; i < localStorage.length; i++){
        //     queries.push(<li>{localStorage.key(i)}</li>)
        // }
    }, []);  

    const grid = {
        width: 300,
        height: 230,
    }
        return (
            <>
                <div className="flexContainer">
                    <label htmlFor="search"><h2>Search for images: </h2> </label>
                    <input 
                        className="col-3 form-control-sm py-1 fs-4 text-capitalize border border-3 border-dark"
                        // className="inputStyle"
                        type="text"
                        placeholder="Search Images..."
                        value={img}
                        // onClick={Autocomplete.onClick }
                        // suggestions={queries}
                        onChange={(e) => setImg(e.target.value)}
                    />
                    {/* <Autocomplete 
                    suggestions={queries}
                    value={img}
                    placeholder="Search Images..."
                    /> */}
                    {/* <div className="dataResult">
                        <ul>
                            {queries}
                        </ul>
                    </div> */}
                    <button
                        type="submit"
                        onClick={Submit}
                        className="btn bg-dark text-white fs-3 mx-3"
                    >
                        Search
                    </button>
                </div>
                <div className="container">
                    { res.map((val) => {
                        return (
                            <>
                                <img
                                key={val.id}
                                src={val.urls.small}
                                alt="val.alt_description"
                                style={ grid }
                                />
                            </>
                        );
                    })}
                </div>
            </>
        )
}

export default SearchBar;