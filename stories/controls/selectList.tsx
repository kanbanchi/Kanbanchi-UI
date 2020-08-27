import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { SelectList, SelectListItem, Checkbox, Userpic } from '../../src/ui';

const Story = () => {
    const [val01, setVal01] = React.useState(false);
    const [val02, setVal02] = React.useState(false);
    const [val03, setVal03] = React.useState(false);

    return (
        <div className="page">
            <section className="section-form-min">
                <h2>SelectList</h2>

                <SelectList fixActive={false}>
                    <li>
                        Copy card
                    </li>
                    <li className="divider">
                        Print card
                    </li>
                    <li className="divider someClass">
                        Get link to card
                    </li>
                    <li className="disabled">
                        Delete card
                    </li>
                </SelectList>

                <br/><br/>

                <h2>iconSize 24</h2>

                <SelectList fixActive={false}>
                    <SelectListItem
                        icon={'copy'}
                        iconSize={24}
                    >
                        Copy card
                    </SelectListItem>
                    <SelectListItem
                        className="divider"
                        icon={'print'}
                        iconSize={24}
                    >
                        Print card
                    </SelectListItem>
                    <SelectListItem
                        className="divider someClass"
                        icon={'link'}
                        iconSize={24}
                    >
                        Get link to card
                    </SelectListItem>
                    <SelectListItem
                        icon={'delete'}
                        iconSize={24}
                    >
                        Delete card
                    </SelectListItem>
                </SelectList>

                <br/><br/>

                Check empty SelectList: <SelectList></SelectList>

                <br/>

                Check empty SelectListItem: <SelectListItem></SelectListItem>

            </section>

            <section className="section-form-min">
                <h2>SelectListItem</h2>

                <SelectList>
                    <Checkbox
                        checked={val01}
                        color="light"
                        onChange={()=>setVal01(!val01)}
                    >
                        <SelectListItem value="1" icon="tag">
                            Tag01
                        </SelectListItem>
                    </Checkbox>
                    <Checkbox
                        checked={val02}
                        color="light"
                        onChange={()=>setVal02(!val02)}
                    >
                        <SelectListItem value="2" icon="tag">
                            Tag02
                        </SelectListItem>
                    </Checkbox>
                    <Checkbox
                        checked={val03}
                        color="light"
                        onChange={()=>setVal03(!val03)}
                    >
                        <SelectListItem value="3" icon="tag">
                            Tag03
                        </SelectListItem>
                    </Checkbox>
                </SelectList>

            </section>

            <section className="section-form-min">
                <h2>SelectListItem with Userpic</h2>

                <SelectList>
                    <Checkbox
                        checked={val01}
                        color="light"
                        onChange={()=>setVal01(!val01)}
                    >
                        <SelectListItem value="1">
                            <Userpic
                                size={24}
                                src="https://cdn.pixabay.com/photo/2016/08/20/05/38/avatar-1606916_960_720.png"
                            />
                            User01
                        </SelectListItem>
                    </Checkbox>
                    <Checkbox
                        checked={val02}
                        color="light"
                        onChange={()=>setVal02(!val02)}
                    >
                        <SelectListItem value="2" icon="tag">
                            <Userpic
                                size={24}
                                src="https://cdn.pixabay.com/photo/2016/08/20/05/38/avatar-1606916_960_720.png"
                            />
                            User02
                        </SelectListItem>
                    </Checkbox>
                    <Checkbox
                        checked={val03}
                        color="light"
                        onChange={()=>setVal03(!val03)}
                    >
                        <SelectListItem value="3" icon="tag">
                            <Userpic
                                size={24}
                                src="https://cdn.pixabay.com/photo/2016/08/20/05/38/avatar-1606916_960_720.png"
                            />
                            User03
                        </SelectListItem>
                    </Checkbox>
                </SelectList>

            </section>

            <section>
                <h2>Divider</h2>

                {`<li className="divider">`} adds {`<Divider/>`} after li
            </section>

            <section>
                <h2>Disabled</h2>

                {`<li className="disabled">`}
            </section>
        </div>
    );
};

storiesOf('Controls', module)
    .add('SelectList', () => <Story/>);
