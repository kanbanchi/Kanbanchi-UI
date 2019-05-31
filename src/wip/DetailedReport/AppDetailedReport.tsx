import * as React from 'react';
import {Chart} from 'react-google-charts'
import { IAppProductivityDetailedProps } from './types';
import { reportSettingsInitial, initialProductivityPrivateProps } from './constants';
import { ProductivitySettingsTransformer } from './behavior/productivitySettingsTransformer';

export const AppDetailedProductivityChart: React.SFC<IAppProductivityDetailedProps> =
(props) => {
    const productivitySettingsTransformer = new ProductivitySettingsTransformer(props.reportSettings, props.reportData as any);
    productivitySettingsTransformer.calculateProductivityDetailedChartData();
    const data = productivitySettingsTransformer.getChartData();

    const productivityOptions = productivitySettingsTransformer.getProductivityDetailedOptions();

    const resultProps = {
        ...initialProductivityPrivateProps,
        ...productivityOptions,
        data,
    }

    return (
        <div className="productivity-detailed__facade">
            <Chart {...resultProps}/>
        </div>
    );
}

AppDetailedProductivityChart.displayName = 'AppDetailedProductivityChart';
AppDetailedProductivityChart.defaultProps = {
    reportData: {},
    reportSettings: reportSettingsInitial,
}
