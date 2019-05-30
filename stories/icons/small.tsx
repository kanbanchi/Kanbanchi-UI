import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { IconsList } from './utils';

const Story = () => {
    const icons = require.context(
        '!svg-react-loader!./../../src/assets/icons/',
        false,
        /\.svg$/
    ).keys().map(file => file.replace(/(\.\/|\.svg$)/g, ''));

    return (
        <div className="page">
            <section>
                <h2>24px</h2>
                <div className="icons-grid">
                    {IconsList({ arr: icons })}
                </div>
            </section>
        </div>
    );
};

storiesOf('Icons', module)
    .add('Small', () => <Story/>);
