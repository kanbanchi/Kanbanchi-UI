import * as React from 'react';
import { ISelectListInheritedProps } from './types';
import { ClassNames, ClassList } from '../utils';
import { Divider } from '../../ui';
import '../../../src/ui/selectList/selectList.module.scss';

export const SELECT_LIST_CLASS = 'kui-select-list';

export const SelectList: React.SFC<ISelectListInheritedProps> =
(props) => {
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
        SELECT_LIST_CLASS,
        (!fixActive) ? SELECT_LIST_CLASS + '--noactive' : null,
        (loading) ? SELECT_LIST_CLASS + '--loading' : null,
        className
    );

    const childrenArray: Array<{}> = // children could be string, we need array
        (Array.isArray(children)) ? children : [children];

    const [activeHook, setActiveHook] = React.useState(active);

    const itemsRefs = Array.from({ length: 1000 }, () => React.useRef(null)); // const length due to hooks order

    items = React.Children.map(childrenArray, (child: React.ReactElement, index) => {
        if (!child || !child.props) return null;
        const type = child.type as any;
        if (type && type.displayName && type.displayName === 'Divider') {
            return child;
        }

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
