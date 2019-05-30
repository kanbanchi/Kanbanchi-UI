import { IReportSettings, IReportData } from '../appDomainTypes';
import { userDetails, reportSettingsInitial, IUserDetails } from '../constants';
import { makeUser, getRandomInt, plussRandomDays, makeProductivityNodeData } from './syntheticDataHelper';
import { IProductivityReportLine, IProductivityReportData } from '../types';

const users = userDetails.map((userDetails) => makeUser(userDetails.id, userDetails.name));

const reportSettings: IReportSettings = reportSettingsInitial;
reportSettings.users = users;

// reports settings

const getProductivityReportLine =
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

const ProductivityReportData =
(
    users: IUserDetails[]
): IProductivityReportData => {
    const result = {};
    return result;
}
