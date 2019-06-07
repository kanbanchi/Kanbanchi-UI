import * as React from 'react';
import { ISectionAccordionInheritedProps } from './types';
import { ClassNames } from '../utils';
import '../../../src/ui/sectionAccordion/sectionAccordion.module.scss';

export const SectionAccordion: React.SFC<ISectionAccordionInheritedProps> =
React.forwardRef((props, ref) => {
    let {
        children,
        className,
        opened,
        onClick,
        onOpen,
        ...attributes
    } = props;

    const [isOpenedHook, setIsOpenedHook] = React.useState(opened);

    const bodyRef = React.useRef(null);

    className = ClassNames(
        'kui-section-accordion',
        (isOpenedHook) ? 'kui-section-accordion--opened' : null,
        className
    );

    const open = () => {
        setIsOpenedHook(true);
        if (onOpen) onOpen();
    }

    const dropdownAnimationEnd = () => {
        if (isOpenedHook) {
            bodyRef.current.scrollIntoView({block: 'nearest', behavior: 'smooth'});
        }
    }

    let childrenArray: Array<{}> = // children could be string, we need array
        (Array.isArray(children)) ? children : [children];

    return (
        <div
            className={className}
            ref={ref as any}
            {...attributes}
        >
            <div
                className="kui-section-accordion-header"
            >
                header
            </div>
            <div
                className="kui-section-accordion-body"
                ref={bodyRef}
                onAnimationEnd={dropdownAnimationEnd}
            >
                body
            </div>
        </div>
    );
});

SectionAccordion.defaultProps = {
    opened: false,
    onClick: () => undefined,
    onOpen: () => undefined
};

SectionAccordion.displayName = 'SectionAccordion';
