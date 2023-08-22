import * as React from 'react';
import { ISelectListItemInheritedProps } from './types';
import { ClassNames } from '../utils';
import { Icon } from '../../ui';
import '../../../src/ui/selectListItem/selectListItem.module.scss';
import { Tooltip } from '../tooltip/tooltip';

export const SELECT_LIST_ITEM_CLASS = 'kui-select-list-item';

// accessibility ok

export const SelectListItem: React.FC<ISelectListItemInheritedProps> =
React.forwardRef((props, ref) => {
    let {
        children,
        className,
        icon,
        iconSize,
        iconStyle = {},
        list,
        listLabel,
        ...attributes
    } = props,
        childrenEl = null,
        iconEl = null,
        listEl = null;

    className = ClassNames(
        SELECT_LIST_ITEM_CLASS,
        (list) ? SELECT_LIST_ITEM_CLASS + '--with-list' : null,
        SELECT_LIST_ITEM_CLASS + '--icon-size_' + iconSize,
        className
    );

    if (icon) {
        iconEl = <Icon
            className="kui-select-list-item__icon"
            size={iconSize}
            xlink={icon}
            style={iconStyle}
        />;
    }

    if (children) {
        let childrenArray: Array<{}> = // children could be string, we need array
            (Array.isArray(children)) ? children : [children];

        childrenEl = React.Children.map(childrenArray, (child: any) => {
            if (
                !child.type ||
                !child.type.displayName ||
                child.type.displayName !== 'Userpic'
            ) return child;
            iconEl = React.cloneElement(child, {
                className: ClassNames(
                    'kui-select-list-item__icon',
                    child.props.className
                )
            });
        });
    }

    if (list) {
        listEl = (<span className="kui-select-list-item__col kui-select-list-item__col--list">
            <Tooltip
                direction={'left'}
                value={listLabel}
            >
                <span
                    className="kui-select-list-item__list"
                    aria-hidden={true} // лишняя инфа для скринридера
                >
                    {list}
                </span>
            </Tooltip>
            <span
                aria-label={listLabel} // если есть listLabel, отдать его скринридеру
            />
        </span>);
    }

    return (
        <li
            className={className}
            ref={ref as any}
            {...attributes}
        >
            <span className="kui-select-list-item__col kui-select-list-item__col--icon">
                {iconEl}
            </span>
            <span className="kui-select-list-item__col kui-select-list-item__col--title">
                <span className="kui-select-list-item__title">
                    {childrenEl}
                </span>
            </span>
            {listEl}
        </li>
    );
});

SelectListItem.defaultProps = {
    icon: null,
    iconSize: 16,
    list: null,
    listLabel: null,
};

SelectListItem.displayName = 'SelectListItem';
