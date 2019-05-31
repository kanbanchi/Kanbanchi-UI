import * as React from 'react';
import {INotificationListItemProps} from './types';
import {capitalize, pluralize} from './behaviour/NotificationListItemComponentHelper';
import {Icon, Input, Select, SelectList} from '../../ui';
import './_NotificationListItemComponent.scss';

const units = ['MINUTE', 'HOUR', 'DAY'];

export const NotificationListItemComponent: React.SFC<INotificationListItemProps> =
    props => {
        const {value, onValueChange, onUnitsChange, onTrash} = props;
        return (
            <li className='notification-list-item'>
                <label className='notification-list-item__label'>Notify</label>
                <span className='value-input--container'>
                    <Input
                        type='number'
                        value={value.toString()}
                        className='value-input'
                        onChange={(e: any) => onValueChange(e.target.value)}
                    />
                    {
                        /**
                         * TODO decide how to transform/validate input value
                         * (allow only numbers / highlight input on letters entered)
                         */
                    }
                </span>
                <span className='units-select--container'>
                    <Select className='units-select'
                            active={0}
                            onChange={(e: any) => onUnitsChange(e.item.value)}>
                        <SelectList>
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
                <span className='trash-notification--icon'
                      onClick={() => onTrash()}>
                    <Icon xlink='trash' size={24} />
                </span>
            </li>
        );
    };

NotificationListItemComponent.defaultProps = {
    value: 5,
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