import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Button, Hint, ButtonsGroup } from '../../src/ui';
import { ThemeSwitch } from '../common/themeSwitch/themeSwitch';

const Story = () => {
    let [showHint, setShowHint] = React.useState(false);

    React.useEffect(() => {
        let showHintTimer = setTimeout(() => {
            showHint = true;
            setShowHint(showHint);
        }, 1000);

        return () => {
            clearTimeout(showHintTimer);
        };
    }, []);

    return (
        <div className="page">
            <ThemeSwitch />
            <section>
                <h2>Tutorial</h2>

                <div
                    id={'card-for-tutorial-hint'}
                    className={'card-for-tutorial-hint'}
                    onMouseEnter={() => {
                        showHint = true;
                        setShowHint(true);
                    }}
                >
                    <span>Card1</span>
                </div>
                <div
                    className={'card-for-tutorial-hint'}
                >
                    <span>Card2</span>
                </div>
                <div
                    className={'card-for-tutorial-hint'}
                >
                    <span>Card3</span>
                </div>

                <Hint
                    className={'stories-hint-tutor'}
                    direction={'down'}
                    arrow={'up'}
                    header={'Click card'}
                    value={'Click card to open settings'}
                    footer={
                        <>
                            <Button
                                className={'kui-hint__button-tertiary'}
                                color={'white'}
                                onClick={()=>console.log('Skip')}
                            >
                                Skip
                            </Button>
                            <ButtonsGroup>
                                <Button
                                    className={'kui-hint__button-secondary'}
                                    color={'white'}
                                    onClick={()=>console.log('Previous')}
                                >
                                    Previous
                                </Button>
                                <Button
                                    color={'white'}
                                    onClick={()=>console.log('Next')}
                                >
                                    Next
                                </Button>
                            </ButtonsGroup>
                        </>
                    }
                    show={showHint}
                    isPortal={false}
                    selector={'#card-for-tutorial-hint'}
                    onHide={()=>setShowHint(false)}
                >
                </Hint>
            </section>

            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

        </div>
    );
};

storiesOf('Animations', module)
    .add('Tutorial', () => <Story/>);
