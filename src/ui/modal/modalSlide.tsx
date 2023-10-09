import * as React from 'react';
import { IModalReleaseSlideProps } from './types';

export const ModalSlide: React.FC<IModalReleaseSlideProps> =
(props) => {
    let {
        description,
        src,
        title,
        variant
    } = props,
        slideSrc = null;

    if (src) {
        if (variant === 'img') {
            slideSrc = (<img
                className="kui-modal__slide-img"
                src={src}
            />);
        } else if (variant === 'video') {
            slideSrc = (<iframe
                allowFullScreen={true}
                className="kui-modal__slide-video"
                frameBorder={0}
                src={src}
            ></iframe>);
        }
    }
    return (
        <div>
            {!!slideSrc &&
                <div className="kui-modal__slide-src">
                    {slideSrc}
                </div>
            }
            <div
                className={`kui-modal__slide-description ${slideSrc ? '' : 'flexable'}`}
                dangerouslySetInnerHTML={{ __html: description }}
            ></div>
        </div>
    );
};

ModalSlide.defaultProps = {
    description: '',
    src: null,
    title: '',
    variant: 'img'
};

ModalSlide.displayName = 'ModalSlide';
