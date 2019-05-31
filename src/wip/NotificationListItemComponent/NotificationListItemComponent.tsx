import * as React from 'react';
import {INotificationListItemProps} from './types';
import {capitalize, pluralize} from './behaviour/NotificationListItemComponentHelper';
import {Button, Icon, Input, Select, SelectList} from '../../ui';
import './_NotificationListItemComponent.scss';

const units = ['MINUTE', 'HOUR', 'DAY'];
const defaultUnit = 'MINUTE';
const defaultValue = 5;

export const NotificationListItemComponent: React.SFC<INotificationListItemProps> =
    (props) => {
        const {value, onValueChange, onUnitsChange, onTrash} = props;
        let currentValue = defaultValue;
        let currentUnit = units.indexOf(defaultUnit);

        const onUnitsSelectChange = (e: any) => {
            if (e && e.item && e.item.value) {
                const unit = e.item.value;
                onUnitsChange(unit);
                currentUnit = units.indexOf(unit);
            }
        };

        const onValueInputChange = (e: any) => {
            if (e && e.target && e.target.value) {
                currentValue = e.target.value;
                onValueChange(currentValue)
            }
        };

        return (
            <li className="notification-list-item">
                <label className="notification-list-item__label">Notify</label>
                <span className="value-input--container">
                    <Input
                        className="value-input"
                        type="number"
                        value={currentValue.toString()}
                        onChange={(e: any) => onValueInputChange(e)}
                    />
                </span>
                <span className="units-select--container">
                    <Select className="units-select"
                            variant="arrow"
                            active={currentUnit}
                            onChange={(e: any) => onUnitsSelectChange(e)}>
                        <SelectList className="units-select--list">
                            {
                                units.map(unit => {
                                    return (
                                        <li className="units-select--item" value={unit}>
                                            {capitalize(pluralize(value, unit))}
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
    onValueChange: value => {
        console.log(Number(value));
        return Number(value)
    },
    onUnitsChange: unit => {
        console.log(unit);
        return unit
    },
    onTrash: () => {
        console.log('onTrash');
        return
    }
};

NotificationListItemComponent.displayName = 'NotificationListItemComponent';
