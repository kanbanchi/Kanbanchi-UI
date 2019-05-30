export interface IReportSettings {
    reportType: number;
    isSet: boolean;
    isSynchronizing: boolean;
    isShownAsidePanel: boolean;
    dashboard: IDashboardData;
    lists: IReportList[];
    users: IReportsUser[];
    dateStart: number;
    dateEnd: number;
    doneCardsOption: string;
    doneCardsList: IListData;
    isIdealWorkShown: boolean;
    isDetailed: boolean;
}

export interface IDashboardData {
    id: number;
    created: number;
    name: string;
    hash: string;
}

export interface IRawList {
    id: number;
    name: string;
}

export interface IListData extends IRawList {
    color: string;
}

export interface IReportList extends IListData {
    isSelected: boolean;
}

export interface IReportsUser extends IUserBackboneModel {
    isSelected: boolean;
    color: string;
}

export interface IUserBackboneModel {
    userId: string;
    dashboardPermissionId: string;
    fullName: string;
    photoUrl: string;
    role: string;
    initials: string;
    firstName: string;
    lastName: string;
    authUser: boolean;
    online: boolean;
}

// data is map of lists
// each list is a map of dates
// you have representableData(that is shown)
// and aside data that is tooltiped

// seriesKey is list name or userId or any other key for
// a series
export type IReportRepresentableData = {
    [seriesKey: string]: IReportLine;
};

export type IReportLine = {
    [meteringKey: string]: IReportNodeData;
};

export interface IReportNodeData {
    signifyData: IReportData<number>;
    asideData?: IReportData<any>[];
}

export type IReportData<R> = {
    value: R;
    label: string;
};

export interface IDoneCardsOptions {
    [key: string]: string;
}
