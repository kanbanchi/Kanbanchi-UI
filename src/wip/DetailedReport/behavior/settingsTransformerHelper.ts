const dateColumnType = 'date';
const numberColumnType = 'number';
const stringColumnType = 'string';

const dateColumn =
(
    label: string = 'days',
) => {
    return {
        label,
        type: dateColumnType,
    }
};


