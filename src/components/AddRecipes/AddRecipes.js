import React, { Component } from 'react';
import './AddRecipes.css';
import axios from 'axios';
// import { Redirect } from 'react-router-dom';
import Input from '../UI/FormElements/Input/Input';
import Button from '../UI/FormElements/Button/Button';

class AddRecipe extends Component {
    state = {
        // recipesUpdated: false,
        addRecipeForm: {
            cuisine: {
                elementType: 'select',
                elementConfig: {
                    id: 'recipeCuisine',
                    name: 'cuisine',
                    required: true,
                    options: [
                        {
                            value: 'Chinese',
                            displayValue: 'Chinese'
                        },
                        {
                            value: 'Indian',
                            displayValue: 'Indian'
                        },
                        {
                            value: 'Italian',
                            displayValue: 'Italian'
                        },
                        {
                            value: 'Mexican',
                            displayValue: 'Mexican'
                        },
                        {
                            value: 'Beverages',
                            displayValue: 'Beverages'
                        },
                        {
                            value: 'Desserts',
                            displayValue: 'Desserts'
                        }
                    ]
                },
                value: 'Chinese',
                label: 'Cuisine'
            },
            title: {
                elementType: 'input',
                elementConfig: {
                    id: 'recipeName',
                    type: 'text', // Use HTML attribute names here as they will be added to the element.
                    name: 'name',
                    placeholder: 'Recipe Name',
                    required: true
                },
                value: '',
                label: 'Recipe Name',
                // validation: { // e.g. Custom validation
                //     required: true,
                //     minLength: 10
                // }, 
                // valid: false
            },
            image: {
                elementType: 'input',
                elementConfig: {
                    id: 'recipeImage',
                    type: 'file',
                    name: 'image',
                    placeholder: 'Image File',
                    required: true
                },
                value: '',
                label: 'Image File',
                base64Data: ''
            },
            ingredients: {
                elementType: 'textarea',
                elementConfig: {
                    id: 'recipeIngredients',
                    name: 'ingredients',
                    placeholder: 'Ingredients (Please seperate ingredients with commas)',
                    rows: '5',
                    cols: '10',
                    required: false
                },
                value: '',
                label: 'Ingredients'
            },
            link: {
                elementType: 'input',
                elementConfig: {
                    id: 'recipeURL',
                    type: 'text',
                    name: 'link',
                    placeholder: 'URL for Preparation Steps',
                    required: true
                },
                value: '',
                label: 'Preparation Steps URL'
            }
        }
    }
    addFormElement = {};
    initialForm = {};

    constructor(props) {
        super(props);
        this.initialForm = this.state.addRecipeForm;
        // this.addFormElement = React.createRef(); // 16.3
    }

    render() {
        // let redirect = null;
        // if (this.state.recipesUpdated) {
        //     redirect = <Redirect to="/" />; // Redirect to home page after recipe is added.
        // }

        // Dynamically create inputs based on JS config
        let formElementsArr = [];
        for (let key in this.state.addRecipeForm) {
            formElementsArr.push({
                id: key,
                config: this.state.addRecipeForm[key]
            });
        }
        return (
            <div>
                <h4>Add your own Recipe</h4>
                {/* Using references - 'ref' to get object of JSX element */}
                {/* <form onSubmit={this.addRecipeHandler.bind(this)} ref={this.addFormElement}> */}
                <form onSubmit={this.addRecipeHandler.bind(this)} ref={(formEl) => this.addFormElement = formEl}>
                    {/* {redirect} */}
                    {/* Dynamically create inputs based on JS config */}
                    {formElementsArr.map(formElement => (
                        <Input key={formElement.id} elementType={formElement.config.elementType} elementConfig={formElement.config.elementConfig} value={formElement.config.value} label={formElement.config.label}
                            changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                    ))}
                    <Button classes="btn btn-success" buttonText="Add" />
                </form>
            </div>
        );
    }

    inputChangedHandler = (event, inputIdentifier) => {
        // Alter the state object immutably - without altering the original object
        const updatedRecipeForm = { ...this.state.addRecipeForm }; // shallow cloning
        const updatedFormElement = { ...updatedRecipeForm[inputIdentifier] }; // deep cloning to copy nested object
        // if (updatedFormElement.validation) { // Custom validation
        //     updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        // }

        if (inputIdentifier === "image") {
            updatedFormElement.value = event.target.value;
            this.encodeImageFileAsBase64().then(reader => {
                updatedFormElement.base64Data = reader.result;
            });
        } else {
            updatedFormElement.value = event.target.value;
        }

        updatedRecipeForm[inputIdentifier] = updatedFormElement;
        this.setState({
            addRecipeForm: updatedRecipeForm
        });
    }

    checkValidity(value, rules) {
        let isValid = false;
        if (rules.required) {
            isValid = value.trim() !== '';
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength;
        }
        return isValid;
    }

    addRecipeHandler = (event) => {
        event.preventDefault(); // To prevent request from being sent to the server, which would cause page reload.

        const newRecipe = {};
        for (let formElementIdentifier in this.state.addRecipeForm) {
            if (formElementIdentifier === "ingredients") {
                let ingredients = (this.state.addRecipeForm[formElementIdentifier].value.split(',')) ? this.state.addRecipeForm[formElementIdentifier].value.split(',') : [];
                let modIngredients = [];
                ingredients.map(ingredient => {
                    if (ingredient.trim())
                        modIngredients.push(ingredient.trim());
                    return modIngredients;
                });
                newRecipe[formElementIdentifier] = modIngredients;
            } else if (formElementIdentifier === "image") {
                newRecipe[formElementIdentifier] = this.state.addRecipeForm[formElementIdentifier].base64Data;
            } else {
                newRecipe[formElementIdentifier] = this.state.addRecipeForm[formElementIdentifier].value;
            }
        }

        // axios stringifies the 'newRecipe' object
        axios.post('/recipes.json', newRecipe).then(response => {
            this.setState({ recipesUpdated: true });
            // this.props.history.push('/'); // OR - Navigating programmatically.
        });

        // Clear form
        // this.addFormElement.reset();
        // this.addFormElement.current.reset(); // 16.3
        this.setState({
            addRecipeForm: this.initialForm
        })
    }

    encodeImageFileAsBase64() {
        return new Promise(resolve => {
            let filesSelected = document.getElementById("recipeImage").files;
            if (filesSelected.length > 0) {
                let fileToLoad = filesSelected[0],
                    fileReader = new FileReader();
                // Convert data to base64 
                fileReader.readAsDataURL(fileToLoad);
                // Read file content on file loaded event
                fileReader.onload = (event) => {
                    resolve(fileReader);
                };
            }
        });
    }
}

export default AddRecipe;