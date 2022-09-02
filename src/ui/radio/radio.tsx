import * as React from 'react';
import { IRadioInheritedProps } from './types';
import { ClassNames, ClassList } from '../utils';
import {Label} from '../../ui';
import '../../../src/ui/radio/radio.module.scss';

// accessibility ok

export const Radio: React.FC<IRadioInheritedProps> =
React.forwardRef((props, ref) => {
    let {
        active,
        direction,
        onChange,
        children,
        className,
        ...attributes
    } = props,
        items: any[];

    className = ClassNames(
        'kui-radio',
        (direction) ? 'kui-radio--direction_' + direction : null,
        className
    );

    let [focusHook, setFocusHook] = React.useState(active || 0);

    let childrenArray: Array<{}> = // children could be string, we need array
        (Array.isArray(children)) ? children : [children];

    const itemsRefs: any[] = [];

    items = React.Children.map(childrenArray, (child: any, i) => {
        if (!child || !child.props) return null;
        const classList = ClassList(child.props.className);

        let indexDisabled = classList.indexOf('disabled');
        const disabled = ~indexDisabled;
        if (~indexDisabled) classList.splice(indexDisabled, 1);

        itemsRefs.push(React.useRef(null));
        const refIndex = itemsRefs.length - 1;

        let buttonclassName = ClassNames(
            'kui-radio__item',
            classList,
            (i === active) ? 'kui-radio__item--active' : null,
            (disabled) ? 'kui-radio__item--disabled' : null,
        );
        return (
            <Label
                className={buttonclassName}
                data-index={i}
                ref={itemsRefs[refIndex]}
                role={'radio'}
                tabIndex={refIndex === focusHook ? 0 : -1}
                aria-checked={active === i}
                aria-disabled={!!disabled}
                aria-selected={refIndex === focusHook}
                disabled={!!disabled}
            >
                <input
                    type={'radio'}
                    className={'kui-radio__input'}
                    checked={i === active}
                    disabled={!!disabled}
                    tabIndex={-1} // focus active label
                    onChange={(e: any) => {
                        if (!disabled && onChange) onChange((Object.assign({}, e, {index: i})));
                        if (child.props.onClick) child.props.onClick(e);
                    }}
                />
                <span className="kui-radio__label">
                    {child.props.children}
                </span>
            </Label>
        );
    });

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
            setFocusHook(focusHook);
            if (itemsRefs[focusHook].current) itemsRefs[focusHook].current.focus();
        }
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (itemsRefs[focusHook].current && itemsRefs[focusHook].current.dataset.index) {
                const { onChange } = items[itemsRefs[focusHook].current.dataset.index].props.children[0].props;
                if (onChange) onChange(e);
            }
        }
    }

    React.useEffect(() => {
        setFocusHook(active || 0)
    }, [active]);

    return (
        <ul
            className={className}
            role={'radiogroup'}
            ref={ref as any}
            onKeyDown={onKeyDown}
            {...attributes}
        >
            {items}
        </ul>
    );
});

Radio.defaultProps = {
    active: null,
    direction: 'right',
    onChange: (): void => undefined,
};

Radio.displayName = 'Radio';
