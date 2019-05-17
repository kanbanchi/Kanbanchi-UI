import React, { useState, useRef } from 'react';
import { PropTypes, ClassNames, ClassVariants, isMobileDevice } from '../utils';
import { Button, Dropdown } from '../../ui';
import '../../../src/ui/buttonDropdown/buttonDropdown.module.scss';

export const ButtonDropdown = (props) => {
    let {
        children,
        className,
        disabled,
        variants,
        onBlur,
        onClick,
        ...attributes
    } = props,
        btn = null,
        list = null;

    const [isOpenedHook, setIsOpenedHook] = useState(false);
    const buttonRef = useRef(null);

    className = ClassNames(
        'kui-button-dropdown',
        (disabled) ? 'kui-button-dropdown--disabled' : null,
        (isOpenedHook) ? 'kui-button-dropdown--opened' : null,
        ClassVariants({variants, prefix: 'kui-button-dropdown--variant_'}),
        className
    );

    attributes.onClick = (e) => {
        let isOpened = isOpenedHook;
        setIsOpenedHook(!isOpenedHook);
        if (!isOpened && isMobileDevice()) buttonRef.current.scrollIntoView({block: 'start', behavior: 'smooth'});
        if (onClick) onClick(e);
    }

    attributes.onBlur = (e) => {
        setTimeout(() => {
            setIsOpenedHook(false);
        }, 200); // delay after onClick
        if (onBlur) onBlur(e);
    }

    if (children) {
        if (!children.length) children = [children]; // if 1 child
        list = React.Children.map(children, (child) => {
            if (child.type.name === 'Button') {
                attributes.className = ClassNames(
                    'kui-button-dropdown__item',
                    child.props.className
                ),
                btn = React.cloneElement(child, attributes);
                return null;
            }
            if (child.type.name !== 'SelectList') return child;
            return React.cloneElement(child, {
                onChange: attributes.onChange
            });
        });
    }

    return (
        <div className={className} ref={buttonRef}>
            {btn}
            <Dropdown
                className="kui-button-dropdown__dropdown"
                opened={isOpenedHook}
            >
                {list}
            </Dropdown>
        </div>
    );
};

ButtonDropdown.variants = [
    'right'
];

ButtonDropdown.propTypes = {
    disabled: PropTypes.bool,
    variants: PropTypes.arrayOf(PropTypes.string)
};

ButtonDropdown.defaultProps = {
    disabled: false,
    variants: []
};

export default ButtonDropdown;