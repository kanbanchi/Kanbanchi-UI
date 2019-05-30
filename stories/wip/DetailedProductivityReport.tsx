import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { AppDetailedProductivityChart } from '../../src/wip/DetailedReport/AppDetailedReport';
import { userDetails } from '../../src/wip/DetailedReport/constants';
import { getSyntheticProductivityData, getSyntheticProductivitySettings } from '../../src/wip/DetailedReport/synthetic/syntheticDataToCheckProductivityReportRendering';

const dateStart = new Date(2019, 0, 1).valueOf();
const dateEnd = new Date(2019, 8, 15).valueOf();

const reportData = getSyntheticProductivityData(userDetails, dateStart, dateEnd);
const reportSettings = getSyntheticProductivitySettings(userDetails, dateStart, dateEnd);

console.log('Sett');
console.log(reportSettings);
console.log('Data');
console.log(reportData);

const Story = () => {
    return (
        <div className="page">
            <h2>AppDetailedProductivityChart</h2>
            <section>
                <AppDetailedProductivityChart
                    reportSettings={reportSettings}
                    reportData={reportData}
                />
            </section>
        </div>
    );
}

storiesOf('WIP', module)
    .add('DetailedProductivityReport', () => <Story/>);
