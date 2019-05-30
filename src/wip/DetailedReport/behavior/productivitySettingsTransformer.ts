import { IReportSettings } from '../appDomainTypes';
import { IProductivityReportData } from '../types';
import { productivityDetailedDefault } from './settingsTransformerConstants';

export class ProductivitySettingsTransformer {
    private reportSettings;
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
        
    }
}
