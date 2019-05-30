import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Button, ButtonDropdown, ButtonsGroup, SelectList, SelectListItem } from '../../src/ui';

const Story = () => {
    const onClickHandler = (e: any) => console.log(e.target.innerText);

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
        </div>
    );
};

storiesOf('Controls', module)
    .add('ButtonDropdown', () => <Story/>);
