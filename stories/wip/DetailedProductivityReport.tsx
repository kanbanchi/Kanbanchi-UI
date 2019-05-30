import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { AppDetailedProductivityChart } from '../../src/wip/DetailedReport/AppDetailedReport';
import { reportSettingsInitial } from '../../src/wip/DetailedReport/constants';

const Story = () => {
    return (
        <div className="page">
            <h2>AppDetailedProductivityChart</h2>
            <section>
                <AppDetailedProductivityChart
                    reportSettings={reportSettingsInitial}
                    reportData={{}}
                />
            </section>
        </div>
    );
}

storiesOf('WIP', module)
    .add('DetailedProductivityReport', () => <Story/>);
