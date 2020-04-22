import React from 'react';

const button = (props) => {
    return (
        <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <button type="submit" className={props.classes}>{props.buttonText}</button>
        </div>
    )
}

export default button;