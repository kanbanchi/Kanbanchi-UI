import React, {useState} from 'react';
import {PropTypes, ClassNames} from '../utils';
import {Icon, Label} from '../../ui';
import '../../../src/ui/checkbox/checkbox.module.scss';

export const Checkbox = (props) => {
    let {
        children,
        className,
        checked,
        onChange,
        ...attributes
    } = props;

    const [isChecked, setIsChecked] = useState(checked);

    className = ClassNames(
        'kui-checkbox',
        (attributes.disabled) ? 'kui-checkbox--disabled' : null,
        className
    );

    attributes.type = 'checkbox';
    attributes.className = 'kui-checkbox__input';
    attributes.onChange = e => {
        setIsChecked(!isChecked);
        if (onChange) onChange(e);
    };

    return (
        <Label className={className}>
            <input checked={isChecked} {...attributes}/>
            <span className="kui-checkbox__label">
                {children}
                <Icon className="kui-checkbox__checkmark" xlink="checkbox-ok"/>
            </span>
        </Label>
    );
};

Checkbox.propTypes = {
    checked: PropTypes.bool
};

Checkbox.defaultProps = {
    checked: false
};

export default Checkbox;