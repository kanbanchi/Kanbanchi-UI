import * as React from 'react';

export const SCREEN_PADDING = 8; // px

export const ClassNames = (...props: any) =>
    props
        .map((i: string | Array<string>) => (Array.isArray(i)) ? i.join(' ') : i)
        .filter((i: string) => !!i)
        .join(' ');

export const ClassList = (name: string) =>
    (!name)
        ? []
        : name.split(' ')
            .map(item => item.trim())
            .filter(item => item);

export const getParentsClasses = (
    element: HTMLElement,
    names: string[] = null
): string[] => {
    let target = element;
    let classes: string[] = [];
    let found = false;
    while (
        !found &&
        target &&
        target.parentNode
    ) {
        if (
            target.classList && // svg path doesnt have classList
            target.classList.length
        ) {
            classes = [
                ...classes,
                ...target.classList
            ];
            if (names) {
                for (
                    let i = 0;
                    i < names.length;
                    i++
                ) {
                    if (classes.includes(names[i])) {
                        found = true;
                        break;
                    }
                }
            }
        }
        target = target.parentNode as HTMLElement;
    }
    return classes;
}

export const getHasScroll = (
    element: HTMLElement
): {
    x: boolean;
    y: boolean;
} => {
    let target = element;
    let x = false;
    let y = false;
    while (
        !x && !y &&
        target &&
        target.parentNode
    ) {
        if (target.scrollWidth > target.clientWidth) {
            x = true;
        }
        if (target.scrollHeight > target.clientHeight) {
            y = true;
        }
        target = target.parentNode as HTMLElement;
    }
    return {x, y};
}

export const isMobileDevice = () =>
    (typeof window.orientation !== 'undefined')
    || (navigator.userAgent.indexOf('IEMobile') !== -1);

export const userAgentsInclude = (agents: Array<string>) => {
    const ua = navigator.userAgent.toLowerCase();
    let includes = false;
    agents.forEach((agent: string) => {
        if (ua.includes(agent)) {
            if (
                agent === 'safari' &&
                ua.includes('chrome')
            ) {
                // we caught you, chrome
            } else {
                includes = true;
            }
        }
    });
    return includes;
}

export const getScrollClient = () => {
    const body = document.body;
    const docEl = document.documentElement;

    return {
        scrollLeft: window.pageXOffset || docEl.scrollLeft || body.scrollLeft,
        scrollTop: window.pageYOffset || docEl.scrollTop || body.scrollTop,
        clientLeft: docEl.clientLeft || body.clientLeft || 0,
        clientTop: docEl.clientTop || body.clientTop || 0
    }
}

export const getParentsScrollTop = (
    element: HTMLElement
): number => {
    let target = element;
    while (
        target &&
        target.parentNode
    ) {
        if (target.scrollTop) return target.scrollTop;

        target = target.parentNode as HTMLElement;
    }
    return 0;
}

export const useCombinedRefs = (
    ...refs: any[]
): React.MutableRefObject<any> => {
    const targetRef = React.useRef();

    React.useEffect(() => {
        refs.forEach(ref => {
            if (!ref) return

            if (typeof ref === 'function') {
                ref(targetRef.current)
            } else {
                ref.current = targetRef.current
            }
        })
    }, [refs]);

    return targetRef;
}
