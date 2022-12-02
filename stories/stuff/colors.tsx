import * as React from 'react';
import { storiesOf } from '@storybook/react';

const Story = () => {
    return (
        <div className="page">
            <section className="section-form-min">
                <h2>New colors 2022-12-01</h2>

                <div className="stories-colors__item stories-colors__item--pastel-red">
                    pastel-red
                </div>
                <div className="stories-colors__item stories-colors__item--pastel-orange">
                    pastel-orange
                </div>
                <div className="stories-colors__item stories-colors__item--pastel-yellow">
                    pastel-yellow
                </div>
                <div className="stories-colors__item stories-colors__item--pastel-green">
                    pastel-green
                </div>
                <div className="stories-colors__item stories-colors__item--pastel-blue">
                    pastel-blue
                </div>
                <div className="stories-colors__item stories-colors__item--pastel-purple">
                    pastel-purple
                </div>
                <div className="stories-colors__item stories-colors__item--pastel-pink">
                    pastel-pink
                </div>
                <div className="stories-colors__item stories-colors__item--pastel-brown">
                    pastel-brown
                </div>
                <div className="stories-colors__item stories-colors__item--pastel-light-grey">
                    pastel-light-grey
                </div>
                <div className="stories-colors__item stories-colors__item--pastel-grey">
                    pastel-grey
                </div>

                <div className="stories-colors__item stories-colors__item--vivid-red">
                    vivid-red
                </div>
                <div className="stories-colors__item stories-colors__item--vivid-orange">
                    vivid-orange
                </div>
                <div className="stories-colors__item stories-colors__item--vivid-yellow">
                    vivid-yellow
                </div>
                <div className="stories-colors__item stories-colors__item--vivid-green">
                    vivid-green
                </div>
                <div className="stories-colors__item stories-colors__item--vivid-blue">
                    vivid-blue
                </div>
                <div className="stories-colors__item stories-colors__item--vivid-purple">
                    vivid-purple
                </div>
                <div className="stories-colors__item stories-colors__item--vivid-pink">
                    vivid-pink
                </div>
                <div className="stories-colors__item stories-colors__item--vivid-brown">
                    vivid-brown
                </div>
                <div className="stories-colors__item stories-colors__item--vivid-light-grey">
                    vivid-light-grey
                </div>
                <div className="stories-colors__item stories-colors__item--vivid-grey">
                    vivid-grey
                </div>
            </section>

            <section className="section-form-min">
                <h2>Old colors</h2>

                <div className="stories-colors__item stories-colors__item--red">
                red
                </div>
                <div className="stories-colors__item stories-colors__item--green">
                green
                </div>
                <div className="stories-colors__item stories-colors__item--blue">
                blue
                </div>
                <div className="stories-colors__item stories-colors__item--yellow">
                yellow
                </div>
                <div className="stories-colors__item stories-colors__item--orange">
                orange
                </div>
                <div className="stories-colors__item stories-colors__item--pink">
                pink
                </div>
                <div className="stories-colors__item stories-colors__item--purple">
                purple
                </div>
                <div className="stories-colors__item stories-colors__item--cyan">
                cyan
                </div>
                <div className="stories-colors__item stories-colors__item--sky">
                sky
                </div>
                <div className="stories-colors__item stories-colors__item--lime">
                lime
                </div>
                <div className="stories-colors__item stories-colors__item--black">
                black
                </div>
                <div className="stories-colors__item stories-colors__item--jazzberry-jam">
                jazzberry-jam
                </div>
                <div className="stories-colors__item stories-colors__item--swiss-coffee">
                swiss-coffee
                </div>
                <div className="stories-colors__item stories-colors__item--persimmon">
                persimmon
                </div>
                <div className="stories-colors__item stories-colors__item--paris-daisy">
                paris-daisy
                </div>
                <div className="stories-colors__item stories-colors__item--lawn-green">
                lawn-green
                </div>
                <div className="stories-colors__item stories-colors__item--spring-green">
                spring-green
                </div>
                <div className="stories-colors__item stories-colors__item--manz">
                manz
                </div>
                <div className="stories-colors__item stories-colors__item--lucky">
                lucky
                </div>
                <div className="stories-colors__item stories-colors__item--aqua">
                aqua
                </div>
                <div className="stories-colors__item stories-colors__item--aquamarine">
                aquamarine
                </div>
                <div className="stories-colors__item stories-colors__item--light-sky-blue">
                light-sky-blue
                </div>
                <div className="stories-colors__item stories-colors__item--neon-blue">
                neon-blue
                </div>
                <div className="stories-colors__item stories-colors__item--electric-purple">
                electric-purple
                </div>
                <div className="stories-colors__item stories-colors__item--bright-purple">
                bright-purple
                </div>
                <div className="stories-colors__item stories-colors__item--bismark">
                bismark
                </div>
                <div className="stories-colors__item stories-colors__item--indigo">
                indigo
                </div>
            </section>
        </div>
    );
};

storiesOf('Stuff', module)
    .add('Colors', () => <Story/>);
