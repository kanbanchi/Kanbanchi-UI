import React from 'react';
import { PropTypes, ClassNames } from '../utils';
import { Input } from '../../ui';
import '../../../src/ui/datepicker/datepicker.module.scss';

export const Datepicker = (props) => {
    let {
        className,
        icon,
        type,
        variants,
        ...attributes
    } = props;

    className = ClassNames(
        'kui-datepicker',
        className
    );

    if (!variants) {
        variants = ['withicon'];
    } else if (!variants.includes('withicon')) {
        variants.push('withicon');
    }

    attributes.icon = icon || 'calendar';

    attributes.type = type || 'text';

    return (
        <Input
            autosize={false}
            className={className}
            variants={variants}
            {...attributes}
        />
    );
};

Datepicker.propTypes = {
};

Datepicker.defaultProps = {
};

export default Datepicker;