import PropTypes from 'prop-types';

const ClassNames = (...props) => props.filter(i => !!i).join(' ');

const ClassVariants = ({variants, prefix}) => {
    let ret = '';
    if (variants.length) {
        ret += prefix + variants.join(' ' + prefix);
    }
    return ret;
};

export {
    PropTypes,
    ClassNames,
    ClassVariants
};