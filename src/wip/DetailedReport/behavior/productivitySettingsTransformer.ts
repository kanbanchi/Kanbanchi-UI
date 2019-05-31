import { IReportSettings, IReportsUser } from '../appDomainTypes';
import { IProductivityReportData, IProductivityReportLine } from '../types';
import { productivityDetailedDefault } from './settingsTransformerConstants';
import { dateColumn, numberColumn, tooltipColumn, IGoogleChartColumn, getStringDatesInterval, makeDateOfString } from './settingsTransformerHelper';
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
        return (`
        <div className="productivity-detailed-tooltip__container">
            <div className="productivity-detailed-tooltip__body">
                ${tooltipData.map((data) => ( `<span className="tooltip">${data.name} - ${data.done} - ${data.overdue}</span>` ))}
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

                // const tooltipData: ITooltipData[] = this.selectedUsers.map((user): ITooltipData => {
                //     return {
                //         name: user.fullName,
                //         done: 
                //     }
                // });

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
        this.chartData = chartData;
    }

    getChartData() {
        if (this.chartData && this,this.chartData.length > 0) {
            return this.chartData;
        } else {
            return {};
        }
    }
}
