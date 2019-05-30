import * as React from 'react';
import { ILoaderBlockProps } from './types';
import { ClassNames } from '../utils';
import { Loader } from '../../ui';
import '../../../src/ui/loaderBlock/loaderBlock.module.scss';

export const LoaderBlock: React.SFC<
    ILoaderBlockProps
    & React.HTMLAttributes<HTMLElement>
> = React.forwardRef((props, ref) => {
    let {
        className,
        ...attributes
    } = props;

    const classNames = ClassNames(
        'kui-loader-block',
        className
    );

    return (
        <div
            className={classNames}
            ref={ref as any}
            {...attributes}
        >
            <Loader
                className="kui-loader-block__item"
                size="large"
            />
        </div>
    );
});

LoaderBlock.defaultProps = {
};

LoaderBlock.displayName = 'LoaderBlock';
