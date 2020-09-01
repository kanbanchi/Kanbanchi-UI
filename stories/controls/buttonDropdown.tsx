import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Button, ButtonDropdown, ButtonsGroup, SelectList, SelectListItem, Checkbox, Icon, Divider } from '../../src/ui';

const Story = () => {
    const onClickHandler = (e: any) => console.log(e.target.innerText);
    const [val01, setVal01] = React.useState(false);
    const [val02, setVal02] = React.useState(false);
    const [isActive, setActive] = React.useState(false);
    const [isDisabled, setDisabled] = React.useState(false);
    const timer = React.useRef(null);

    const onMouseEnterHandler = () => {
        if (timer.current) {
            clearTimeout(timer.current);
        }
        timer.current = setTimeout(() => {
            console.log('on');
            setActive(true);
            timer.current = null;

            setDisabled(true);
            setTimeout(() => {
                setDisabled(false);
            }, 500);
        }, 200);
    };

    const onMouseLeaveHandler = () => {
        if (timer.current) {
            clearTimeout(timer.current);
        }
        timer.current = setTimeout(() => {
            console.log('off');
            setActive(false);
            timer.current = null;
        }, 200);
    };

    return (
        <div className="page">
            <section>
                <div className="section-relative">
                    <h2>ButtonDropdown</h2>

                    <ButtonsGroup size="large" className="section-form-min" style={{justifyContent: 'space-between'}}>
                        <ButtonDropdown
                            onClose={()=>console.log('onClose')}
                            onOpen={()=>console.log('onOpen')}
                        >
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
                                <div>123</div>
                                <Divider />
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

            <section className="section-relative section-grey section-portal">
                <h2>Dropdown in Portal</h2>

                <ButtonsGroup size="large" className="section-form-min" style={{justifyContent: 'space-between'}}>
                    <ButtonDropdown
                        dropdownClassName={'section-portal-dropdown'}
                        isMountClosed={false}
                        portal
                        portalId={'stories-portal'}
                        portalSelector={'.section-portal'}
                        onOpen={()=>console.log('opened')}
                        onClose={()=>console.log('closed')}
                    >
                        <Button variant="icon">
                            <Icon size={24} xlink={'more'} />
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
                        directionVertical={'up'}
                        isMountClosed={false}
                        portal
                    >
                        <Button variant="icon">
                            <Icon size={24} xlink={'more'} />
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
            </section>

            <section className="section-form-min">
                <h2>Checkboxes</h2>

                <ButtonDropdown
                    className="stories-dropdown-100"
                    disabled={isDisabled}
                    multiple={true}
                >
                    <Button variant="add">
                        Add smth
                    </Button>
                    <SelectList fixActive={false}
                    >
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
            </section>

            <section className="section-form-min">
                <h2>Checkboxes + hover</h2>

                <ButtonDropdown
                    className="stories-dropdown-100"
                    disabled={isDisabled}
                    multiple={true}
                    opened={isActive}
                    onMouseEnter={onMouseEnterHandler}
                    onMouseLeave={onMouseLeaveHandler}
                >
                    <Button variant="add">
                        Add smth
                    </Button>
                    <SelectList fixActive={false}
                        onMouseEnter={onMouseEnterHandler}
                        onMouseLeave={onMouseLeaveHandler}
                    >
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
