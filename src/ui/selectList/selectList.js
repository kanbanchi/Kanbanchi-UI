import React, { useEffect, useState } from 'react';
import { PropTypes, ClassNames } from '../utils';
import { Divider } from '../../ui';
import '../../../src/ui/selectList/selectList.module.scss';

export const SelectList = (props) => {
    let {
        active,
        children,
        className,
        fixActive,
        onChange,
        ...attributes
    } = props,
        items;

    className = ClassNames(
        'kui-select-list',
        (!fixActive) ? 'kui-select-list--noactive' : null,
        className
    );

    const [activeHook, setActiveHook] = useState(active);

    if (children) {
        if (!children.length) children = [children]; // if 1 child
        items = React.Children.map(children, (child, index) => {
            const divider = (child.props.divider) ? <Divider /> : null;
            const item = [React.cloneElement(child, {
                className: ClassNames(
                    'kui-select-list__item',
                    child.props.className,
                    (fixActive && index === activeHook) ? 'kui-select-list__item--active' : null,
                    (child.props.disabled) ? 'kui-select-list__item--disabled' : null,
                ),
                onClick: (e) => {
                    if (!child.props.disabled) {
                        if (fixActive) setActiveHook(index);
                        if (onChange) onChange(Object.assign({}, e, {
                            index,
                            item: child.props
                        }));
                    }
                    if (child.props.onClick) child.props.onClick(e);
                },
                divider: null
            })];
            if (divider) {
                item.push(divider);
            }
            return item;
        });
    }

    useEffect(() => {
        setActiveHook(active);
    }, [active]);
    
    return (
        <ul className={className} {...attributes}>
            {items}
        </ul>
    );
};

SelectList.propTypes = {
    active: PropTypes.number, // index of active item
    fixActive: PropTypes.bool // --noactive class for actions
};

SelectList.defaultProps = {
    active: null,
    fixActive: true
};

export default SelectList;