import React from 'react';
import { storiesOf } from '@storybook/react';
import { Button, ButtonsGroup, ButtonsSegmented, Icon, Checkbox } from '../../ui';
class StoryButtons extends React.Component {
    constructor() {
        super();
        this.toggleDisabled = this.toggleDisabled.bind(this);
        this.state = {
            disabled: true
        };
    }
    toggleDisabled() {
        this.setState(prevState => ({
            disabled: !prevState.disabled
        }));
    }
    render() { 
        return (
            <div className="page">
                <section style={{width: 240}}>
                    <Checkbox checked={this.state.disabled} onChange={this.toggleDisabled}>
                        Disable buttons
                    </Checkbox>
                </section>                
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
                        <Button color="white" size="large">Large</Button>
                        <Button color="white" size="large" disabled={this.state.disabled}>Large Disabled</Button>
                    </ButtonsGroup>
                    <br />
                    <ButtonsGroup>
                        <Button color="white">Small</Button>
                        <Button color="white" disabled={this.state.disabled}>Small Disabled</Button>
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
                    <ButtonsGroup>
                        <Button variant="fab">
                            <Icon xlink="search" size={24} />
                        </Button>
                        <Button variant="fab" disabled={this.state.disabled}>
                            <Icon xlink="search" size={24} />
                        </Button>
                    </ButtonsGroup>
                    <br />
                    <ButtonsGroup margin="large">
                        <Button variant="fab" text="Fab with text">
                            <Icon xlink="search" size={24} />
                        </Button>
                        <Button variant="fab" text="Fab with text" disabled={this.state.disabled}>
                            <Icon xlink="search" size={24} />
                        </Button>
                    </ButtonsGroup>
                    <br />
                    <ButtonsGroup>
                        <Button variant="fab" color="purple">
                            <Icon xlink="plus" size={24} />
                        </Button>
                        <Button variant="fab" color="purple" disabled={this.state.disabled}>
                            <Icon xlink="plus" size={24} />
                        </Button>
                    </ButtonsGroup>
                    <br />
                    <ButtonsGroup margin="large">
                        <Button variant="fab" color="purple" text="Fab with text">
                            <Icon xlink="plus" size={24} />
                        </Button>
                        <Button variant="fab" color="purple" text="Fab with text" disabled={this.state.disabled}>
                            <Icon xlink="plus" size={24} />
                        </Button>
                    </ButtonsGroup>
                    <br />
                    <ButtonsGroup>
                        <Button variant="fab" color="black">
                            <Icon xlink="kanban" size={24} />
                        </Button>
                        <Button variant="fab" color="black" disabled={this.state.disabled}>
                            <Icon xlink="kanban" size={24} />
                        </Button>
                    </ButtonsGroup>
                    <br />
                    <ButtonsGroup margin="large">
                        <Button variant="fab" color="black" text="Fab with text">
                            <Icon xlink="kanban" size={24} />
                        </Button>
                        <Button variant="fab" color="black" text="Fab with text" disabled={this.state.disabled}>
                            <Icon xlink="kanban" size={24} />
                        </Button>
                    </ButtonsGroup>
                </section>
                <section className="section-black">
                    <h2>FAB white</h2>
                    <ButtonsGroup>
                        <Button variant="fab" color="white">
                            <Icon xlink="search" size={24} />
                        </Button>
                        <Button variant="fab" color="white" disabled={this.state.disabled}>
                            <Icon xlink="search" size={24} />
                        </Button>
                    </ButtonsGroup>
                    <br />
                    <ButtonsGroup margin="large">
                        <Button variant="fab" color="white" text="Fab with text">
                            <Icon xlink="search" size={24} />
                        </Button>
                        <Button variant="fab" color="white" text="Fab with text" disabled={this.state.disabled}>
                            <Icon xlink="search" size={24} />
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
                            style={{width: '200px'}}
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
                    <ButtonsSegmented active={0}>
                        <Button>Button 0</Button>
                        <Button>Button 1</Button>
                        <Button onClick={() => alert(2)}>Button 2</Button>
                    </ButtonsSegmented>
                    <div>
                        <br />
                        <ButtonsSegmented
                            active={0}
                            onChange={i=>{console.log('Segment ' + i + ' active')}}
                            variant="black"
                        >
                            <Button>Button 0</Button>
                            <Button>Button 1</Button>
                        </ButtonsSegmented>
                    </div>
                </section>
                <section className="section-form-min">
                    <h2>Add</h2>
                    <Button variant="add">Add button</Button>
                    <br />
                    <br />
                    <Button variant="add" disabled>Disabled</Button>
                </section>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
            </div>
        )
    } 
};

storiesOf('KUI', module)
    .add('buttons', () => <StoryButtons/>);
