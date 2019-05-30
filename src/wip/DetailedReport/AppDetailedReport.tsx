import * as React from 'react';
import {Chart} from 'react-google-charts'
import { IAppProductivityDetailedProps } from './types';
import { reportSettingsInitial } from './constants';

export const AppDetailedProductivityChart: React.SFC<IAppProductivityDetailedProps> =
(props) => {
    return (
        <div className="productivity-detailed__facade">Productivity Detailed facade</div>
    );
}

AppDetailedProductivityChart.displayName = 'AppDetailedProductivityChart';
AppDetailedProductivityChart.defaultProps = {
    reportData: {},
    reportSettings: reportSettingsInitial,
}

