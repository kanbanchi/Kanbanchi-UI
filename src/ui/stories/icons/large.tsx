import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { IconsList } from './utils';

const Story = () => {
    const icons = require.context(
        '!svg-react-loader!./../../../assets/icons/big/',
        false,
        /\.svg$/
    ).keys().map(file => file.replace(/(\.\/|\.svg$)/g, ''));

    return (
        <div className="page">
            <section>
                <h2>96px</h2>
                <div className="icons-grid icons-grid--large">
                    {IconsList({ arr: icons, size: 96 })}
                </div>
            </section>
        </div>
    );
};

storiesOf('Icons', module)
    .add('Large', () => <Story/>);
