import * as React from 'react';
import { ISectionAccordionInheritedProps } from './types';
import { ClassNames, userAgentsInclude } from '../utils';
import '../../../src/ui/sectionAccordion/sectionAccordion.module.scss';
import { Button, ButtonTitle, Icon } from '../../ui';

// accessibility ok

export const SectionAccordion: React.FC<ISectionAccordionInheritedProps> =
React.forwardRef((props, ref) => {
    let {
        Action,
        children,
        className,
        color,
        icon,
        opened,
        title,
        titleStyle = {},
        variant,
        onClose,
        onOpen,
        ...attributes
    } = props;

    const [isOpenedHook, setIsOpenedHook] = React.useState(opened);
    const [isMountChildren, setIsMountChildren] = React.useState(opened);
    const [isChangedHook, setIsChangedHook] = React.useState(false); // default без анимации, changed с анимацией

    const bodyRef = React.useRef(null);
    const headerRef = React.useRef(null);

    className = ClassNames(
        'kui-section-accordion',
        (color) ? 'kui-section-accordion--color_' + color: null,
        (variant) ? 'kui-section-accordion--variant_' + variant: null,
        (isChangedHook)
            ? 'kui-section-accordion--' + (isOpenedHook ? 'opened' : 'closed')
            : (isOpenedHook ? 'kui-section-accordion--opened-default' : null),
        className
    );

    const setIsOpened = (newIsOpened: boolean) => {
        if (newIsOpened) setIsMountChildren(true);
        setIsOpenedHook(newIsOpened);
        setIsChangedHook(true);
    }

    const onButtonClick = () => {
        if (isOpenedHook) {
            if (onClose) onClose();
        } else {
            if (onOpen) onOpen();
        }
        setIsOpened(!isOpenedHook);
    }

    const bodyAnimationEnd = () => {
        if (isOpenedHook) {
            if (!userAgentsInclude(['edge', 'safari'])) setTimeout(() => {
                headerRef.current.scrollIntoView({block: 'nearest', behavior: 'smooth'});
            }, 100);
        } else {
            setIsMountChildren(false);
        }
    }

    React.useEffect(() => {
        if (opened === isOpenedHook) return;
        setIsOpened(opened);
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
                    aria-expanded={isOpenedHook}
                    onClick={onButtonClick}
                >
                    {icon &&
                        <Icon
                            className="kui-section-accordion-button__icon"
                            size={24}
                            xlink={icon}
                        />
                    }
                    <ButtonTitle
                        className="kui-section-accordion-button__title"
                        style={titleStyle}
                    >
                        {title}
                    </ButtonTitle>
                    <Icon
                        className="kui-section-accordion-button__icon kui-section-accordion__arrow"
                        size={24}
                        xlink={'arrow-s-drop-open'}
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
                aria-hidden={!isOpenedHook}
                hidden={!isMountChildren}
                ref={bodyRef}
                onAnimationEnd={bodyAnimationEnd}
            >
                {isMountChildren && children}
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
    variant: null,
    onClose: () => undefined,
    onOpen: () => undefined
};

SectionAccordion.displayName = 'SectionAccordion';
