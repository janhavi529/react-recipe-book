import React from 'react';
import recipes from '../../assets/images/recipes.jpg';
import './HomePage.css';
// import Aux from '../../hoc/Aux';

// Stateless/function component - recommended
const homePage = () => {

    return (
        // Use higher order component for only wrapping purpose.
        // <Aux>
        <div>
            <img src={recipes} className="app-recipes" alt="recipes" />
        </div>
        // </Aux>
    );
}

export default homePage;