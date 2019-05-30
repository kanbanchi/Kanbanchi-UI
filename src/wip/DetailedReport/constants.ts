import { IReportList, IReportsUser, IReportSettings, IDoneCardsOptions } from './appDomainTypes';

export const colors = ['red', 'green', 'black', 'blue', 'gray', 'aqua'];

export const doneCardsOptions: IDoneCardsOptions = Object.freeze({
    ARE_IN_DONE_LIST: 'Are in Done list',
    MARKED_AS_DONE: 'Marked as Done'
});

export const reportSettingsInitial: IReportSettings = {
    reportType: 1,
    isSet: false,
    isSynchronizing: false,
    isShownAsidePanel: true,
    dateStart: 0,
    dateEnd: 0,
    dashboard: {
        id: 0,
        created: 0,
        name: '',
        hash: ''
    },
    lists: [] as IReportList[],
    users: [] as IReportsUser[],
    doneCardsList: null,
    doneCardsOption: doneCardsOptions.ARE_IN_DONE_LIST,
    isIdealWorkShown: true,
    isDetailed: false
}

export interface IUserDetails {
    id: string;
    name: string;
}
export const userDetails: IUserDetails[] = [
    {
        id: '1',
        name: 'Arnold Shvartzneger'
    },
    {
        id: '2',
        name: 'Aria Stark'
    },
    {
        id: '3',
        name: 'Gal Mormonth'
    },
];
