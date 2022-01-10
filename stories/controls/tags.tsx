import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Tag, Tags } from '../../src/ui';

const Story = () => {
    return (
        <div className="page">
            <section>
                <h2>Tags</h2>

                <Tags className="story-tags-max-width-100">
                    <Tag>Tag 0</Tag>
                    <Tag
                        onClick={() => console.log('Click')}
                        onClear={() => console.log('Clear')}
                    >Tag 1</Tag>
                    <Tag>Lorem</Tag>
                    <Tag>Lorem ipsum</Tag>
                    <Tag>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Tag>
                    <Tag
                        iconTooltip={'Clear'}
                        onClick={() => console.log('Click')}
                        onClear={() => console.log('Clear')}
                    >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </Tag>
                </Tags>

                <br/>

                Check empty Tags: <Tags></Tags>

            </section>
        </div>
    );
};

storiesOf('Controls', module)
    .add('Tags', () => <Story/>);
