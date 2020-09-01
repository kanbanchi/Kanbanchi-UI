import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { IconsList } from './utils';
import { EIconSize } from '../../src/ui/icon/types';

const Story = () => {
    const icons24 = require.context(
        '!svg-react-loader!./../../src/assets/icons/24/',
        false,
        /\.svg$/
    ).keys().map(file => file.replace(/(\.\/|\.svg$)/g, ''));

    const icons16 = require.context(
        '!svg-react-loader!./../../src/assets/icons/16/',
        false,
        /\.svg$/
    ).keys().map(file => file.replace(/(\.\/|\.svg$)/g, ''));

    return (
        <div className="page">
            <section>
                <h2>16px</h2>
                <div className="icons-grid">
                    {IconsList({ arr: icons16, size: EIconSize.SIZE_16 })}
                </div>
            </section>
            <section>
                <h2>24px</h2>
                <div className="icons-grid">
                    {IconsList({ arr: icons24, size: EIconSize.SIZE_24 })}
                </div>
            </section>
        </div>
    );
};

storiesOf('Icons', module)
    .add('Small', () => <Story/>);
