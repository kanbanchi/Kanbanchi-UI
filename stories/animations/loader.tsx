import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Loader } from '../../src/ui';

const Story = () => {
    return (
        <div className="page">
             <section>
                <h2>Loader</h2>

                <h4>Size="large"</h4>
                <p>For screen blockers or on loading data for dropdown</p>

                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 200,
                    height: 80,
                    background: '#ddd'
                }}>
                    <Loader size="large"/>
                </div>

                <br />

                <h4>Color="white"</h4>

                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 200,
                    height: 80,
                    background: '#673ab7'
                }}>
                    <Loader color={'white'} size="large"/>
                </div>

                <br />

                <h4>Color="black"</h4>

                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 200,
                    height: 80,
                    background: '#ddd'
                }}>
                    <Loader color={'black'} size="large"/>
                </div>

                <br />

                <p>On input data sync</p>

                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 40,
                    height: 40,
                    background: '#ddd'
                }}>
                    <Loader className="stories-loader-small"/>
                </div>

            </section>
        </div>
    );
};

storiesOf('Animations', module)
    .add('Loader', () => <Story/>);
