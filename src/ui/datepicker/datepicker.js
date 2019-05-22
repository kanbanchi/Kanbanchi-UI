import React, { useRef } from 'react';
import ReactDatepicker, { registerLocale } from 'react-datepicker';
import enGB from 'date-fns/locale/en-GB';
import { PropTypes, ClassNames } from '../utils';
import { Input } from '../../ui';
import 'react-datepicker/dist/react-datepicker.css';
import '../../../src/ui/datepicker/datepicker.module.scss';

registerLocale('en-GB', enGB); // Weeks start on Monday

const defaultDateFormat = 'd MMM yyyy';

export const Datepicker = (props) => {
    let {
        className,
        dateFormat,
        isClearable,
        variants,
        onSelect,
        ...attributes
    } = props;

    className = ClassNames(
        'kui-datepicker',
        className
    );

    const pickerRef = useRef(null);

    attributes.dateFormat = dateFormat || defaultDateFormat;

    attributes.isClearable = (isClearable !== null) ? isClearable : true;

    if (!variants) {
        variants = ['datepicker'];
    } else if (!variants.includes('datepicker')) {
        variants.push('datepicker');
    }

    attributes.onSelect = (e) => {
        pickerRef.current.input.setIsFilled(e);
        if (onSelect) onSelect(e);
    }

    return (
        <div className={className}>
            <ReactDatepicker
                customInput={<Input variants={variants}/>}
                locale="en-GB"
                ref={pickerRef}
                {...attributes}
            />
        </div>
    );
};

Datepicker.propTypes = {
    variants: PropTypes.arrayOf(PropTypes.string) // Input.variants
};

Datepicker.defaultProps = {
    variants: []
};

export default Datepicker;
