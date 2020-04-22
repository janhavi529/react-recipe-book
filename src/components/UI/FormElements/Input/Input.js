import React from 'react';
import './Input.css';

const input = (props) => {
    let inputElement = null;

    switch (props.elementType) {
        case ('input'):
            inputElement = <input className="form-control"
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ('select'):
            inputElement = <select className="form-control"
                value={props.value}
                onChange={props.changed}>
                {
                    props.elementConfig.options.map((option, index) => (
                        <option key={index} value={option.value}>{option.displayValue}</option>
                    ))
                }
            </select>;
            break;
        case ('textarea'):
            inputElement = <textarea className="form-control"
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        default: inputElement = <input className="form-control" />;
    }

    return (
        <div className="form-group col-sm-12 col-md-6 col-lg-6 col-xl-6">
            <label className="Label">{props.label}{props.elementConfig.required ? <span style={{ color: 'red' }}>&nbsp;*</span> : null}</label>
            {inputElement}
        </div>
    )
}

export default input;