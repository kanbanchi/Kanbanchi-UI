export const ClassNames = (...props: any) =>
    props
        .map((i: string | Array<string>) => (Array.isArray(i)) ? i.join(' ') : i)
        .filter((i: string) => !!i)
        .join(' ');

export const ClassList = (name: string) =>
    (!name) ? [] : name.split(' ').filter(item => item.trim());

export const ClassesList = (element: HTMLElement, names: string | Array<string> = null) => {
    let target = element;
    let classes: Array<string> = [];
    while (target.parentNode) {
        if (target.classList && target.classList.length) { // svg path doesnt have classList
            classes = [
                ...classes,
                ...target.classList
            ];
            if (names) {
                if (typeof names === 'string') {
                    if (classes.includes(names)) break;
                } else {
                    if (names[0] && classes.includes(names[0])) break;
                    if (names[1] && classes.includes(names[1])) break;
                }
            }
        }
        target = target.parentNode as HTMLElement;
    }
    return classes;
}

export const isMobileDevice = () =>
    (typeof window.orientation !== 'undefined')
    || (navigator.userAgent.indexOf('IEMobile') !== -1);

export const userAgentsInclude = (agents: Array<string>) => {
    const ua = navigator.userAgent.toLowerCase();
    let includes = false;
    agents.forEach((agent: string) => {
        if (ua.includes(agent)) includes = true;
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
