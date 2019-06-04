import * as React from 'react';
import {INotificationListItemProps} from './types';
import {capitalize, singularize} from './behaviour/NotificationListItemComponentHelper';
import {Button, Icon, Input, Select, SelectList} from '../../ui';
import './_NotificationListItemComponent.scss';
import {ITimeUnits as units} from './types'

const defaultUnit = 'MINUTES';
const defaultInterval = 5;

export const notificationListItemMockProps = {
    id: 0,
    unit: defaultUnit,
    interval: defaultInterval,
    orderNumber: 0,
    onValueChange: (value: any) => {
        console.log(Number(value));
        return Number(value)
    },
    onUnitsChange: (unit: any) => {
        console.log(unit);
        return unit
    },
    onTrash: () => {
        console.log('onTrash');
        return
    }
};

export const NotificationListItemComponent: React.SFC<INotificationListItemProps> =
    (props) => {
        const {interval, onValueChange, onUnitsChange, onTrash} = props;
        let currentInterval = defaultInterval;
        let currentUnitIndex = Object.keys(units).indexOf(defaultUnit);

        const onUnitsSelectChange = (e: any) => {
            if (e && e.item && e.item.value) {
                const unit = e.item.value;
                onUnitsChange(unit);
                currentUnitIndex = Object.keys(units).indexOf(unit);
            }
        };

        const onValueInputChange = (e: any) => {
            if (e && e.target && e.target.value) {
                currentInterval = e.target.value;
                onValueChange(currentInterval)
            }
        };

        return (
            <li className="notification-list-item">
                <label className="notification-list-item__label">Notify</label>
                <span className="value-input--container">
                    <Input
                        className="value-input"
                        type="number"
                        value={currentInterval.toString()}
                        onChange={(e: any) => onValueInputChange(e)}
                    />
                </span>
                <span className="units-select--container">
                    <Select className="units-select"
                            variant="arrow"
                            active={currentUnitIndex}
                            onChange={(e: any) => onUnitsSelectChange(e)}>
                        <SelectList className="units-select--list">
                            {
                                Object.keys(units).map(unit => {
                                    return (
                                        <li className="units-select--item" value={unit}>
                                            {capitalize(singularize(interval, unit))}
                                        </li>
                                    )
                                })
                            }
                        </SelectList>
                    </Select>
                </span>
                <Button
                    variant="icon"
                    className="trash-notification--icon"
                    onClick={() => onTrash()}>
                    <Icon xlink="trash" size={24} />
                </Button>
            </li>
        );
    };

NotificationListItemComponent.defaultProps = {
    ...notificationListItemMockProps
};

NotificationListItemComponent.displayName = 'NotificationListItemComponent';
