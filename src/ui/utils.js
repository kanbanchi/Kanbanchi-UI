import PropTypes from 'prop-types';

const ClassNames = (...props) => props.filter(i => !!i).join(' ');

export {
    PropTypes,
    ClassNames
};