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

export const Modal: React.SFC<IModalInheritedProps> =
(props) => {
    let {
        children,
        className,
        buttons,
        release,
        title,
        variant,
        onClose,
        ...attributes
    } = props,
        slides = null,
        footer = null;

    className = ClassNames(
        'kui-modal',
        (variant) ? 'kui-modal--variant_' + variant : null,
        className
    );

    const [titleHook, setTitleHook] = React.useState(title);

    let buttonsGroup = [],
        onEnter: () => void = () => null;

    if (buttons) {
        buttonsGroup = buttons.map((item, key) => {
            let {
                isPrimary,
                text,
                onClick,
                ...attributes
            } = item;

            if (isPrimary && onClick) {
                onEnter = onClick;
            }

            const onClickButton = () => {
                if (onClick) onClick();
                onClose();
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
            <Icon size={24} xlink="arrow-back"/>
        </ArrowFix>;

        const arrowRight = <ArrowFix
            className="kui-modal__slides-arrow kui-modal__slides-arrow--right"
        >
            <Icon size={24} xlink="arrow-forward"/>
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
            slides = (<Carousel
                additionalTransfrom={0}
                afterChange={afterChange}
                arrows
                centerMode={false}
                containerClass="kui-modal__slides"
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
                {release.slides.map((slide, index) => {
                    return (<ModalSlide
                        {...slide}
                        key={index + slide.title}
                    />);
                })}
            </Carousel>);
        } else if (release.slides.length) {
            slides = (<ModalSlide
                {...release.slides[0]}
            />);
            if (titleHook !== release.slides[0].title) {
                setTitleHook(release.slides[0].title);
            }
        }
    }

    const closeButton = variant === 'actions' ? null :
        (<Button
            className="kui-modal__close"
            variant="icon"
            onClick={onClose}
        >
            <Icon size={24} xlink="close"/>
        </Button>);

    const onKeyUp = (e: React.KeyboardEvent) => {
        if (!e) return;
        e.persist();
        if (e.which === 27) { // esc
            return onClose();
        }
        if (e.which === 13) { // enter
            onEnter();
            return onClose();
        }
    }

    const modalRef = React.useRef(null);

    React.useEffect(() => {
        modalRef.current.focus();
    }, []);

    return (
        <div
            className={className}
            ref={modalRef}
            tabIndex={0}
            onKeyUp={onKeyUp}
            {...attributes}
        >
            <div
                className="kui-modal__overlay"
                onClick={onClose}
            ></div>
            <div className="kui-modal__item">
                <div className="kui-modal__header">
                    <div className="kui-modal__header-title">
                        {titleHook}
                    </div>
                    {closeButton}
                </div>
                <div className="kui-modal__body">
                    {children}
                    {slides}
                </div>
                {footer}
            </div>
        </div>
    );
};

Modal.defaultProps = {
    buttons: null,
    release: null,
    title: '',
    variant: null,
    onClose: () => null
};

Modal.displayName = 'Modal';
