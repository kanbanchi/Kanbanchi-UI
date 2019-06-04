import { IReportSettings, IReportsUser } from '../appDomainTypes';
import { IProductivityReportData, IProductivityReportLine } from '../types';
import { productivityDetailedDefault } from './settingsTransformerConstants';
import { dateColumn, numberColumn, tooltipColumn, IGoogleChartColumn, getStringDatesInterval, makeDateOfString, formatDateForTooltip } from './settingsTransformerHelper';
import { getEmptyProductivityRecord, IUserDetails } from '../constants';

export interface ITooltipData {
    name: string;
    done: number;
    overdue: number;
}

export class ProductivitySettingsTransformer {
    private reportSettings: IReportSettings;
    private reportData: IProductivityReportData;
    private datesInterval: string[];
    private selectedUsers: IReportsUser[];

    private chartData: any[];

    constructor(
        reportSettings: IReportSettings,
        reportData: IProductivityReportData,
    ) {
        const {dateStart, dateEnd} = reportSettings;
        this.reportSettings = reportSettings;
        this.selectedUsers = this.reportSettings.users.filter(user => user.isSelected);
        this.datesInterval = getStringDatesInterval(dateStart, dateEnd);
        this.reportData = this._getRegularProductivityData(reportData);
    }

    public getProductivityDetailedOptions() {
        const defaultOptions = JSON.parse(JSON.stringify(productivityDetailedDefault))
        let series = {};
        this.reportSettings.users.forEach((user, index) => {
            const doneCardsIndex = index * 2;
            const overdueCardsIndex = index * 2 + 1;
            series[doneCardsIndex] = {
                color: user.color
            };
            series[overdueCardsIndex] = {
                color: user.color,
                lineDashStyle: [4, 2],
            }
        });
        defaultOptions.series = series;

        return defaultOptions;

        // add options lineDashStyle
    }

    _getProductivityDetailedColumns() {
        let columns: IGoogleChartColumn[] = [
            dateColumn('days')
        ];
        this.selectedUsers.forEach((user) => {
            columns = [
                ...columns,
                numberColumn(`${user.fullName} Done`),
                tooltipColumn(),
                numberColumn(`${user.fullName} Overdue`),
                tooltipColumn(),
            ]
        });
        return columns;
    }

    makeDatailedTooltip(
        date: number,
        tooltipData: ITooltipData[]
        ) {
        const humanReadableDate = formatDateForTooltip(date);
        const tooltipBody = tooltipData.map((data) => ( `<span className="tooltip">${data.name} - ${data.done} - ${data.overdue}</span> ` )).join('\n');
        return (`
        <div className="productivity-detailed-tooltip__container">
            <span>${humanReadableDate}</span>
            <div className="productivity-detailed-tooltip__body">
                ${tooltipBody}
            </div>
        </div>`
        );
    }

    _getRegularProductivityData(
        irregularData: IProductivityReportData,
        ) {
        const seriesKeys = Object.keys(irregularData);

        const result = {} as IProductivityReportData;
        let previosRecord;

        for (let userId of seriesKeys) {
            const regularSeriesData: IProductivityReportLine = {};
            for (let date of this.datesInterval) {

                const todayRecord = irregularData[userId][date];

                if (!todayRecord && !previosRecord) {
                    const emptyRecord = getEmptyProductivityRecord();
                    regularSeriesData[date] = {...emptyRecord};
                };

                if (todayRecord) {
                    regularSeriesData[date] = {...todayRecord};
                } else if (previosRecord) {
                    regularSeriesData[date] = {...previosRecord};
                }

            }
            result[userId] = regularSeriesData;
        }

        return  result;
    }

    public calculateProductivityDetailedChartData() {
        // first row is columns the next are data
        let chartData = [this._getProductivityDetailedColumns()];

        this.datesInterval.forEach((date)=> {
            const today = makeDateOfString(date);
            let todayRecord: any[] = [today];

            this.selectedUsers.forEach((user) => {
                const todayDone = this.reportData[user.userId][date].signifyData.value;
                const todayOverdue = this.reportData[user.userId][date].asideData[0].value;

                todayRecord = [
                    ...todayRecord,
                    todayDone,
                    '',                 //todo tooltip
                    todayOverdue,
                    '',                 //todo tooltip
                ]
            });
            chartData = [...chartData, todayRecord];
        });

        const tooltips = this.calculateTooltips(chartData);
        console.log(tooltips);

        this.chartData = chartData;
    }

    calculateTooltips(chartData: any[]) {
        const userNames = this.selectedUsers.map((user) => user.fullName);


        // This datesInterval reduce
        const tooltips = chartData.reduce((accum, chartDataRow, index) => {
            if (index === 0) {
                return [ ...accum ];
            } else {
                const date = (chartDataRow[0] as Date).valueOf();
                let dailyTooltipData: ITooltipData[] = [];

                userNames.forEach((userName, index) => {
                    const baseIndex = index * 4;
                    const doneCardsIndex = baseIndex + 1;
                    const overdueCardsIndex = baseIndex + 3;
                    const correspondingName = userName;

                    const newRecord: ITooltipData = {
                        name: correspondingName,
                        done: chartDataRow[doneCardsIndex],
                        overdue: chartDataRow[overdueCardsIndex],
                    }

                    dailyTooltipData = [...dailyTooltipData,  newRecord];
                });
                const dateTooltip = this.makeDatailedTooltip(date, dailyTooltipData);
                return [
                    ...accum,
                    dateTooltip,
                ];
            }
        }, []);

        return tooltips;
    }

    getChartData() {
        if (this.chartData && this,this.chartData.length > 0) {
            return this.chartData;
        } else {
            return {};
        }
    }
}
