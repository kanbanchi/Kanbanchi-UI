import * as React from 'react';
import { IRadioInheritedProps } from './types';
import { ClassNames, ClassList } from '../utils';
import {Label} from '../../ui';
import '../../../src/ui/radio/radio.module.scss';

export const Radio: React.SFC<IRadioInheritedProps> =
React.forwardRef((props, ref) => {
    let {
        active,
        onChange,
        children,
        className,
        ...attributes
    } = props,
        buttonHocs;

    className = ClassNames(
        'kui-radio',
        className
    );

    let childrenArray: Array<{}> = // children could be string, we need array
        (Array.isArray(children)) ? children : [children];

    buttonHocs = React.Children.map(childrenArray, (child: any, i) => {
        if (!child || !child.props) return null;
        const classList = ClassList(child.props.className);

        let indexDisabled = classList.indexOf('disabled');
        const disabled = ~indexDisabled;
        if (~indexDisabled) classList.splice(indexDisabled, 1);

        let buttonclassName = ClassNames(
            'kui-radio__item',
            classList,
            (i === active) ? 'kui-radio__item--active' : null
        );
        let buttonAttributes: React.InputHTMLAttributes<HTMLInputElement> = {
            type: 'radio',
            className: 'kui-radio__input',
            onChange: (e: any) => {
                if (onChange) onChange((Object.assign({}, e, {index: i})));
                if (child.props.onClick) child.props.onClick(e);
            },
            checked: i === active
        };
        if (disabled) {
            buttonclassName += ' kui-radio__item--disabled';
            buttonAttributes.disabled = true;
        }
        return (
            <Label className={buttonclassName}>
                <input {...buttonAttributes} />
                <span className="kui-radio__label">
                    {child.props.children}
                </span>
            </Label>
        );
    });

    return (
        <div
            className={className}
            ref={ref as any}
            {...attributes}
        >
            {buttonHocs}
        </div>
    );
});

Radio.defaultProps = {
    active: null,
    onChange: (): void => undefined,
};

Radio.displayName = 'Radio';
