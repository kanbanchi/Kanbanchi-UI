import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { IconsList } from './utils';
import { EIconSize } from '../../src/ui/icon/types';

const Story = () => {
    const icons = require.context(
        '!svg-react-loader!./../../src/assets/icons/96/',
        false,
        /\.svg$/
    ).keys().map(file => file.replace(/(\.\/|\.svg$)/g, ''));

    return (
        <div className="page">
            <section>
                <h2>96px</h2>
                <div className="icons-grid icons-grid--large">
                    {IconsList({ arr: icons, size: EIconSize.SIZE_96 })}
                </div>
            </section>
        </div>
    );
};

storiesOf('Icons', module)
    .add('Large', () => <Story/>);
