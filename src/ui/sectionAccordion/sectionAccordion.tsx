import * as React from 'react';
import { ISectionAccordionInheritedProps } from './types';
import { ClassNames } from '../utils';
import '../../../src/ui/sectionAccordion/sectionAccordion.module.scss';
import { Button, ButtonTitle, Icon } from '../../ui';

export const SectionAccordion: React.SFC<ISectionAccordionInheritedProps> =
React.forwardRef((props, ref) => {
    let {
        Action,
        children,
        className,
        color,
        icon,
        opened,
        title,
        onClose,
        onOpen,
        ...attributes
    } = props;

    const [isOpenedHook, setIsOpenedHook] = React.useState(opened);
    const [isClickedHook, setIsClickedHook] = React.useState(false);

    const bodyRef = React.useRef(null);
    const headerRef = React.useRef(null);

    className = ClassNames(
        'kui-section-accordion',
        (color) ? 'kui-section-accordion--color_' + color: null,
        (isClickedHook)
            ? 'kui-section-accordion--' + (isOpenedHook ? 'opened' : 'closed')
            : (isOpenedHook ? 'kui-section-accordion--opened-default' : null),
        className
    );

    const onButtonClick = () => {
        if (!isOpenedHook && onOpen) onOpen();
        setIsOpenedHook(!isOpenedHook);
        setIsClickedHook(true);
    }

    const bodyAnimationEnd = () => {
        if (isOpenedHook) {
            setTimeout(() => {
                headerRef.current.scrollIntoView({block: 'nearest', behavior: 'smooth'});
            }, 100);
        }
    }

    React.useEffect(() => {
        setIsOpenedHook(opened);
    }, [opened]);

    return (
        <div
            className={className}
            ref={ref as any}
            {...attributes}
        >
            <div
                className="kui-section-accordion-header"
                ref={headerRef}
            >
                <Button
                    className="kui-section-accordion-button"
                    variant="icon-text"
                    onClick={onButtonClick}
                >
                    <Icon
                        className="kui-section-accordion-button__icon"
                        size={24}
                        xlink={icon}
                    />
                    <ButtonTitle
                        className="kui-section-accordion-button__title"
                    >
                        {title}
                    </ButtonTitle>
                    <Icon
                        className="kui-section-accordion-button__icon kui-section-accordion__arrow"
                        size={24}
                        xlink="arrow-drop"
                    />
                </Button>
                {Action &&
                    <div className="kui-section-accordion-action">
                        <Action className="kui-section-accordion-action__button" />
                    </div>
                }
            </div>
            <div
                className="kui-section-accordion-body"
                ref={bodyRef}
                onAnimationEnd={bodyAnimationEnd}
            >
                {children}
            </div>
        </div>
    );
});

SectionAccordion.defaultProps = {
    Action: null,
    color: null,
    icon: null,
    title: null,
    opened: false,
    onClose: () => undefined,
    onOpen: () => undefined
};

SectionAccordion.displayName = 'SectionAccordion';
