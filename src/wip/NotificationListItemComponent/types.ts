export interface INotificationListItemOwnProps {
    id: number;
}

export interface INotificationListItemStateProps {
    value?: number;
    units: string;
    orderNumber: number
}

export interface INotificationListItemDispatchProps {
    onValueChange: (value: number) => number;
    onUnitsChange: (units: string) => string;
    onTrash: () => void;
}

export interface INotificationListItemProps extends
    INotificationListItemOwnProps,
    INotificationListItemStateProps,
    INotificationListItemDispatchProps
{}
