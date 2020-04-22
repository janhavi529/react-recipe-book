import React, { Component } from 'react';
import cooking from '../../../assets/images/get_cooking.png';
import StarRatingComponent from 'react-star-rating-component';
import happy from '../../../assets/images/happy_smiley.png';
import sad from '../../../assets/images/sad_smiley.png';
// import classes from './Recipe.css';
import './Recipe.css';
// import withClass from '../../../hoc/withClass';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import ErrorBoundary from '../../../ErrorBoundary/ErrorBoundary'


class Recipe extends Component {
    state = {
        rating: 0,
        error: false
    };

    render() {
        if (this.props.location.state) {
            let imageSrc = '';
            if (this.props.location.state.recipe.image) {
               // imageSrc = '/assets/images/' + this.props.location.state.recipe.image;
               imageSrc = this.props.location.state.recipe.image;
            }

            let ingredients = [];
            if (this.props.location.state.recipe.ingredients) {
                this.props.location.state.recipe.ingredients.map((ingredient, index) => {
                    return ingredients.push(<li key={index}>{ingredient}</li>);
                });
            }

            return (
                <ErrorBoundary>
                    <div className="recipe">
                        <h4>{this.props.location.state.recipe.title}</h4>
                        <img src={imageSrc} alt={this.props.location.state.recipe.title} className="img-fluid recipeImg" />
                        {ingredients.length > 0 ?
                            <div>
                                <h5>Essential Ingredients</h5>
                                <ul>
                                    {ingredients}
                                </ul>
                            </div> : null
                        }

                        <h5>Preparation Steps</h5>
                        <a href={this.props.location.state.recipe.link} target="_blank" rel="noopener noreferrer"><img src={cooking} className="prep" alt="Preparation Steps" width="200px" height="100px" /></a>

                        <h5>Rate the Recipe:</h5>
                        <StarRatingComponent
                            name="rate1"
                            starCount={5}
                            value={this.state.rating}
                            onStarClick={this.onStarClick.bind(this)}
                        />
                        {
                            this.state.rating < 3 ?
                                <div><img src={sad} alt=":(" width="50px" height="30px" /></div>
                                : <div><img src={happy} alt=":)" width="50px" height="30px" /></div>
                            // <span style={{ position: 'absolute', marginLeft: '10px' }}><img src={happy} alt=":)" width="7%" height="7%" /></span>
                        }
                        <p> Your rating: {this.state.rating} </p>
                    </div>
                </ErrorBoundary>
            );
        } else {
            return null;
        }
    }

    onStarClick = (nextValue, prevValue, name) => {
        // let avgRating = (nextValue + this.state.rating) / 2;
        this.setState({ rating: nextValue });
    }
}

Recipe.propTypes = {
    title: PropTypes.string,
    image: PropTypes.string,
    ingredients: PropTypes.array,
    link: PropTypes.string
}

export default withRouter(Recipe); // withRouter HOC is used so that we can retrieve state that is passed from the parent RecipeList component, while navigating programmatically to Recipe.
// export default withClass(Recipe, classes.recipe); // component, class name