import * as React from 'react';
import { ClassNames } from '../utils';
import '../../../src/ui/modal/modal.module.scss';
import { IModalInheritedProps } from './types';
import { Button } from '../button/button';
import { Icon } from '../icon/icon';
import { ButtonsGroup } from '../buttonsGroup/buttonsGroup';
import Carousel, { StateCallBack } from 'react-multi-carousel';
import '../../../src/ui/modal/carousel.scss';
import { ModalSlide } from './modalSlide';
import { v4 as uuidv4 } from 'uuid';
import FocusLock from 'react-focus-lock';

// accessibility ok

export const Modal: React.SFC<IModalInheritedProps> =
(props) => {
    let {
        children,
        className,
        blockSelector,
        buttons,
        release,
        title,
        variant,
        onClose,
        ...attributes
    } = props,
        slides = null,
        footer = null;

    const [uniqueClass] = React.useState('kui-modal--' + uuidv4());
    const [titleHook, setTitleHook] = React.useState(
        variant === 'release' && release && release.slides && release.slides[0] && release.slides[0].title
        ? release.slides[0].title
        : title
    );

    className = ClassNames(
        'kui-modal',
        uniqueClass,
        (variant) ? 'kui-modal--variant_' + variant : null,
        className
    );

    let buttonsGroup = [];

    if (buttons) {
        buttonsGroup = buttons.map((item, key) => {
            let {
                isOpenedAfterClick,
                isPrimary,
                text,
                onClick,
                ...attributes
            } = item;

            const onClickButton = () => {
                if (onClick) onClick();
                if (!isOpenedAfterClick) onClose();
            }

            return (
                <Button
                    className="kui-modal__footer-button"
                    key={key}
                    size="large"
                    variant={isPrimary ? 'primary' : 'secondary'}
                    onClick={onClickButton}
                    {...attributes}
                >
                    {text}
                </Button>
            );
        });
        footer = (
            <div className="kui-modal__footer kui-modal__footer--buttons">
                <ButtonsGroup
                    className="kui-modal__footer-buttons"
                    size="large"
                >
                    {buttonsGroup}
                </ButtonsGroup>
            </div>
        );
    }

    if (variant === 'release' && release) {
        footer = (
            <div className="kui-modal__footer kui-modal__footer--release">
                <div className="kui-modal__footer-stars">
                    <Icon size={24} xlink="google-color"/>
                    <div
                        className="kui-modal__footer-stars-text"
                        dangerouslySetInnerHTML={{ __html: release.footer.stars }}
                    ></div>
                </div>
                <div className="kui-modal__footer-follow">
                    <div className="kui-modal__footer-follow-text">
                        {release.footer.follow.text}
                    </div>
                    <ButtonsGroup
                        className="kui-modal__footer-follow-buttons"
                        size="large"
                    >
                        {release.footer.follow.socials.map(social => (
                            <Button
                                href={social.link}
                                key={social.name}
                                target="_blank"
                                tooltip={social.name}
                                variant="icon-text"
                            >
                                <Icon
                                    className="kui-modal__footer-follow-icon"
                                    size={24}
                                    xlink={social.icon}
                                />
                            </Button>
                        ))}
                    </ButtonsGroup>
                </div>
            </div>
        );

        const ArrowFix = (arrowProps: any) => {
            const {carouselState, children, ...restArrowProps} = arrowProps;
            return (
                <Button variant="icon" {...restArrowProps}>
                    {children}
                </Button>
            );
        };

        const arrowLeft = <ArrowFix
            className="kui-modal__slides-arrow kui-modal__slides-arrow--left"
        >
            <Icon size={24} xlink="arrow-left"/>
        </ArrowFix>;

        const arrowRight = <ArrowFix
            className="kui-modal__slides-arrow kui-modal__slides-arrow--right"
        >
            <Icon size={24} xlink="arrow-right"/>
        </ArrowFix>;

        const afterChange = (
            previousSlide: number,
            state: StateCallBack
        ) => {
            const slidesCount = release.slides.length;
            let newIndex = state.currentSlide - 2;
            if (newIndex < 0) newIndex += slidesCount;
            setTitleHook(release.slides[newIndex].title);
        }

        if (release.slides.length > 1) {
            const CustomDot = ({
                active,
                onClick,
            }: any) => {
                const className = 'kui-modal__slides-dot';
                return (
                    <Button
                        className={`
                            ${className}
                            ${active ? className + '--active' : ''}
                        `}
                        variant={'icon'}
                        onClick={onClick}
                    >
                        <Icon size={16} xlink={'dot'} />
                    </Button>
                );
            };
            slides = (<Carousel
                additionalTransfrom={0}
                afterChange={afterChange}
                arrows
                centerMode={false}
                containerClass="kui-modal__slides"
                customDot={<CustomDot />}
                customLeftArrow={arrowLeft}
                customRightArrow={arrowRight}
                dotListClass="kui-modal__slides-dots"
                draggable
                focusOnSelect={false}
                infinite
                itemClass="kui-modal__slide"
                keyBoardControl
                minimumTouchDrag={80}
                renderDotsOutside={false}
                responsive={{
                    desktop: {
                        breakpoint: {
                            max: 3000,
                            min: 1024
                        },
                        items: 1
                    },
                    mobile: {
                        breakpoint: {
                            max: 464,
                            min: 0
                        },
                        items: 1
                    },
                    tablet: {
                        breakpoint: {
                            max: 1024,
                            min: 464
                        },
                        items: 1
                    }
                }}
                showDots
                sliderClass=""
                slidesToSlide={1}
                swipeable
            >
                {release.slides.map((slide, index) => (
                    <ModalSlide
                        {...slide}
                        key={index + slide.title}
                    />
                ))}
            </Carousel>);
        } else if (release.slides.length) {
            slides = (<ModalSlide
                {...release.slides[0]}
            />);
        }
    }

    const closeButton = (
        <Button
            className="kui-modal__close"
            variant="icon"
            aria-label={'Close'}
            onClick={onClose}
        >
            <Icon size={24} xlink="close"/>
        </Button>
    );

    const onKeyDown = (e: React.KeyboardEvent) => {
        if (!e) return;
        if (e.key === 'Escape') {
            return onClose();
        }
    }

    React.useEffect(() => {
        const block = document.querySelector(blockSelector) as HTMLElement;
        if (block) block.setAttribute('aria-hidden', 'true'); // скрыть контент под модалкой от скринридера

        return () => {
            if (block) block.setAttribute('aria-hidden', 'false');
        }
    }, []);

    return (
        <div
            className={className}
            aria-hidden={'false'}
            onKeyDown={onKeyDown}
            {...attributes}
        >
            <div
                className="kui-modal__overlay"
                onClick={onClose}
            />
            <FocusLock returnFocus>
                <form
                    className="kui-modal__item"
                    role={'dialog'}
                    aria-modal={true}
                    aria-labelledby={uniqueClass + '__header-title'}
                    aria-describedby={uniqueClass + '__body'}
                >
                    <div className="kui-modal__header">
                        <div
                            className="kui-modal__header-title"
                            id={uniqueClass + '__header-title'}
                        >
                            {titleHook}
                        </div>
                        {closeButton}
                    </div>
                    <div
                        className="kui-modal__body"
                        id={uniqueClass + '__body'}
                    >
                        {children}
                        {slides}
                    </div>
                    {footer}
                </form>
            </FocusLock>
        </div>
    );
};

Modal.defaultProps = {
    blockSelector: '.content', // основной контент в Kanbanchi
    buttons: null,
    release: null,
    title: '',
    variant: null,
    onClose: () => null
};

Modal.displayName = 'Modal';
