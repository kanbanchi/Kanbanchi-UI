const dateColumnType = 'date';
const numberColumnType = 'number';
const stringColumnType = 'string';

const tooltipColumnRole = 'tooltip';

export interface IGoogleChartColumn {
    label?: string;
    type: string;
    role?: string;

}

export const dateColumn =
(
    label: string = 'days',
): IGoogleChartColumn => {
    return {
        label,
        type: dateColumnType,
    }
};

export const numberColumn =
(
    label: string = 'Value'
): IGoogleChartColumn => {
    return {
        label,
        type: numberColumnType,
    }
}

export const stringColumn =
(
    label: string = 'Value'
): IGoogleChartColumn => {
    return {
        label,
        type: stringColumnType,
    }
}

export const tooltipColumn =
(): IGoogleChartColumn => {
    return {
        role: tooltipColumnRole,
        type: stringColumnType,
    }
}
