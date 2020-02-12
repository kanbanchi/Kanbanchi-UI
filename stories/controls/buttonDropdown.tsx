import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Button, ButtonDropdown, ButtonsGroup, SelectList, SelectListItem, Checkbox, Icon } from '../../src/ui';

const Story = () => {
    const onClickHandler = (e: any) => console.log(e.target.innerText);
    const [val01, setVal01] = React.useState(false);
    const [val02, setVal02] = React.useState(false);

    return (
        <div className="page">
            <section>
                <div className="section-relative">
                    <h2>ButtonDropdown</h2>

                    <ButtonsGroup size="large" className="section-form-min" style={{justifyContent: 'space-between'}}>
                        <ButtonDropdown>
                            <Button variant="add">
                                Add smth
                            </Button>
                            <SelectList fixActive={false}>
                                <SelectListItem
                                    icon="card"
                                    list="List Ut enim ad minim veniam!"
                                >
                                    Card Lorem ipsum dolor sit amet?
                                </SelectListItem>
                                <SelectListItem
                                    icon="archive"
                                    list="List"
                                >
                                    Card name
                                </SelectListItem>
                            </SelectList>
                        </ButtonDropdown>

                        <ButtonDropdown directionHorizontal="right">
                            <Button variant="action">
                                Actions Right
                            </Button>
                            <SelectList fixActive={false}>
                                <li onClick={onClickHandler}>
                                    Copy card
                                </li>
                                <li className="divider" onClick={onClickHandler}>
                                    Print card
                                </li>
                                <li className="divider" onClick={onClickHandler}>
                                    Get link to card
                                </li>
                                <li className="disabled" onClick={onClickHandler}>
                                    Delete card
                                </li>
                            </SelectList>
                        </ButtonDropdown>
                    </ButtonsGroup>
                </div>
            </section>

            <section className="section-portal">
                <div className="section-relative">
                    <h2>Dropdown in Portal</h2>

                    <ButtonsGroup size="large" className="section-form-min" style={{justifyContent: 'space-between'}}>
                        <ButtonDropdown
                            dropdownClassName={'section-portal-dropdown'}
                            portal
                            portalId={'section-portal'}
                            portalSelector={'.section-portal'}
                            onOpen={()=>console.log('opened')}
                            onClose={()=>console.log('closed')}
                        >
                            <Button variant="icon">
                                <Icon size={24} xlink={'dots'} />
                            </Button>
                            <SelectList fixActive={false}>
                                <SelectListItem
                                    icon="card"
                                    list="List Ut enim ad minim veniam!"
                                    onClick={()=>console.log('Card 01')}
                                >
                                    Card 01 Lorem ipsum dolor sit amet?
                                </SelectListItem>
                                <SelectListItem
                                    icon="archive"
                                    list="List"
                                    onClick={()=>console.log('Card 02')}
                                >
                                    Card 02
                                </SelectListItem>
                            </SelectList>
                        </ButtonDropdown>

                        <ButtonDropdown
                            directionHorizontal={'right'}
                            portal
                        >
                            <Button variant="icon">
                                <Icon size={24} xlink={'dots'} />
                            </Button>
                            <SelectList fixActive={false}>
                                <SelectListItem
                                    icon="card"
                                    list="List Ut enim ad minim veniam!"
                                >
                                    Card Lorem ipsum dolor sit amet?
                                </SelectListItem>
                                <SelectListItem
                                    icon="archive"
                                    list="List"
                                >
                                    Card name
                                </SelectListItem>
                            </SelectList>
                        </ButtonDropdown>
                    </ButtonsGroup>
                </div>
            </section>

            <section className="section-form-min">
                <h2>Checkboxes</h2>

                <ButtonDropdown
                    className="stories-dropdown-100"
                    multiple={true}
                    opened={true}
                >
                    <Button variant="add">
                        Add smth
                    </Button>
                    <SelectList fixActive={false}>
                        <Checkbox
                            color={'light'}
                            checked={val01}
                            onChange={()=>setVal01(!val01)}
                        >
                            Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </Checkbox>
                        <Checkbox
                            color={'light'}
                            checked={val02}
                            onChange={()=>setVal02(!val02)}
                        >
                            Check 02
                        </Checkbox><Checkbox
                            color={'light'}
                            checked={val01}
                            onChange={()=>setVal01(!val01)}
                        >
                            Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </Checkbox>
                        <Checkbox
                            color={'light'}
                            checked={val02}
                            onChange={()=>setVal02(!val02)}
                        >
                            Check 02
                        </Checkbox><Checkbox
                            color={'light'}
                            checked={val01}
                            onChange={()=>setVal01(!val01)}
                        >
                            Lorem ipsum dolor sit amet, <b>consectetur adipiscing elit</b>, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </Checkbox>
                        <Checkbox
                            color={'light'}
                            checked={val02}
                            onChange={()=>setVal02(!val02)}
                        >
                            Check 02
                        </Checkbox>
                    </SelectList>
                </ButtonDropdown>
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

                Check empty ButtonDropdown: <ButtonDropdown></ButtonDropdown>
            </section>
        </div>
    );
};

storiesOf('Controls', module)
    .add('ButtonDropdown', () => <Story/>);
