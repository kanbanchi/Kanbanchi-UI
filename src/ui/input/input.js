import React, {useState, useEffect, useRef} from 'react';
import {PropTypes, ClassNames} from '../utils';
import {default as autosizeLibray} from './autosize';
import {Label} from '../../ui';
import '../../../src/ui/input/input.module.scss';

export const Input = (props) => {
    let {
        autosize,
        className,
        disabled,
        label,
        value,
        onChange,
        onEnter,
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
        (!autosize) ? 'kui-input--noresize' : null,
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

    attributes.onKeyDown = e => {
        if (e && (e.which === 10 || e.which === 13)) {
            if (!autosize) e.preventDefault();
            if (onEnter) onEnter(e);
        }
    };

    if (label) {
        labelItem = (<div className="kui-label__item">{label}</div>);
    }

    useEffect(() => {
        if (autosize) autosizeLibray(textarea.current);
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
    autosize: PropTypes.bool,
    disabled: PropTypes.bool,
    label: PropTypes.string
};

Input.defaultProps = {
    autosize: true,
    disabled: false,
    label: null
};

export default Input;