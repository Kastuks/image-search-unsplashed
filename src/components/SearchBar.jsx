import React, { Component, Fragment} from "react";
import './Styles.css'

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      res: [],
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: "",
    };
  }
  // Checks current input field and filters out non-matching results
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
  // Used for selecting word from drop down selection
  onClick = e => {
    const { suggestions } = this.props;
    const filteredSuggestions = suggestions

    while (filteredSuggestions.length > 5)
      filteredSuggestions.shift();

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    });
  };
  // onClick event for clicking input field. Will drop down suggestions
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
  // if enter is pressed suggestions are hiddent and selection is emmited to input field
  // up and down arrows move your selection
  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion]
      });
      this.Submit();
    } 
    else if (e.keyCode === 38) {
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
        userInput,
        
      }
    } = this;

    let suggestionsListComponent;

    const grid = {
      width: 300,
      height: 230,
    }  
    // unsplashed api logic.
    const fetchRequest = async () => {
      const data = await fetch(
        // `https://api.unsplash.com/search/photos?page=1&query=${img}&client_id=${process.env.REACT_APP_API_KEY}&per_page=20`
        `https://api.unsplash.com/search/photos?page=1&query=${userInput}&client_id=${process.env.REACT_APP_API_KEY}&per_page=20`
      );
      const dataJ = await data.json();
      const result = dataJ.results;
      var check = false;
      if (userInput !== ""){
        for (var i = 0; localStorage.length > i; i++){
          if (localStorage.getItem(i) === userInput){
            check = true;
          }
        }
        if (!check){
          localStorage.setItem(localStorage.length, userInput);
          this.props.onChange();
        }
      }
      this.setState({ res: result});
    };

    // Pressing the submit button will add new data to localStorage 
    // and rerender the App.
    const Submit = () => {
      fetchRequest();
    };    

    if (showSuggestions) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul className="suggestions">
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
          <div className="no-suggestions">
            <em>No suggestions available.</em>
          </div>
        );
      }
    }
    return (
      <>
        <div className="flexContainer">
          <label htmlFor="search"><h2>Search for images: </h2> </label>
          <Fragment>
            <input
                type="text"
                placeholder="Type your word here"
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
      </>
    )
  }
}

export default SearchBar;

