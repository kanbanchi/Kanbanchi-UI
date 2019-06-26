import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Button, ButtonsGroup } from '../../src/ui';

const Story = () => {
    const [progressHook, setProgressHook] = React.useState(0);
    const [s] = React.useState<any>({});
    const [getProgressHook] = React.useState(() => () => s.progressHook);
    s.progressHook = progressHook;
    const [intervalHook, setIntervalHook] = React.useState(null);

    React.useEffect(() => {
        let unmounted = false;
        setIntervalHook(setInterval(() => {
            if (unmounted) return;
            let progress = (getProgressHook() >= 100) ? 0 : getProgressHook() + 1;
            setProgressHook(progress);
        }, 100));

        return () => {
            unmounted = true;
            clearInterval(intervalHook);
        };
    }, []);

    return (
        <div className="page">
             <section>
                <h2>Primary</h2>

                <ButtonsGroup size="large">
                    <Button
                        progress={progressHook}
                        size="large"
                    >
                        {progressHook}%
                    </Button>
                    <Button
                        disabled
                        progress={progressHook}
                        size="large"
                    >
                        {progressHook}%
                    </Button>
                </ButtonsGroup>

                <br />

                <ButtonsGroup size="large">
                    <Button
                        progress={progressHook}
                    >
                        {progressHook}%
                    </Button>
                    <Button
                        disabled
                        progress={progressHook}
                    >
                        {progressHook}%
                    </Button>
                </ButtonsGroup>

            </section>

            <section className="section-purple">
                <h2>Color="white"</h2>
                <ButtonsGroup size="large">
                    <Button
                        color="white"
                        progress={progressHook}
                        size="large"
                    >
                        {progressHook}%
                    </Button>
                    <Button
                        disabled
                        color="white"
                        progress={progressHook}
                        size="large"
                    >
                        {progressHook}%
                    </Button>
                </ButtonsGroup>
                <br />
                <ButtonsGroup size="large">
                    <Button
                        color="white"
                        progress={progressHook}
                    >
                        {progressHook}%
                    </Button>
                    <Button
                        disabled
                        color="white"
                        progress={progressHook}
                    >
                        {progressHook}%
                    </Button>
                </ButtonsGroup>
            </section>

            <section>
                <h2>Secondary</h2>

                <ButtonsGroup size="large">
                    <Button
                        progress={progressHook}
                        size="large"
                        variant="secondary"
                    >
                        {progressHook}%
                    </Button>
                    <Button
                        disabled
                        progress={progressHook}
                        size="large"
                        variant="secondary"
                    >
                        {progressHook}%
                    </Button>
                </ButtonsGroup>

                <br />

                <ButtonsGroup size="large">
                    <Button
                        progress={progressHook}
                        variant="secondary"
                    >
                        {progressHook}%
                    </Button>
                    <Button
                        disabled
                        progress={progressHook}
                        variant="secondary"
                    >
                        {progressHook}%
                    </Button>
                </ButtonsGroup>
            </section>
        </div>
    );
};

storiesOf('Buttons', module)
    .add('Progress', () => <Story/>);
