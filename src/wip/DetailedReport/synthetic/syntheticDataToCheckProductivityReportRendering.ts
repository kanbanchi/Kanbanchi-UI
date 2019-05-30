import { IReportSettings } from '../appDomainTypes';
import { reportSettingsInitial, IUserDetails } from '../constants';
import { makeUser, getProductivityReportLine } from './syntheticDataHelper';
import { IProductivityReportData } from '../types';

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

export const getSyntheticProductivityData =
(
    users: IUserDetails[],
    dateStart: number,
    dateEnd: number,
): IProductivityReportData => {
    const result = {} as IProductivityReportData;
    users.forEach((user) => result[user.id] = getProductivityReportLine(user.id, dateStart, dateEnd));
    return result;
}
