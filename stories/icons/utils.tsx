import * as React from 'react';
import { Icon } from '../../src/ui';

export const IconItem = (options: any) => {
    let { xlink, size, title = '', key } = options;
    title = (!title) ? xlink : title;
    return (
        <div className="icons-grid__item" key={key}>
            <div className="icons-grid__icon">
                <Icon xlink={xlink} size={size} title={title}/>
            </div>
            <div className="icons-grid__text">
                {title}
            </div>
        </div>
    );
};

export const IconsList = (options: any) => {
    let { arr, size } = options,
        letter = '';
    return arr.sort().map((i: any, key: any) => {
        let ret = [];
        if (i[0] !== letter) {
            letter = i[0];
            ret.push(<div className="icons-grid__letter" key={key + '-letter'}>{letter}</div>);
        }
        ret.push(IconItem({ xlink: i, key, size }));
        for (let j = 0; j < i.length; j++) {
            if (
                i.charCodeAt(j) < 65 || // A
                i.charCodeAt(j) > 122 // z
            ) console.log(i[j]);
        }
        return ret;
    });
};
