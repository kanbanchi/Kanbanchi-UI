import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Done } from '../../src/ui';
import { ThemeSwitch } from '../common/themeSwitch/themeSwitch';

const Story = () => {
    return (
        <div className="page">
            <ThemeSwitch />
            <section>
                <h2>Done</h2>

                <Done
                    percent={null}
                />

                <br /><br />

                <Done
                    percent={0}
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

                <br /><br />

                <h2>Small</h2>

                <Done
                    percent={null}
                    size={'small'}
                    titleNotDone={'Done'}
                />

                <br /><br />

                <Done
                    percent={0}
                    size={'small'}
                />

                <br /><br />

                <Done
                    percent={51}
                    size={'small'}
                />

                <br /><br />

                <Done
                    percent={100}
                    size={'small'}
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

                <br /><br />

                <h2>Small</h2>

                <Done
                    percent={null}
                    size={'small'}
                    titleNotDone={'Done'}
                />

                <br /><br />

                <Done
                    percent={0}
                    size={'small'}
                />

                <br /><br />

                <Done
                    percent={51}
                    size={'small'}
                />

                <br /><br />

                <Done
                    percent={100}
                    size={'small'}
                    titleDone={'Done'}
                />

            </section>
        </div>
    );
};

storiesOf('Stuff', module)
    .add('Done', () => <Story/>);
