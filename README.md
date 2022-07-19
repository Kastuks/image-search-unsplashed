A react image-search app created using unsplash API.<br />
Most functions in app have comments about them.<br />
This web app uses local storage to save inputted queries. Suggestions of up to 5 most recent queries is always shown. <br />
An input field and a search button is present. Once something is typed and search is pressed the unsplash API returns up to 20 images which are related to the keywords written in the input field. <br />
App.js - gets localStorage data and sends it to SearchBar. Also calls the SearchBar to display it in the web. <br />
SearchBar.js - has most functionality, such as filtering queries, saving queries, input field, button, working with unsplashed API... <br />
Styles.css - styling for web app.
