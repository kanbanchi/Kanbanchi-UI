import * as moment from 'moment'
import {} from '../constants';

const dateColumnType = 'date';
const numberColumnType = 'number';
const stringColumnType = 'string';

const tooltipColumnRole = 'tooltip';

export const statisticServerTimeFormat = 'YYYY-MM-DD';

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

export const getStringDatesInterval =
(
    startDate: number,
    endDate: number
): string[] => {
    const isDatesValid = isValidDates(startDate, endDate);
    if (!isDatesValid) throw new Error(`Invalid date interval ${startDate} - ${endDate}`);

    const result =[] as string[];
    let currentDate = startDate;

    do {
        const dateStringRepresentation = formatDateStatisticStyle(currentDate);
        result.push(dateStringRepresentation);
        currentDate = moment(currentDate).add(1, 'days').valueOf();
    } while (currentDate <= endDate) // last one added is endDate

    return result;
}

export const isValidDates =
(
    startDate: number,
    endDate: number
) => {
    return startDate < endDate;
}

export const formatDateStatisticStyle =
(date: number) => {
    const formattedDate = moment(date).format(statisticServerTimeFormat);
    return formattedDate;
}
