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
        color,
        dateFormat,
        isClearable,
        variant,
        onSelect,
        ...attributes
    } = props,
        inputAttributes = {};

    className = ClassNames(
        'kui-datepicker',
        className
    );

    const pickerRef = useRef(null);

    attributes.dateFormat = dateFormat || defaultDateFormat;

    attributes.isClearable = (isClearable !== null) ? isClearable : true;

    inputAttributes.variant = variant || 'datepicker';
    
    if (color) inputAttributes.color = color;

    attributes.onSelect = (e) => {
        pickerRef.current.input.setIsFilled(e);
        if (onSelect) onSelect(e);
    }

    return (
        <div className={className}>
            <ReactDatepicker
                customInput={<Input {...inputAttributes}/>}
                locale="en-GB"
                ref={pickerRef}
                {...attributes}
            />
        </div>
    );
};

Datepicker.propTypes = {
    color: PropTypes.oneOf([
        'grey'
    ]),
    variant: PropTypes.oneOf([
        'arrow',
        'header',
        'datepicker',
        'search',
        'withicon'
    ])
};

Datepicker.defaultProps = {
    color: null,
    variant: null
};

export default Datepicker;
