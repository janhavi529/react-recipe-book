import React, { Component} from 'react';

class ErrorBoundary extends Component {
    state = {
        hasError: false,
        errorMessage: ''
    }

    // This is executed whenever an error is thrown in the component wrapped with ErrorBoundary
    componentDidCatch = (error, info) => {
        this.setState({
            hasError: true,
            errorMessage: error
        })
      //  console.log(info.componentStack);
    }

    render() {
        if (this.state.hasError) {
            return <h6>{this.state.errorMessage}</h6>
        } else {
            return this.props.children; // Else render the components wrapped within ErrorBoundary
        }
    }
}

export default ErrorBoundary;