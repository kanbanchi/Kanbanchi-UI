const kuiInputClassName = 'kui-input__item';
const kuiInputTag = 'INPUT';

export const isInnerInput =
(
    target: HTMLElement
) => {
    return (target.tagName === kuiInputTag) && (target.classList.contains(kuiInputClassName));
}
