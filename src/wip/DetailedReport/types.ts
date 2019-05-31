import { IReportSettings, IReportRepresentableData, IReportData } from './appDomainTypes';

export interface IAppProductivityDetailedProps {
    reportSettings: IReportSettings;
    reportData: IReportRepresentableData;
}

export type IProductivityReportData = { [userId: string]: IProductivityReportLine };
export type IProductivityReportLine = { [dateKey: string]: IProductivityReportNodeData }
export interface IProductivityReportNodeData {
    signifyData: IReportData<number>; // done cards
    asideData: [IReportData<number>]; // overdue cards
}

export interface IAppProductivityChartPrivateProps {
    width: any;
    height: any;
    chartType: any;
}