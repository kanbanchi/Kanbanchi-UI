import React, { useState, useEffect } from 'react';
import { PropTypes, ClassNames } from '../utils';
import { Button, Dropdown } from '../../ui';
import '../../../src/ui/buttonDropdown/buttonDropdown.module.scss';

export const ButtonDropdown = (props) => {
    let {
        children,
        className,
        disabled,
        onBlur,
        onClick,
        ...attributes
    } = props,
        list = null;

    const [isOpenedHook, setIsOpenedHook] = useState(false);

    className = ClassNames(
        'kui-button-dropdown',
        (disabled) ? 'kui-button-dropdown--disabled' : null,
        (isOpenedHook) ? 'kui-button-dropdown--opened' : null,
        className
    );

    attributes.onClick = (e) => {
        setIsOpenedHook(!isOpenedHook);
        if (onClick) onClick(e);
    }

    attributes.onBlur = (e) => {
        setTimeout(() => {
            setIsOpenedHook(false);
        }, 200); // delay after onClick
        if (onBlur) onBlur(e);
    }

    if (children.length) {
        list = React.Children.map(children, (child) => {
            if (child.type.name !== 'SelectList') return child;
            return React.cloneElement(child, {
                onChange: attributes.onChange
            });
        });
    } else if (children) {
        list = React.cloneElement(children, {
            onChange: attributes.onChange
        });
    }

    return (
        <div className={className}>
            <Button 
                className="kui-button-dropdown__item"
                variant="action"
                {...attributes}
            >
                Action
            </Button>
            <Dropdown opened={isOpenedHook}>
                {list}
            </Dropdown>
        </div>
    );
};

ButtonDropdown.propTypes = {
    disabled: PropTypes.bool
};

ButtonDropdown.defaultProps = {
    disabled: false
};

export default ButtonDropdown;