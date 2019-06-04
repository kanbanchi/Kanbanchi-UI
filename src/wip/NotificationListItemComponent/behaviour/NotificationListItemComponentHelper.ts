export const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const pluralize = (num: number, str: string) => {
    return num === 1 ? str : str + 's'
};
