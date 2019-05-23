import React, {useState} from 'react';
import {PropTypes, ClassNames} from '../utils';
import {Label} from '../../ui';
import '../../../src/ui/radio/radio.module.scss';

export const Radio = (props) => {
    let {
        active,
        onChange,
        children,
        className,
        ...attributes
    } = props,
        buttonHocs;

    className = ClassNames(
        'kui-radio',
        className
    );

    const [checked, setChecked] = useState(active);

    if (children) {
        if (!children.length) children = [children]; // if 1 child
        buttonHocs = React.Children.map(children, (child, i) => {
            let buttonclassName = ClassNames(
                'kui-radio__item',
                (child.props.className) ? child.props.className : null,
                (i === checked) ? 'kui-radio__item--active' : null,
            );
            let buttonAttributes = {
                type: 'radio',
                className: 'kui-radio__input',
                onChange: () => {
                    setChecked(i);
                    if (onChange) onChange(i);
                    if (child.props.onClick) child.props.onClick();
                },
                checked: i === checked
            };
            if (child.props.disabled) {
                buttonclassName += ' kui-radio__item--disabled';
                buttonAttributes.disabled = true;
            }
            return (
                <Label className={buttonclassName}>
                    <input {...buttonAttributes} />
                    <span className="kui-radio__label">{child.props.children}</span>
                </Label>
            );
        });       
    }

    return (
        <div
            className={className}
            {...attributes}
        >
            {buttonHocs}
        </div>
    );
};

Radio.propTypes = {
    active: PropTypes.number,
    onChange: PropTypes.func,
};

Radio.defaultProps = {
    active: null,
    onChange: null,
};

export default Radio;