import React, {Component} from 'react';

const withClass = (WrappedComponent, className) => {
    return class extends Component {
        render () {
            return (
                <div className={className}>
                    <WrappedComponent {...this.props}/> 
                    {/* Do not manipulate the WrappedComponent;
                    You can pass unknown props to the component using {...this.props} */}
                </div>
            );
        }
    }
        
}

export default withClass;