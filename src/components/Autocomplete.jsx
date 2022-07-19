import React, { Component, Fragment, useState } from "react";
import './Styles.css'

class Autocomplete extends Component {
  constructor(props) {
    super(props);

    this.state = {
      res: [],
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: ""
    };
  }
  
  onChange = e => {
    const { suggestions } = this.props;
    const userInput = e.currentTarget.value;

    const filteredSuggestions = suggestions.filter(
       suggestion =>
         suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
     );

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value
    });
  };

  onClick = e => {
    const { suggestions } = this.props;

    const filteredSuggestions = suggestions

    while (filteredSuggestions.length > 5)
      filteredSuggestions.shift();

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.innerText
    });
  };

  onClickInput = e => {
    const { suggestions } = this.props;

    const filteredSuggestions = suggestions

    while (filteredSuggestions.length > 5)
      filteredSuggestions.shift();

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      // userInput: e.currentTarget.innerText
    });
  };

  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion]
      });
    } else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }
      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow, increment the index
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }
      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };


  
  render() {
    const {
      onChange,
      onClick,
      onClickInput,
      onKeyDown,
      state: {
        res,
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this;

  let suggestionsListComponent;

  // const [img, setImg] = useState("");
  // const [res, setRes] = useState([]);
  var queries = [];
  // var res = [];
  const grid = {
    width: 300,
    height: 230,
  }  
  const fetchRequest = async () => {
    const data = await fetch(
        // `https://api.unsplash.com/search/photos?page=1&query=${img}&client_id=${process.env.REACT_APP_API_KEY}&per_page=20`
        `https://api.unsplash.com/search/photos?page=1&query=${userInput}&client_id=${process.env.REACT_APP_API_KEY}&per_page=20`
    );
    const dataJ = await data.json();
    const result = dataJ.results;
    // console.log(Autocomplete.value);
    //   window.sessionStorage.setItem("searchDetails",JSON.stringify({searchQuery:img,searchDetails:result}))
    if (userInput != "")
        localStorage.setItem(userInput, result);
    // console.log(img);
    // console.log(result);
    this.setState({ res: result});
    console.log(res);
    console.log(userInput)
    // Hey.setRes(result);
  };

  const Submit = () => {
    fetchRequest();
    // Hey.setImg("");
    
  };    

  if (showSuggestions) {
    if (filteredSuggestions.length) {
      suggestionsListComponent = (
        <ul class="suggestions">
          {filteredSuggestions.map((suggestion, index) => {
            let className;

            // Flag the active suggestion with a class
            if (index === activeSuggestion) {
              className = "suggestion-active";
            }
            return (
              <li className={className} key={suggestion} onClick={onClick}>
                {suggestion}
              </li>
            );
          })}
        </ul>
      );
    } else {
      suggestionsListComponent = (
        <div class="no-suggestions">
          <em>No suggestions available.</em>
        </div>
      );
    }
  }
  return (
    <>
    {/* <Fragment> */}
      <div className="flexContainer">
        <label htmlFor="search"><h2>Search for images: </h2> </label>
        <Fragment>
          <input
              type="text"
              placeholder="placeholder"
              onClick={onClickInput}
              onChange={onChange}
              onKeyDown={onKeyDown}
              value={userInput}
          />
          {suggestionsListComponent}
        </Fragment>
        <br></br>
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
              
        {/* </Fragment> */}
    </>
  )
}
}



export default Autocomplete;

