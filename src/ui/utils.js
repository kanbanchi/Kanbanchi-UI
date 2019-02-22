import PropTypes from 'prop-types';

const ClassNames = (...props) => {
    return props.join(' ');
};

export {
    PropTypes,
    ClassNames
};