import React, { forwardRef } from 'react';
import { PropTypes, ClassNames } from '../utils';
import { Icon } from '../../ui';
import '../../../src/ui/selectListItem/selectListItem.module.scss';

export const SelectListItem = forwardRef((props, ref) => {
    let {
        children,
        className,
        icon,
        list,
        ...attributes
    } = props,
        iconEl = null,
        listEl = null;

    className = ClassNames(
        'kui-select-list-item',
        (list) ? 'kui-select-list-item--with-list' : null,
        className
    );

    if (icon) {
        iconEl = <Icon xlink={icon} className="kui-select-list-item__icon" />;
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
            ref={ref}
            {...attributes}
        >
            <span className="kui-select-list-item__col kui-select-list-item__col--icon">
                {iconEl}
            </span>
            <span className="kui-select-list-item__col kui-select-list-item__col--title">
                <span className="kui-select-list-item__title">
                    {children}
                </span>
            </span>
            {listEl}
        </li>
    );
});

SelectListItem.propTypes = {
    icon: PropTypes.string,
    list: PropTypes.string
};

SelectListItem.defaultProps = {
    icon: null,
    list: null
};

export default SelectListItem;