import React from 'react';
import { storiesOf } from '@storybook/react';
import { TestComponent } from '../../ui/testComponent/testComponent';
class StoryTestComponent extends React.Component {
    render() { 
        return (
            <div className="page">            
                <section>
                    <h2>TestComponent</h2>
                    <TestComponent></TestComponent>
                    <br />
                    <TestComponent isBlack doWork={()=>console.log('(.Y.)')}></TestComponent>
                </section>
            </div>
        )
    } 
};

storiesOf('KUI', module)
    .add('TestComponent', () => <StoryTestComponent/>);
