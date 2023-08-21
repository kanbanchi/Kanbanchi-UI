import * as React from 'react';
import { ISelectListInheritedProps } from './types';
import { ClassNames, ClassList } from '../utils';
import { Divider } from '../../ui';
import '../../../src/ui/selectList/selectList.module.scss';

export const SELECT_LIST_CLASS = 'kui-select-list';

// accessibility ok

export const SelectList: React.FC<ISelectListInheritedProps> =
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
        items: any[];

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

    const itemsRefs = Array.from({ length: 1000 }, () => React.useRef(null)); // все useRef нужно выполнить сразу (hooks order)
    let refIndex = 0;
    let itemsLength = 0;
    let isCheckboxes = false;

    items = React.Children.map(childrenArray, (child: React.ReactElement, index) => {
        if (!child || !child.props) return null;
        const type = child.type as any;
        if (type && type.displayName && type.displayName === 'Divider') {
            itemsLength++;
            return child;
        }
        if (type && type.displayName && type.displayName === 'Checkbox') {
            isCheckboxes = true;
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

        const item = [React.cloneElement(child, {
            className: ClassNames(
                'kui-select-list__item',
                classList,
                (index === activeHook) ? 'kui-select-list__item--active' : null,
                disabled ? 'kui-select-list__item--disabled' : null,
            ),
            ['data-index']: itemsLength,
            ref: itemsRefs[refIndex],
            tabIndex: refIndex === focusHook ? 0 : -1,
            disabled: !!disabled,
            ['aria-disabled']: !!disabled,
            ['aria-selected']: refIndex === focusHook,
            onClick,
        })];
        refIndex++;
        if (divider) {
            item.push(divider);
        }
        itemsLength += item.length;
        return item;
    });

    itemsRefs.length = refIndex;

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
            const item = itemsRefs[focusHook].current as HTMLElement;
            if (item && item.className.includes('kui-select-list__item--disabled')) {
                onKeyDown(e);
            } else {
                setFocusHook(focusHook);
                if (item) item.focus();
            }
        }
        if (
            e.key === 'Enter' ||
            isCheckboxes && e.key === ' '
        ) {
            e.preventDefault();
            if (itemsRefs[focusHook].current && itemsRefs[focusHook].current.dataset.index) {
                const { disabled, onChange, onClick } = items[itemsRefs[focusHook].current.dataset.index].props;
                if (onClick) onClick(e);
                if (isCheckboxes && !disabled && onChange) onChange(e);
            }
        }
    }

    React.useEffect(() => {
        if (!active) {
            active = 0;
            const item = itemsRefs && itemsRefs.length && itemsRefs[0].current as HTMLElement;
            if (item && item.className.includes('kui-select-list__item--disabled')) {
                active++;
            }
        }
        if (fixActive) setActiveHook(active);
        setFocusHook(active)
    }, [active, children]);

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
