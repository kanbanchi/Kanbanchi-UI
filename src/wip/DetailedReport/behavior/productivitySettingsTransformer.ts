import { IReportSettings, IReportsUser } from '../appDomainTypes';
import { IProductivityReportData, IProductivityReportLine } from '../types';
import { productivityDetailedDefault } from './settingsTransformerConstants';
import { dateColumn, numberColumn, tooltipColumn, IGoogleChartColumn, getStringDatesInterval, makeDateOfString } from './settingsTransformerHelper';

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
        return JSON.parse(JSON.stringify(productivityDetailedDefault))
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

    makeDatailedTooltip(tooltipData: ITooltipData[]) {
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

                if (!todayRecord && !previosRecord) break;

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
                const todayDone = this.reportData[user.userId][date].signifyData.label;
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
