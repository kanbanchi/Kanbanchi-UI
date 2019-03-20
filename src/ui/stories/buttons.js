import React from 'react';
import { storiesOf } from '@storybook/react';
import { Button, ButtonsGroup, ButtonsSegmented, Icon } from '../../ui';
class StoryButtons extends React.Component {
    constructor() {
        super();
        this.toggleDisabled = this.toggleDisabled.bind(this);
        this.onSegmentedClick = this.onSegmentedClick.bind(this);
        this.state = {
            disabled: true,
            segmented: 1
        };
    }
    toggleDisabled() {
        this.setState(prevState => ({
            disabled: !prevState.disabled
        }));
    }
    onSegmentedClick(i) {
        this.setState({
            segmented: i
        });
    }
    render() { 
        return (
            <div className="page">
                <p>
                    <label>
                        Disabled buttons <input type="checkbox" checked={this.state.disabled} onChange={this.toggleDisabled} />
                    </label>
                </p>                
                <section>
                    <h2>Primary</h2>
                    <ButtonsGroup margin="large">
                        <Button size="large">Large</Button>
                        <Button size="large" disabled={this.state.disabled}>Disabled</Button>
                    </ButtonsGroup>
                    <br />
                    <ButtonsGroup>
                        <Button>Small</Button>
                        <Button disabled={this.state.disabled}>Disabled</Button>
                    </ButtonsGroup>
                </section>
                <section className="section-purple">
                    <h2>Primary white</h2>
                    <ButtonsGroup margin="large">
                        <Button variant="primary_white" size="large">Large</Button>
                        <Button variant="primary_white" size="large" disabled={this.state.disabled}>Large Disabled</Button>
                    </ButtonsGroup>
                    <br />
                    <ButtonsGroup>
                        <Button variant="primary_white">Small</Button>
                        <Button variant="primary_white" disabled={this.state.disabled}>Small Disabled</Button>
                    </ButtonsGroup>
                </section>
                <section>
                    <h2>Secondary</h2>
                    <ButtonsGroup margin="large">
                        <Button variant="secondary" size="large">Large</Button>
                        <Button variant="secondary" size="large" disabled={this.state.disabled}>Large Disabled</Button>
                    </ButtonsGroup>
                    <br />
                    <ButtonsGroup>
                        <Button variant="secondary">Small</Button>
                        <Button variant="secondary" disabled={this.state.disabled}>Small Disabled</Button>
                    </ButtonsGroup>
                </section>
                <section>
                    <h2>FAB</h2>
                    <ButtonsGroup margin="large">
                        <Button variant="fab" size="large">
                            <Icon xlink="plus" size={24} />
                        </Button>
                        <Button variant="fab" size="large" disabled={this.state.disabled}>
                            <Icon xlink="plus" size={24} />
                        </Button>
                    </ButtonsGroup>
                    <br />
                    <ButtonsGroup>
                        <Button variant="fab">
                            <Icon xlink="plus" size={24} />
                        </Button>
                        <Button variant="fab" disabled={this.state.disabled}>
                            <Icon xlink="plus" size={24} />
                        </Button>
                    </ButtonsGroup>
                </section>
                <section>
                    <h2>Actions</h2>
                    <ButtonsGroup>
                        <Button variant="action">Action</Button>
                        <Button variant="action" disabled={this.state.disabled}>Text</Button>
                    </ButtonsGroup>
                </section>
                <section>
                    <h2>Text</h2>
                    <ButtonsGroup margin="large">
                        <Button variant="text" href="#">Link</Button>
                        <Button variant="text" href="#" disabled={this.state.disabled}>Disabled link</Button>
                    </ButtonsGroup>
                </section>
                <section>
                    <h2>Icon</h2>
                    <p>With extended transparent interaction area for touch</p>
                    <ButtonsGroup margin="large">
                        <Button variant="icon" title="Settings">
                            <Icon xlink="settings" size={24} />
                        </Button>
                        <Button variant="icon" title="Disabled" disabled={this.state.disabled}>
                            <Icon xlink="settings" size={24} />
                        </Button>
                    </ButtonsGroup>
                </section>
                <section>
                    <h2>Icon+text</h2>
                    <ButtonsGroup margin="large">
                        <Button 
                            variant="icon-text" 
                            text="Button text"
                        >
                            <Icon xlink="archive" size={24} />                            
                        </Button>
                        <Button 
                            variant="icon-text"
                            text="Button text"
                            title="Disabled"
                            disabled={this.state.disabled}
                        >
                            <Icon xlink="knowlege" size={24} />
                        </Button>
                    </ButtonsGroup>
                </section>
                <section>
                    <h2>Segmented</h2>
                    <ButtonsSegmented
                        active={this.state.segmented}
                        action={this.onSegmentedClick}
                    >
                        <Button>Button 0</Button>
                        <Button>Button 1</Button>
                        <Button onClick={() => alert(2)}>Button 2</Button>
                    </ButtonsSegmented>
                    <div>
                        <br />
                        <ButtonsSegmented
                            active={this.state.segmented}
                            action={this.onSegmentedClick}
                            variant="black"
                        >
                            <Button>Button 0</Button>
                            <Button>Button 1</Button>
                        </ButtonsSegmented>
                    </div>
                </section>
            </div>
        )
    } 
};

storiesOf('KUI', module)
    .add('buttons', () => <StoryButtons/>);
