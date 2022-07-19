// import logo from './logo.svg';
import './App.css';
import React, {useEffect} from "react";

import SearchBar from "./components/SearchBar";

function App() {
  //Used to send localStorage data to SearchBar
  var queries = [];

  // Rerenders application
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  // Assigns localStorage elements to queries array and rerenders application.
  // Used to assign most recent search queries.
  const changed = () => {
    queries = [];
    for (var i = 0; i < localStorage.length; i++){
      queries.push(localStorage.getItem(i))
  }
  forceUpdate();
};
  useEffect (() => {
      // queries = [];
    for (var i = 0; i < localStorage.length; i++){
      queries.push(localStorage.getItem(i))
  }
  }  );

  return (
    <>
      <div>
        <SearchBar 
        suggestions={queries}
        onChange = {changed}
        />
      </div>
    </>
  );
}

export default App;
