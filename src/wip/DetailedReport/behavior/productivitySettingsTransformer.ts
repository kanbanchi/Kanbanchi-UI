import { IReportSettings } from '../appDomainTypes';
import { IProductivityReportData } from '../types';
import { productivityDetailedDefault } from './settingsTransformerConstants';
import { dateColumn, numberColumn, stringColumn, tooltipColumn } from './settingsTransformerHelper';

export class ProductivitySettingsTransformer {
    private reportSettings: IReportSettings;
    private reportData;

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
        let columns = [
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
    }
}
