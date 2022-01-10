import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Button, Icon, Radio, SectionAccordion, Switch } from '../../src/ui';
import { IButtonInheritedProps } from '../../src/ui/button/types';

const Story = () => {
    const [opened, setOpened] = React.useState(true);
    const [opened01, setOpened01] = React.useState(true);
    const [opened02, setOpened02] = React.useState(true);
    const [val, setVal] = React.useState();

    const actionButton = (props: IButtonInheritedProps) => (
        <Button
            className={props.className}
            maxWidth="iPlus"
            text="Create board"
            tooltip={{
                direction: 'left',
                maxWidth: 'iPlus',
                value: 'Create board'
            }}
            variant="icon-text"
            onClick={()=>console.log('Created!')}
        >
            <Icon size={24} xlink="plus" />
        </Button>
    );

    return (
        <div className="page">
            <section className="section-form-min">
                <h2>Filter</h2>
                <Switch
                    checked={opened}
                    onChange={() => setOpened(!opened)}
                >
                    Toggle
                </Switch>
                <SectionAccordion
                    opened={opened}
                    title={<>Saved filters <span>(1 of 3)</span></>}
                    variant="simple"
                    onOpen={() => setOpened(true)}
                    onClose={() => setOpened(false)}
                >
                    <br/>
                    <Radio
                        active={val}
                        onChange={(i: any)=>{
                            setVal(i.index);
                            console.log(i.index);
                        }}
                    >
                        <div>Filter 1</div>
                        <div>Filter 2</div>
                        <div>Filter 3</div>
                    </Radio>
                </SectionAccordion>
            </section>

            <section className="section-grey">
                <h2>SectionAccordion</h2>
                <div className="stories-accordions">
                <SectionAccordion
                    Action={actionButton}
                    color="grey"
                    icon="share-specific"
                    title="Title 01"
                    opened={true}
                    onClose={()=>console.log('onClose')}
                    onOpen={()=>console.log('onOpen')}
                >
                    <br/>
                    <Radio
                        active={val}
                        onChange={(i: any)=>{
                            setVal(i.index);
                            console.log(i.index);
                        }}
                    >
                        <div>Filter 1</div>
                        <div>Filter 2</div>
                        <div>Filter 3</div>
                    </Radio>
                </SectionAccordion>
                <SectionAccordion
                    Action={actionButton}
                    color="grey"
                    icon="share-specific"
                    title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    opened={opened}
                    onOpen={()=>setOpened(true)}
                >
                    <p>body</p>
                    <p>body</p>
                    <p>body</p>
                    <p>body</p>
                    <p>body</p>
                    <p>body</p>
                    <p>body</p>
                    <p>body</p>
                    <p>body</p>
                    <p>body</p>
                </SectionAccordion>
                </div>
            </section>

            <section>
                <h2>SectionAccordion</h2>
                <SectionAccordion
                    icon="share-specific"
                    title="Title 01"
                    opened={opened01}
                    onClose={()=>setOpened01(false)}
                    onOpen={()=>setOpened01(true)}
                >
                    <p>body</p>
                    <p>body</p>
                    <p>body</p>
                    <p>body</p>
                    <p>body</p>
                    <p>body</p>
                    <p>body</p>
                    <p>body</p>
                    <p>body</p>
                    <p>body</p>
                    <p>body</p>
                    <p>body</p>
                    <p>body</p>
                    <p>body</p>
                    <p>body</p>
                    <p>body</p>
                    <p>body</p>
                    <p>body</p>
                    <p>body</p>
                    <p>body</p>
                    <p>body</p>
                    <p>body</p>
                </SectionAccordion>
                <SectionAccordion
                    icon="share-specific"
                    title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    opened={opened02}
                    onClose={()=>setOpened02(false)}
                    onOpen={()=>setOpened02(true)}
                >
                    <p>body</p>
                    <p>body</p>
                    <p>body</p>
                    <p>body</p>
                    <p>body</p>
                    <p>body</p>
                    <p>body</p>
                    <p>body</p>
                    <p>body</p>
                    <p>body</p>
                    <p>body</p>
                    <p>body</p>
                    <p>body</p>
                    <p>body</p>
                    <p>body</p>
                    <p>body</p>
                    <p>body</p>
                    <p>body</p>
                    <p>body</p>
                    <p>body</p>
                    <p>body</p>
                    <p>body</p>
                </SectionAccordion>

            </section>

        </div>
    );
};

storiesOf('Animations', module)
    .add('SectionAccordion', () => <Story/>);
