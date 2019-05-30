import { IReportSettings, IReportsUser } from '../appDomainTypes';
import { IProductivityReportData } from '../types';
import { productivityDetailedDefault } from './settingsTransformerConstants';
import { dateColumn, numberColumn, tooltipColumn, IGoogleChartColumn, getStringDat, getStringDatesIntervalesInterval } from './settingsTransformerHelper';

export interface ITooltipData {
    name: string;
    done: number;
    overdue: number;
}

export class ProductivitySettingsTransformer {
    private reportSettings: IReportSettings;
    private reportData: IProductivityReportData;

    constructor(
        reportSettings: IReportSettings,
        reportData: IProductivityReportData,
    ) {
        this.reportSettings = reportSettings;
        this.reportData = reportData;
    }

    getProductivityDetailedOptions() {
        return JSON.parse(JSON.stringify(productivityDetailedDefault))
    }

    getProductivityDetailedColumns() {
        let columns: IGoogleChartColumn[] = [
            dateColumn('days')
        ];
        const selectedUsers = this.reportSettings.users.filter(user => user.isSelected);
        selectedUsers.forEach((user) => {
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

    getProductivityDetailedData() {
        const {dateStart, dateEnd} = this.reportSettings;
        const datesInInterval = getStringDatesInterval(dateStart, dateEnd);

    }
}
