import React, {useState} from 'react';
import {PropTypes, ClassNames} from '../utils';
import {Label} from '../../ui';
import '../../../src/ui/input/input.module.scss';

export const Input = (props) => {
    let {className, label, disabled, onChange, value, ...attributes} = props;
    let labelItem = null;

    const [isFilled, setIsFilled] = useState(!!value);
    const [inputValue, setName] = useState(value);

    className = ClassNames(
        'kui-input',
        (disabled) ? 'kui-input--disabled' : null,
        (isFilled) ? 'kui-input--filled' : null,
        className
    );

    attributes.type = 'text';
    attributes.className = 'kui-input__item';
    if (disabled) {
        attributes.disabled = true;
    }
    attributes.onChange = e => {
        setIsFilled(!!e.target.value);
        setName(e.target.value);
        if (onChange) {
            onChange(e.target.value);
        }
    };

    if (label) {
        labelItem = (<div className="kui-label__item">{label}</div>);
    }

    return (
        <Label className={className}>
            {labelItem}
            <input value={inputValue} {...attributes} />
        </Label>
    );
};

Input.propTypes = {
    label: PropTypes.string,
    disabled: PropTypes.bool
};

Input.defaultProps = {
    label: null,
    disabled: false
};

export default Input;