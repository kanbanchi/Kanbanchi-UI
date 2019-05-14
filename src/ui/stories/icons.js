import React from 'react';
import { storiesOf } from '@storybook/react';
import { Icon } from '../../ui';

const iconsFiles = require.context(
    '!svg-react-loader!./../../assets/icons/',
    false,
    /\.svg$/
);

const icons = iconsFiles.keys().map(file => file.replace(/(\.\/|\.svg$)/g, ''));

const icons96Files = require.context(
    '!svg-react-loader!./../../assets/icons/big/',
    false,
    /\.svg$/
);

const icons96 = icons96Files.keys().map(file => file.replace(/(\.\/|\.svg$)/g, ''));

function iconItem(options) {
    let { xlink, size = 24, title = '', key } = options;
    title = (!title) ? xlink : title;
    return (
        <div className="icons-grid__item" key={key}>
            <div className="icons-grid__icon">
                <Icon xlink={xlink} size={size} title={title} />
            </div>
            <div className="icons-grid__text">
                {title}
            </div>
        </div>
    );
};

function iconsList(options) {
    let { arr, size = 24 } = options,
        letter = '';
    return arr.sort().map((i, key) => {
        let ret = [];
        if (i[0] !== letter) {
            letter = i[0];
            ret.push(<div className="icons-grid__letter" key={key + '-letter'}>{letter}</div>);
        }
        ret.push(iconItem({ xlink: i, key, size }));
        return ret;
    });
};

storiesOf('KUI', module)
    .add('icons', () => {
        return (
            <div className="page">
                <section>
                    <h2>16px</h2>
                    <div className="icons-grid">
                        {iconsList({ arr: icons, size: 16 })}
                    </div>
                </section>
                <section>
                    <h2>24px</h2>
                    <div className="icons-grid">
                        {iconsList({ arr: icons })}
                    </div>
                </section>
                <section>
                    <h2>96px</h2>
                    <div className="icons-grid icons-grid--large">
                        {iconsList({ arr: icons96, size: 96 })}
                    </div>
                </section>
            </div>
        )
    });
