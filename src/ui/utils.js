import PropTypes from 'prop-types';

const ClassNames = (...props) => props.filter(i => !!i).join(' ');

const isMobileDevice = () => 
    (typeof window.orientation !== 'undefined')
    || (navigator.userAgent.indexOf('IEMobile') !== -1);

export {
    PropTypes,
    ClassNames,
    isMobileDevice
};