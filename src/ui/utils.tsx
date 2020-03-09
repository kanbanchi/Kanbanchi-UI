export const ClassNames = (...props: any) =>
    props
        .map((i: string | Array<string>) => (Array.isArray(i)) ? i.join(' ') : i)
        .filter((i: string) => !!i)
        .join(' ');

export const ClassList = (name: string) =>
    (!name) ? [] : name.split(' ').filter(item => item.trim());

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
