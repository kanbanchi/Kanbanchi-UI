import * as React from 'react';
import { ISelectListInheritedProps } from './types';
import { ClassNames, ClassList } from '../utils';
import { Divider } from '../../ui';
import '../../../src/ui/selectList/selectList.module.scss';

export const SELECT_LIST_CLASS = 'kui-select-list';

// accessibility ok

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
    let [focusHook, setFocusHook] = React.useState(active || 0);

    const itemsRefs: any[] = [];

    const onKeyDown = (e: React.KeyboardEvent) => {
        if (!e) return;
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            e.preventDefault();
            if (e.key === 'ArrowDown') {
                focusHook++;
                if (focusHook >= itemsRefs.length) {
                    focusHook = 0;
                }
            } else if (e.key === 'ArrowUp') {
                focusHook--;
                if (focusHook < 0) {
                    focusHook = itemsRefs.length - 1;
                }
            }
            console.log(focusHook, itemsRefs);
            setFocusHook(focusHook);
            if (itemsRefs[focusHook].current) itemsRefs[focusHook].current.focus();
        }
    }

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

        const onClick = (e: React.SyntheticEvent<HTMLElement>) => {
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

        const onKeyDown = (e: React.KeyboardEvent) => {
            if (!e) return;
            if (e.key === 'Enter') {
                e.preventDefault();
                onClick(e as any);
            }
        }

        itemsRefs.push(React.useRef(null));
        const refIndex = itemsRefs.length - 1;

        const item = [React.cloneElement(child, {
            className: ClassNames(
                'kui-select-list__item',
                classList,
                (index === activeHook) ? 'kui-select-list__item--active' : null,
                disabled ? 'kui-select-list__item--disabled' : null,
            ),
            ref: itemsRefs[refIndex],
            tabIndex: refIndex === focusHook ? 0 : -1,
            disabled: !!disabled,
            ['aria-disabled']: !!disabled,
            ['aria-selected']: refIndex === focusHook,
            onClick,
            onKeyDown,
        })];
        if (divider) {
            item.push(divider);
        }
        return item;
    });

    React.useEffect(() => {
        setActiveHook(active);
        setFocusHook(active || 0)
    }, [active]);

    React.useEffect(() => {
        if (onSelectListInit) onSelectListInit(itemsRefs);
    }, []);

    return (
        <ul
            className={className}
            role={'listbox'}
            onKeyDown={onKeyDown}
            {...attributes}
        >
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
