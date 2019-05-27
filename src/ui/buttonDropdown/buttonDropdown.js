import React, { useEffect, useState, useRef } from 'react';
import { PropTypes, ClassNames } from '../utils';
import { Dropdown } from '../../ui';
import '../../../src/ui/buttonDropdown/buttonDropdown.module.scss';

export const ButtonDropdown = (props) => {
    let {
        children,
        className,
        direction,
        disabled,
        variant,
        onBlur,
        onClick,
        ...attributes
    } = props,
        btn = null,
        list = null;

    const [directionHook, setDirectionHook] = useState(direction);
    const [isOpenedHook, setIsOpenedHook] = useState(false);
    const [timeoutHook, setTimeoutHook] = useState(null);
    const buttonRef = useRef(null);
    const dropdownRef = useRef(null);

    className = ClassNames(
        'kui-button-dropdown',
        (disabled) ? 'kui-button-dropdown--disabled' : null,
        (isOpenedHook) ? 'kui-button-dropdown--opened' : null,
        (variant) ? 'kui-button-dropdown--variant_' + variant : null,
        className
    );

    const calcDirection = () => {
        if (direction !== 'auto') return;
        let el = buttonRef.current.getBoundingClientRect();
        let dir = (el.top > window.innerHeight * 2 / 3) ? 'up' : 'down';
        setDirectionHook(dir);
    }

    const dropdownAnimationEnd = () => {
        if (isOpenedHook) {
            dropdownRef.current.scrollIntoView({block: 'nearest', behavior: 'smooth'});
        }
    }

    attributes.onClick = (e) => {
        let isOpened = isOpenedHook;
        setIsOpenedHook(!isOpenedHook);
        if (!isOpened) {
            calcDirection();
        }
        if (onClick) onClick(e);
    }

    attributes.onBlur = (e) => {
        setTimeoutHook(setTimeout(() => {
            setIsOpenedHook(false);
        }, 200)); // delay after onClick
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

    useEffect(() => {
        return () => {
            clearTimeout(timeoutHook);
        };
    }, [timeoutHook]);

    return (
        <div className={className} ref={buttonRef}>
            {btn}
            <Dropdown
                direction={directionHook}
                className="kui-button-dropdown__dropdown"
                opened={isOpenedHook}
                ref={dropdownRef}
                onAnimationEnd={dropdownAnimationEnd}
            >
                {list}
            </Dropdown>
        </div>
    );
};

ButtonDropdown.propTypes = {
    direction: PropTypes.oneOf([
        'auto',
        'down',
        'up'
    ]),
    disabled: PropTypes.bool,
    variant: PropTypes.oneOf([
        'right'
    ])
};

ButtonDropdown.defaultProps = {
    direction: 'auto',
    disabled: false,
    variant: null
};

export default ButtonDropdown;