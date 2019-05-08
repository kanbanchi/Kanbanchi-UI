import React, {useState, useEffect, useRef} from 'react';
import {PropTypes, ClassNames} from '../utils';
import autosize from './autosize';
import {Label} from '../../ui';
import '../../../src/ui/input/input.module.scss';

export const Input = (props) => {
    let {
        className,
        disabled,
        label,
        value,
        onChange,
        onEnter,
        onKeyUp,
        ...attributes
    } = props;
    let labelItem = null;

    const [isFilled, setIsFilled] = useState(!!value);
    const [inputValue, setInputValue] = useState(value);
    const textarea = useRef(null);
    
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
        setInputValue(e.target.value);
        if (onChange) {
            onChange(e);
        }
    };
    attributes.onKeyUp = e => {
        if (onEnter && e && e.which == 13) {
            onEnter(e);
        }
        if (onKeyUp) {
            onKeyUp(e);
        }
    };

    if (label) {
        labelItem = (<div className="kui-label__item">{label}</div>);
    }

    useEffect(() => {
        autosize(textarea.current);
    }, []);


    return (
        <Label className={className}>
            {labelItem}
            <textarea 
                rows={1}
                ref={textarea}
                {...attributes}
            >
                {inputValue}
            </textarea>
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