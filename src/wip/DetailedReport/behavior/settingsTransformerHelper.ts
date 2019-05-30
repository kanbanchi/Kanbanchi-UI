const dateColumnType = 'date';
const numberColumnType = 'number';
const stringColumnType = 'string';

const tooltipColumnRole = 'tooltip';

export const dateColumn =
(
    label: string = 'days',
) => {
    return {
        label,
        type: dateColumnType,
    }
};

export const numberColumn =
(
    label: string = 'Value'
) => {
    return {
        label,
        type: numberColumnType,
    }
}

export const stringColumn =
(
    label: string = 'Value'
) => {
    return {
        label,
        type: stringColumnType,
    }
}

export const tooltipColumn =
() => {
    return {
        role: tooltipColumnRole,
        type: stringColumnType,
    }
}
