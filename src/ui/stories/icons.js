import React from 'react';
import { storiesOf } from '@storybook/react';
import { Icon } from '../../ui';

const icons = [
    'archive',
    'archive-epic',
    'account',
    'account-settings',
    'account-swith',
    'activity',
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
    'bell-plus',
    'board',
    'board-favorite',
    'board-template',
    
    'calendar',
    'card',
    'change-list',
    'chart',
    'cloud-backup',
    'cloud-download',
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
    'dots',
    'drop',
    'email-new',
    'epic-card',
    'error',
    'estimate',
    'expand',
    'filters',
    'gantt',
    'help',
    'info',
    'kanban',
    'knowlege',
    
    'linkedin',
    'list-view',
    'lock',
    'mention',
    'move',
    'mouse-over',
    
    'offline-data',
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
    'project',
    'project-favorite',
    'project-template',

    'radio-button-off',
    'radio-button-on',
    'read-all',
    'related',
    'rocket',
    'search',
    'settings',
    'share-domain-link',
    'share-domain',
    'share-link',
    'share-public',
    'share-specific',
    'sign-out',
    'star',
    'status',
    'subcard',
    'support',
    'tag',
    'template',
    'trash',
    'trello',
    'twitter',
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
    'done-b',
    'event-planning',
    'expired-date',
    'feature',
    'first-board',
    'get-premium',
    'kanban-priority',
    'kanban-b',
    'mvp',
    'permission',
    'search-reports',
    'search-folder',
    'search-seats',
    'starred-folder',
    'teams',
    'things-5',
    'user-template',
    'video-tutorials',
    'warning',
    'weekly-planning',
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
    let { arr, size = 24 } = options,
        letter = '';
    return arr.sort().map((i, key) => {
        let ret = [];
        if (i[0] !== letter) {
            letter = i[0];
            ret.push(<div className="icons-grid__letter" key={key + '-letter'}>{letter}</div>);
        }
        ret.push(iconItem({ xlink: i, key, size }));
        return ret;
    });
};

storiesOf('KUI', module)
    .add('Icons', () => {
        return (
            <div className="page">
                <section>
                    <h2>16px</h2>
                    <div className="icons-grid">
                        {iconsList({ arr: icons, size: 16 })}
                    </div>
                </section>
                <section>
                    <h2>24px</h2>
                    <div className="icons-grid">
                        {iconsList({ arr: icons })}
                    </div>
                </section>
                <section>
                    <h2>96px</h2>
                    <div className="icons-grid icons-grid--large">
                        {iconsList({ arr: icons96, size: 96 })}
                    </div>
                </section>
            </div>
        )
    });
