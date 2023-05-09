import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Userpic } from '../../src/ui';

const Story = () => {
    return (
        <div className="page">
            <section>
                <h2>Userpic</h2>

                16px <Userpic
                    size={16}
                    src="https://cdn.pixabay.com/photo/2016/08/20/05/38/avatar-1606916_960_720.png"
                    tooltip="User Name"
                />

                <br /><br />

                24px <Userpic
                    size={24}
                    src="https://cdn.pixabay.com/photo/2016/08/20/05/38/avatar-1606916_960_720.png"
                    tooltip="User Name"
                />

                <br /><br />

                32px <Userpic
                    size={32}
                    src=""
                    tooltip="User Name"
                />

                <br /><br />

                40px <Userpic
                    size={40}
                    src=""
                    tooltip="User Name"
                />

            </section>

            <section>
                <h2>Collaborators</h2>

                <Userpic
                    background="#64ffda"
                    size={24}
                    src="https://cdn.pixabay.com/photo/2016/08/20/05/38/avatar-1606916_960_720.png"
                    tooltip={{
                        direction: 'down-right',
                        value: 'User Name'
                    }}
                />

                &nbsp;

                <Userpic
                    background="#2196f3"
                    size={24}
                    src=""
                    tooltip={{
                        direction: 'down-right',
                        value: 'User Name'
                    }}
                />

            </section>

            <section className="section-black">
                <h2>Collaborators</h2>

                <Userpic
                    background="#64ffda"
                    size={40}
                    src="https://cdn.pixabay.com/photo/2016/08/20/05/38/avatar-1606916_960_720.png"
                    tooltip={{
                        direction: 'down-right',
                        value: 'User Name'
                    }}
                />

                &nbsp;

                <Userpic
                    background="#2196f3"
                    size={32}
                    src="https://cdn.pixabay.com/photo/2019/05/19/12/45/woman-4214001_960_720.jpg"
                    tooltip={{
                        direction: 'down-right',
                        value: 'User Name'
                    }}
                />

            </section>
        </div>
    );
};

storiesOf('Stuff', module)
    .add('Userpic', () => <Story/>);
