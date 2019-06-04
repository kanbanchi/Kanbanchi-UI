//taken from Kanbanchi: src/main/war/js/app/types/model.ts

export enum ITimeUnits {
    MINUTES = 'MINUTES',
    HOURS = 'HOURS',
    DAYS = 'DAYS',
}

export interface INotificationListItemOwnProps {
    id: number;
}

export interface INotificationListItemStateProps {
    interval?: number;
    unit: string
    units: ITimeUnits;
    orderNumber: number
}

export interface INotificationListItemDispatchProps {
    onValueChange: (interval: number) => number;
    onUnitsChange: (unit: string) => string;
    onTrash: () => void;
}

export interface INotificationListItemProps extends
    INotificationListItemOwnProps,
    INotificationListItemStateProps,
    INotificationListItemDispatchProps
{}
