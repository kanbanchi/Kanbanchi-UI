import { IInputPublicProps } from './../input/types';

export interface IDatepickerStateProps {
    maxDate?: Date;
    minDate?: Date;
    selected: Date;
}

export interface IDatepickerDispatchProps {
    onChange: (date: Date) => void;
}

export interface IDatepickerProps extends
    IDatepickerStateProps,
    IDatepickerDispatchProps,
    IInputPublicProps
{
    className?: string;
    dateFormat?: string;
    popperPlacement?: string;
}
