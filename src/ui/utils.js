export const ClassNames = (...props) => 
    props
        .map(i => (Array.isArray(i)) ? i.join(' ') : i)
        .filter(i => !!i)
        .join(' ');

export const ClassList = name =>
    (!name) ? [] : name.split(' ').filter(item => item.trim());

export const isMobileDevice = () => 
    (typeof window.orientation !== 'undefined')
    || (navigator.userAgent.indexOf('IEMobile') !== -1);
