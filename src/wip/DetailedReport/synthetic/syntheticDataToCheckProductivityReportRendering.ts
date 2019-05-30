import { IReportSettings, IReportData } from '../appDomainTypes';
import { userDetails, reportSettingsInitial, IUserDetails } from '../constants';
import { makeUser, getRandomInt, plussRandomDays, makeProductivityNodeData } from './syntheticDataHelper';
import { IProductivityReportLine, IProductivityReportData } from '../types';

export const getSyntheticProductivitySettings =
(
    userDetails: IUserDetails[],
    dateStart: number,
    dateEnd: number,
) => {
    const users = userDetails.map((userDetails) => makeUser(userDetails.id, userDetails.name));
    const reportSettings: IReportSettings = {
        ...reportSettingsInitial,
        dateStart,
        dateEnd,
        users
    };
    return reportSettings;
}

// reports settings

export const getProductivityReportLine =
(
    userId: string,
    dateStart: number,
    dateEnd: number,
) => {
    let currentDate = dateStart;
    const result: IProductivityReportLine = {};
    do {
        result[currentDate.toString()] = makeProductivityNodeData();
        currentDate = plussRandomDays(currentDate);
    } while (currentDate < dateEnd);

    return result;
}

const getSyntheticProductivityData =
(
    users: IUserDetails[]
): IProductivityReportData => {
    const result = {};
    return result;
}
