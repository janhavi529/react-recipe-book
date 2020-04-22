import React, { Component } from 'react';
import './RecipeList.css';
import axios from 'axios'; // Import axios global object.
import { connect } from 'react-redux';
import Spinner from '../UI/Spinner/Spinner';

// Stateful/Class component
class RecipeList extends Component {
    state = {
        recipes: [],
        error: false,
        loading: false
    }

    componentDidMount() {
        let updatedRecipes = [];
        this.setState({ loading: true });
        axios.get('/recipes.json').then(response => {
            if (response) {
                for (let key in response.data) {
                    updatedRecipes.push({
                        ...response.data[key],
                        id: key
                    }
                    );
                }
                this.setState({ recipes: updatedRecipes, loading: false });
            }
        }).catch(error => {
            this.setState({ error: true });
        });
    }

    render() {
        // console.log("[Redux] [RecipeList.js] Recipe Cuisine: " + this.props.recipeCuisine);
        let listOfRecipes = [];
        if (this.state.loading) {
            listOfRecipes = <Spinner />
        } else {
            this.state.recipes.map((recipe, index) => {
                if (recipe.cuisine === this.props.match.params.cuisine) {
                    // let imageSrc = '/assets/images/' + recipe.image;
                    let imageSrc = recipe.image;
    
                    listOfRecipes.push(
                        <div key={index}><h4>{recipe.title}</h4><img src={imageSrc} alt={recipe.title} className="img-fluid imageLink" onClick={this.recipeSelectHandler.bind(this, recipe)} /></div>
                    );
                }
                return listOfRecipes;
            });
        }
       
        return (
            <div>
                <h2>{this.props.match.params.cuisine}</h2>
               {listOfRecipes}
            </div>
        );
    }
    // Navigating programmatically
    recipeSelectHandler = (rec) => {
        this.props.history.push({
            pathname: this.props.match.url + '/' + rec.title,
            state: { recipe: rec }
        });
    }
}

const mapStateToProps = globalState => {
    return {
        recipeCuisine: globalState.cuisine
    }
}

export default connect(mapStateToProps, null)(RecipeList);
