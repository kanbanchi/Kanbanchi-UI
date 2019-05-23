import React, {forwardRef} from 'react';
import {PropTypes, ClassNames} from '../utils';
import {Loader} from '../../ui';
import '../../../src/ui/loaderBlock/loaderBlock.module.scss';

export const LoaderBlock = forwardRef((props, ref) => {
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
            ref={ref}
            {...attributes}
        >
            <Loader className="kui-loader-block__item" />
        </div>
    );
});

LoaderBlock.propTypes = {
};

LoaderBlock.defaultProps = {
};

export default LoaderBlock;