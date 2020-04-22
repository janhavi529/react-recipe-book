import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

class TopNav extends Component {
    state = {
        isDropdownOpen: false,
        isMobileNavbarOpen: false,
        tabName: 'Home'
      };
    
    render() {
        // OR const dropdownMenuClass = `dropdown-menu${this.state.isDropdownOpen ? " show" : ""}`;
        const dropdownMenuClasses = ['dropdown-menu'];
        if (this.state.isDropdownOpen) {
            dropdownMenuClasses.push('show');
        }

        const navbarClasses = ['collapse', 'navbar-collapse'];
        if (this.state.isMobileNavbarOpen) {
            navbarClasses.push('show');
        }

        return (
            <nav className="navbar navbar-expand-md navbar-expand-lg navbar-light bg-light navbar-fixed-top">

                <NavLink className="navbar-brand" to="/" exact activeClassName="my-active" activeStyle={{ color: '#228b22'}} onClick={this.tabChangeHandler.bind(this, 'Home')}>Home</NavLink>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" onClick={this.toggleOpenMobileNavbar}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={navbarClasses.join(' ')} id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item dropdown" onClick={this.toggleOpenDropdown}>
                            <NavLink className="nav-link dropdown-toggle" to="#" exact activeClassName="my-active" activeStyle={{ color: '#228b22' }} id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                                Cuisines</NavLink>
                            <div className={dropdownMenuClasses.join(' ')} aria-labelledby="navbarDropdown">
                                {/* <NavLink className="dropdown-item" to={'/recipes/' + this.state.cuisineName} onClick={this.cuisineChangeHandler.bind(this, 'Chinese')}>Chinese</NavLink> */}
                                <Link className="dropdown-item" to={'/recipes/Chinese'} onClick={this.props.onCuisineChange.bind(this, 'Chinese')} >Chinese</Link>
                                <Link className="dropdown-item" to={'/recipes/Indian'} onClick={this.props.onCuisineChange.bind(this, 'Indian')}>Indian</Link>
                                <Link className="dropdown-item" to={'/recipes/Italian'} onClick={this.props.onCuisineChange.bind(this, 'Italian')}>Italian</Link>
                                <Link className="dropdown-item" to={'/recipes/Mexican'} onClick={this.props.onCuisineChange.bind(this, 'Mexican')}>Mexican</Link>
                                <div className="dropdown-divider"></div>
                                <Link className="dropdown-item" to={'/recipes/Beverages'} onClick={this.props.onCuisineChange.bind(this, 'Beverages')}>Beverages</Link>
                                <Link className="dropdown-item" to={'/recipes/Desserts'} onClick={this.props.onCuisineChange.bind(this, 'Desserts')}>Desserts</Link>
                            </div>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to={{
                                pathname: "/addrecipe"
                            }} onClick={this.tabChangeHandler.bind(this, 'Add')} exact activeClassName="my-active" activeStyle={{ color: '#228b22' }} >Add Your Recipe</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
    
  // Event handler
  toggleOpenDropdown = (event) => {
    this.setState({ isDropdownOpen: !this.state.isDropdownOpen }); // Changing state of the component using setState() - merges the state.
  }
  toggleOpenMobileNavbar = (event) => {
    this.setState({ isMobileNavbarOpen: !this.state.isMobileNavbarOpen });
  }
  tabChangeHandler = (tab) => {
    this.setState({
      tabName: tab
    });
  }
}

const mapStateToProps = globalState => { // Here, state is the global state maintained by redux, which is returned by this function
    return {
        recipeCuisine: globalState.cuisine // recipeCuisine is a property that can then be used in the component file.
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCuisineChange: (selectedCuisine) => dispatch({type: 'CHANGE', value: selectedCuisine }) // whenever we call onCuisineChange from the component, it will dispatch the 'CHANGE' action, which the reducer will handle and update the state.
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TopNav); // connect() is a function that returns a HOC