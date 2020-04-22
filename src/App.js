import React, { Component, Suspense } from 'react'; // Here React is the default export and Component is another named export
// import classes from './App.css'; // The CSS loader transforms the CSS class names into unique class names in the format '[name]__[local]__[hash:base64:5]' i.e. ClassName_FileName_HashCode and stores them into the 'classes' object that is imported. 
import TopNav from './components/Navigation/Navigation';
import HomePage from './components/HomePage/HomePage';
// import RecipeList from './components/RecipeList/RecipeList'; // Will lazily load RecipeList, Recipe, AddRecipes.
// import Recipe from './components/RecipeList/Recipe/Recipe';
// import AddRecipes from './components/AddRecipes/AddRecipes';

import asyncComponent from './hoc/asyncComponent'; // Lazy loading

// import Radium, { StyleRoot } from 'radium';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch, Redirect } from 'react-router-dom';

const AsyncRecipeList = asyncComponent(() => {
  // import() -> Dynamic import- Whatever is passed to this function will only be imported when the function passed to asyncComponent() is executed i.e. when AsyncRecipeList is used somewhere.
  return import('./components/RecipeList/RecipeList');
});

// Lazy loading with React Suspense (16.6)
const AsyncRecipe = React.lazy(() => {
  return import('./components/RecipeList/Recipe/Recipe'); // Should always use default export, named exports are not supported.
});
const AsyncAddRecipes = asyncComponent(() => {
  return import('./components/AddRecipes/AddRecipes');
});

// Stateful/Class component
class App extends Component {
  state = {
    auth: true // You need to implement some authentication logic to set this.state.auth
  };

  render() {
    return (
      //  <StyleRoot>
      <BrowserRouter>
        <React.Fragment> 
          {/* Fragments are placeholders to wrap elements; alternative syntax: <> </> */}
          {/* <div className={classes.recipeApp}> */}
          <div className="recipeApp">
            <TopNav/>
            <Switch>
              <Route path="/" exact component={HomePage} />
              {/* <Route path="/recipes/:cuisine" exact render={() => <RecipeList selectedCuisine={this.state.cuisineName} recipes={this.state.recipes}>Check out these delicious meals!</RecipeList>} /> */}
              <Route path="/recipes/:cuisine/:title" exact render={() => { return (
                <Suspense fallback={<div>Loading...</div>}>
                  <AsyncRecipe />
                </Suspense>
              )}} />
              <Route path="/recipes/:cuisine" component={AsyncRecipeList} />
              {/* As we removed 'exact' it will now render any route that starts with "/recipes/:cuisine", so this includes the recipes within the specific cuisine e.g. /recipes/Chinese/1 */}
              {this.state.auth ? <Route path="/addrecipe" exact component={AsyncAddRecipes} /> : <div className="alert alert-danger">You are not authorized to add a new recipe.</div>}
              <Redirect from="/:anything" to="/" />
              {/* Handling wildcard routes with redirects to home page. */}
            </Switch>
          </div>
        </React.Fragment>
      </BrowserRouter>
      // </StyleRoot>
    );
  }
}

// export default Radium(App); // This injects some special functionalities (from Radium) in the App component.
export default App;