import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Done } from '../../src/ui';

const Story = () => {
    return (
        <div className="page">
            <section>
                <h2>Done</h2>

                <Done
                    percent={null}
                />

                <br /><br />

                <Done
                    percent={21}
                />

                <br /><br />

                <Done
                    percent={51}
                />

                <br /><br />

                <Done
                    percent={100}
                />

            </section>

            <section className="section-grey">

                <Done
                    percent={null}
                />

                <br /><br />

                <Done
                    percent={49}
                />

                <br /><br />

                <Done
                    percent={51}
                />

                <br /><br />

                <Done
                    percent={100}
                />

            </section>
        </div>
    );
};

storiesOf('Stuff', module)
    .add('Done', () => <Story/>);
