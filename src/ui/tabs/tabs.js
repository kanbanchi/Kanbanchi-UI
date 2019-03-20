import React from 'react';
import { PropTypes, ClassNames } from '../utils';
import '../../../src/ui/tabs/tabs.module.scss';

export const Tabs = (props) => {
    let {
        active,
        action,
        children,
        className,
        size,
        ...attributes
    } = props,
        buttonHocs;

    className = ClassNames(
        'kui-tabs',
        (size) ? 'kui-tabs--' + size : null,
        className
    );

    if (children.length) {
        if (active > children.length - 1) active = 0;

        buttonHocs = React.Children.map(children, (child, i) => {
            return React.cloneElement(child, {
                className: ClassNames(
                    'kui-tabs__item',
                    (i === active) ? 'kui-tabs__item--active' : ''
                ),
                onClick: () => {
                    action(i);
                    if (child.props.onClick) child.props.onClick();
                }
            });
        });       
    }

    return (
        <div
            className={className}
            {...attributes}
        >
            <div className="kui-tabs__scroll">
                {buttonHocs}
            </div>
        </div>
    );
};

Tabs.propTypes = {
    active: PropTypes.number,
    action: PropTypes.func,
    size: PropTypes.oneOf([
        'large'
    ])
};

Tabs.defaultProps = {
    active: 0,
    action: null,
    size: null
};

export default Tabs;