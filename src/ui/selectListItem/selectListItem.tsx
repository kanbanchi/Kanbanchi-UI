import * as React from 'react';
import { ISelectListItemInheritedProps } from './types';
import { ClassNames } from '../utils';
import { Icon } from '../../ui';
import '../../../src/ui/selectListItem/selectListItem.module.scss';

export const SELECT_LIST_ITEM_CLASS = 'kui-select-list-item';

export const SelectListItem: React.SFC<ISelectListItemInheritedProps> =
React.forwardRef((props, ref) => {
    let {
        children,
        className,
        icon,
        iconSize,
        list,
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
            <span className="kui-select-list-item__list">
                {list}
            </span>
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
    list: null
};

SelectListItem.displayName = 'SelectListItem';
