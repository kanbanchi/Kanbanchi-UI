import React, { useEffect, useState, useRef } from 'react';
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
        onSelectListInit,
        ...attributes
    } = props,
        items;

    className = ClassNames(
        'kui-select-list',
        (!fixActive) ? 'kui-select-list--noactive' : null,
        className
    );

    const [activeHook, setActiveHook] = useState(active);
    const itemsRefs = [];

    if (children) {
        if (!children.length) children = [children]; // if 1 child
        items = React.Children.map(children, (child, index) => {
            itemsRefs[index] = useRef(null);
            const divider = (child.props.divider) ? <Divider /> : null;
            const item = [React.cloneElement(child, {
                className: ClassNames(
                    'kui-select-list__item',
                    child.props.className,
                    (fixActive && index === activeHook) ? 'kui-select-list__item--active' : null,
                    (child.props.disabled) ? 'kui-select-list__item--disabled' : null,
                ),
                divider: null,
                ref: itemsRefs[index],
                onClick: (e) => {
                    if (!child.props.disabled) {
                        if (fixActive) setActiveHook(index);
                        if (onChange) onChange(Object.assign({}, e, {
                            item: {
                                index,
                                value: child.props.value,
                                text: child.props.children
                            }
                        }));
                    }
                    if (child.props.onClick) child.props.onClick(e);
                }
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

    useEffect(() => {
        if (onSelectListInit) onSelectListInit(itemsRefs);
    }, []);
    
    return (
        <ul className={className} {...attributes}>
            {items}
        </ul>
    );
};

SelectList.propTypes = {
    active: PropTypes.number, // index of active item
    fixActive: PropTypes.bool, // --noactive class for actions,
    onSelectListInit: PropTypes.func,
};

SelectList.defaultProps = {
    active: null,
    fixActive: true,
    onSelectListInit: null
};

export default SelectList;