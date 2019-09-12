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
        title,
        variant,
        onClose,
        ...attributes
    } = props,
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
                </div>
                {footer}
            </div>
        </div>
    );
};

Modal.defaultProps = {
    buttons: null,
    title: '',
    variant: null,
    onClose: () => null
};

Modal.displayName = 'Modal';
