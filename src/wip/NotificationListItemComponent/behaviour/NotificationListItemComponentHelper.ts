export const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * removes the last 's' char from
 * unit string depending on num value
 * @param num
 * @param str
 */
export const singularize = (num: number, str: string) => {
    return num === 1 ? str.slice(0, -1) : str
};
