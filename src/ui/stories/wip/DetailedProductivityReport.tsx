import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { AppDetailedProductivityChart } from '../../DetailedReport/AppDetailedReport';
import { reportSettingsInitial } from '../../DetailedReport/constants';

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
