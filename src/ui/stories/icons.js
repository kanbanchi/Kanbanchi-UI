import React from 'react';
import { storiesOf } from '@storybook/react';
import { Icon } from '../../ui';

const icons = [
    'arrow-back',
    'arrow-down',
    'arrow-drop',
    'arrow-forward',
    'arrow-long-right',
    'arrow-up',
    'arrow-up-down',
    'assign',
    'attach',
    'back',
    'bell',
    'board',
    'calendar',
    'card',
    'change-list',
    'chart',
    'checkbox-off',
    'checkbox-on',
    'checklist',
    'clear',
    'close',
    'collapse',
    'color-tag',
    'color-tags',
    'comment',
    'copy',
    'credit-card',
    'date-due',
    'date-start',
    'deadline',    
    'description',
    'done',
    'drop',    
    'email-new',
    'epic-card',
    'error',
    'estimate',
    'expland',
    'filters',
    'gantt',
    'help',
    'info',
    'kanban',
    'knowlege',
    'list-view',
    'mention',
    'more-vertical',
    'move',
    'ok',
    'overdue',
    'palette',
    'pen',
    'pin',
    'plus',    
    'predecessor',
    'print',
    'priority-critical',
    'priority-high',
    'priority-low',
    'priority-medium',
    'priority-no',
    'priority-normal',
    'radio-button-off',
    'radio-button-on',
    'read-all',
    'related',
    'rocket',
    'search',
    'settings',
    'star',
    'status',
    'subcard',
    'support',
    'tag',
    'template',
    'trash',
    'trello',
    'update',
    'user',
    'wait',
    'x',
];

const icons96 = [
    'agile',
    'announcement',
    'atention',
    'burndown-chart',
    'comulative-flow',
    'content-production',
    'create-new-template',
    'development',
    'done',
    'event-planning',
    'expired-date',
    'feature',
    'first-board',
    'get-premium',
    'kanban-priority',
    'kanban',
    'mvp',
    'search-empty',
    'search-folder',
    'search-seats',
    'starred-folder',
    'teams',
    'things-5',
    'user-template',
    'video-tutorials',
    'weekly-planning',
];

const iconsOld = [
    'notification-active',
    'notification-assign',
    'notification-attach',
    'notification-board',
    'notification-card',
    'notification-color',
    'notification-comment',
    'notification-copy',
    'notification-create',
    'notification-datetime',
    'notification-deadline',
    'notification-delete',
    'notification-description',
    'notification-due',
    'notification-edit',
    'notification-edited',
    'notification-hourglass',
    'notification-lock',
    'notification-mail',
    'notification-mention',
    'notification-move',
    'notification-priority-no',
    'notification-priority',
    'notification-reload',
    'notification-star',
    'notification-tag',
    'account-settings',
    'account-switch',
    'account',
    'activity',
    'add-box',
    'add-calendar',
    'add-card',
    'add-circle',
    'add-subcards',
    'add',
    'added-calendar',
    'arrow-back',
    'arrow-dropdown-down',
    'arrow-dropdown-up',
    'attachments',
    'b-arrow',
    'big-sector-100',
    'big-sector-12_5',
    'big-sector-25',
    'big-sector-37_5',
    'big-sector-50',
    'big-sector-62_5',
    'big-sector-75',
    'big-sector-87_5',
    'board-settings',
    'board',
    'boards',
    'calendar',
    'card-checklist',
    'card',
    'check',
    'checkbox-done',
    'checkbox',
    'checklist',
    'circle-pause',
    'circle-play',
    'circle-stop',
    'close-small',
    'close',
    'cloud-backup',
    'cloud-download',
    'color-tag-finish',
    'color-tag-start',
    'colour-tag',
    'comments',
    'crown',
    'deadline',
    'delete',
    'description',
    'discard-spent-time',
    'done-circle-outline',
    'done-circle',
    'drag-handle',
    'drop',
    'due',
    'edit',
    'estimate-time',
    'face-smile',
    'facebook',
    'filter',
    'fold',
    'folder-plus',
    'folder',
    'gantt-view',
    'google-plus',
    'help-rounded',
    'help',
    'kanban-view',
    'knowlege',
    'l-arrow',
    'linkedin',
    'list-view',
    'load',
    'lock-small',
    'mark-all-read',
    'minus',
    'more-vertical',    
    'offline-data',
    'overdue',
    'palette',
    'pause',
    'pin',
    'placeholder-attachments',
    'placeholder-ckecklists',
    'placeholder-comments',
    'play',
    'plus',
    'printer',
    'r-arrow',
    'related-cards',
    'remove-circle-outline',
    'restore',
    'search-square',
    'search',
    'send',
    'settings',
    'share-domain-link',
    'share-domain',
    'share-link',
    'share-private',
    'share-public',
    'share-specific',
    'shield-big',
    'shield-green',
    'shield-yellow',
    'signout',
    'sort',
    'spent-time',
    'star',
    'starred-board',
    'start-date',
    'stop',
    'subcards',
    't-arrow',
    'trello',
    'tune',
    'twitter',
    'unfold',
    'userpic-mask',
    'warning',
    'watch',
    'window-video',
    'youtube',
];

function iconItem(options) {
    let { xlink, size = 24, title = '', key } = options;
    title = (!title) ? xlink : title;    
    return (
        <div className="icons-grid__item" key={key}>
            <div className="icons-grid__icon">
                <Icon xlink={xlink} size={size} title={title} />
            </div>
            <div className="icons-grid__text">
                {title}
            </div>
        </div>
    );
};

function iconsList(options) {
    let { arr, size = 24 } = options;
    return arr.map((i, key) => iconItem({ xlink: i, key, size }));
};

storiesOf('KUI', module)
    .add('Icons', () => {        
        return (
            <div className="page">
                <section>
                    <h2>New</h2>
                    <b>16px</b>
                    <div className="icons-grid">
                        {iconsList({ arr: icons, size: 16 })}
                    </div>
                    <b>24px</b>
                    <div className="icons-grid">
                        {iconsList({ arr: icons })}
                    </div>
                    <b>96px</b>
                    <div className="icons-grid icons-grid--large">
                        {iconsList({ arr: icons96, size: 96 })}
                    </div>
                </section>

                <section>
                    <h2>Old</h2>
                    <div className="icons-grid">
                        {iconsList({ arr: iconsOld })}
                    </div>
                </section>

                <section>
                    <h2>Sizes</h2>
                    <div className="icons-grid icons-grid--large">
                        {iconItem({ xlink: 'attachments', size: 16, title: 16 })}
                        {iconItem({ xlink: 'attachments', size: 24, title: 24 })}
                        {iconItem({ xlink: 'attachments', size: 96, title: 96 })}
                    </div>
                </section>
                                
            </div>        
        )
    });
