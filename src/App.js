import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from "react";

import SearchBar from './components/SearchBar';
import Images from './components/Images';
import List from './components/List';
import Autocomplete from "./components/Autocomplete";

// https://api.unsplash.com/search/photos?page=1&query=office
// import * as JsSearch from 'js-search';

function App() {

  // const { search } = window.location;
  // const query = new URLSearchParams(search).get('s');
  // const [searchQuery, setSearchQuery] = useState(query || '');
  // const filteredPosts = filterPosts(posts, searchQuery);

  // const [img, setImg] = useState("");
  // const [res, setRes] = useState([]);
  // useEffect(() => {
  //   fetchRequest();
  // }, []);  
  // const Submit = () => {
  //   fetchRequest();
  //   setImg("");
  // };
  // const fetchRequest = async () => {
  //   const data = await fetch(
  //     `https://api.unsplash.com/search/photos?page=1&query=${img}&client_id=${Access_Key}&per_page=20`
  //   );
  //   const dataJ = await data.json();
  //   const result = dataJ.results;
  //   console.log(result);
  //   setRes(result);
  // };
  var queries = [];
  for (var i = 0; i < localStorage.length; i++){
    
      queries.push(localStorage.key(i))
  }
  // console.log(queries);
  // console.log(["Oranges", "Apples", "Banana", "Kiwi", "Mango"]);

  const Access_Key = process.env.REACT_APP_API_KEY;
  // console.log("printinam " + Access_Key);

  return (
    <>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 d-flex justify-content-center align-items-center input">
              {/* <SearchBar

              />  */}
              <div>

                <Autocomplete suggestions={queries}/>
              </div>
              {/* <List></List> */}
              {/* <Images />   */}


          </div>
        </div>
      </div>
    </>


  );
}





export default App;
