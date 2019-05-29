import * as React from 'react';
import { ISelectListProps } from './types';
import { ClassNames, ClassList } from '../utils';
import { Divider } from '../../ui';
import '../../../src/ui/selectList/selectList.module.scss';

export const SelectList: React.SFC<
    ISelectListProps
    & React.HTMLAttributes<HTMLElement>
> = (props) => {
    let {
        active,
        children,
        className,
        fixActive,
        loading,
        onChange,
        onSelectListInit,
        ...attributes
    } = props,
        items;

    className = ClassNames(
        'kui-select-list',
        (!fixActive) ? 'kui-select-list--noactive' : null,
        (loading) ? 'kui-select-list--loading' : null,
        className
    );

    const childrenArray: Array<{}> = // children could be string, we need array
        (Array.isArray(children)) ? children : [children];

    const [activeHook, setActiveHook] = React.useState(active);

    const itemsRefs = Array.from({ length: childrenArray.length }, () => React.useRef(null));

    items = React.Children.map(childrenArray, (child: React.ReactElement, index) => {
        const classList = ClassList(child.props.className);

        let indexDivider = classList.indexOf('divider');
        const divider = ~indexDivider ? <Divider /> : null;
        if (~indexDivider) classList.splice(indexDivider, 1);

        let indexDisabled = classList.indexOf('disabled');
        const disabled = ~indexDisabled;
        if (~indexDisabled) classList.splice(indexDisabled, 1);

        const item = [React.cloneElement(child, {
            className: ClassNames(
                'kui-select-list__item',
                classList,
                (index === activeHook) ? 'kui-select-list__item--active' : null,
                disabled ? 'kui-select-list__item--disabled' : null,
            ),
            ref: itemsRefs[index],
            onClick: (e: React.SyntheticEvent<HTMLElement>) => {
                if (!disabled) {
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

    React.useEffect(() => {
        setActiveHook(active);
    }, [active]);

    React.useEffect(() => {
        if (onSelectListInit) onSelectListInit(itemsRefs);
    }, []);
    
    return (
        <ul className={className} {...attributes}>
            {items}
        </ul>
    );
};

SelectList.defaultProps = {
    active: null,
    fixActive: true,
    loading: false,
    onSelectListInit: () => undefined
};

SelectList.displayName = 'SelectList';
