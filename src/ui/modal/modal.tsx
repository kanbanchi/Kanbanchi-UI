import * as React from 'react';
import { ClassNames } from '../utils';
import '../../../src/ui/modal/modal.module.scss';
import { IModalInheritedProps } from './types';
import { Button } from '../button/button';
import { Icon } from '../icon/icon';
import { ButtonsGroup } from '../buttonsGroup/buttonsGroup';

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
                <ButtonsGroup size="large">
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

        slides = (<div className="kui-modal__slides">
            {release.slides.map(slide => {
                return (
                    <div className="kui-modal__slide">
                        <div className="kui-modal__slide-src">
                        </div>
                        <div
                            className="kui-modal__slide-description"
                            dangerouslySetInnerHTML={{ __html: slide.description }}
                        ></div>
                    </div>
                );
            })}
        </div>);
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
                        {title}
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
