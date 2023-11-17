import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { LoaderBlock, Search, SelectList, SelectListItem } from '../../src/ui';

const Story = () => {
    const [loading, setLoading] = React.useState(false);
    const [timeoutHook, setTimeoutHook] = React.useState(null);
    const [listWithLoader, setListWithLoader] = React.useState([]);

    React.useEffect(() => {
        return () => {
            clearTimeout(timeoutHook);
        };
    }, [timeoutHook]);

    const loadList = (success = true) => {
        let val = [];
        setLoading(true);
        clearTimeout(timeoutHook);
        setTimeoutHook(setTimeout(() => {
            if (success) {
                val.push(<SelectListItem
                    key="0"
                    icon="card"
                    list="List Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                >
                    Card Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </SelectListItem>);
                val.push(<SelectListItem
                    key="1"
                    icon="archive"
                    list="List"
                >
                    Card name
                </SelectListItem>);
                val.push(<SelectListItem
                    key="2"
                    icon="card"
                    list="List Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                >
                    Card Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </SelectListItem>);
                val.push(<SelectListItem
                    key="3"
                    icon="archive"
                    list="List"
                >
                    Card name
                </SelectListItem>);
            } else {
                val.push(<SelectListItem >
                    ¯\_(ツ)_/¯
                </SelectListItem>);
            }
            setLoading(false);
            setListWithLoader(val);
        }, 3000));
    };

    return (
        <div className="page scroll-visible">

            <section className="section-form-min">
                <div className="section-relative">
                    <h2>Search</h2>
                    <Search
                    isDropdownUplifted
                        searchPlaceholder={'Custom placeholder'}
                        onChange={(i: any)=>console.log(i.item)}
                        onOpen={()=>loadList()}
                    >
                        <SelectList fixActive={false} loading={loading}>
                            {listWithLoader}
                            <LoaderBlock
                                style={{
                                    width: '100%',
                                    height: '100%'
                                }}
                            />
                        </SelectList>
                    </Search>
                </div>
            </section>

            <section className="section-grey">
                <div className="section-relative">
                    <h2>Search</h2>
                    <Search
                        isDropdownUplifted
                        isFitWindow
                        // label={'Label'}
                        color="grey"
                        onChange={(i: any)=>console.log(i.item)}
                    >
                        <SelectList fixActive={false}>
                            <SelectListItem
                                icon="card"
                                list="List Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                                value="id01"
                            >
                                Card Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </SelectListItem>
                            <SelectListItem
                                icon="archive"
                                list="List"
                                value="id02"
                            >
                                Card name
                            </SelectListItem>
                            <SelectListItem
                                icon="card"
                                list="List Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                                value="id01"
                            >
                                Card Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </SelectListItem>
                            <SelectListItem
                                icon="archive"
                                list="List"
                                value="id02"
                            >
                                Card name
                            </SelectListItem>
                            <SelectListItem
                                icon="card"
                                list="List Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                                value="id01"
                            >
                                Card Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </SelectListItem>
                            <SelectListItem
                                icon="archive"
                                list="List"
                                value="id02"
                            >
                                Card name
                            </SelectListItem>
                            <SelectListItem
                                icon="card"
                                list="List Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                                value="id01"
                            >
                                Card Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </SelectListItem>
                            <SelectListItem
                                icon="archive"
                                list="List"
                                value="id02"
                            >
                                Card name
                            </SelectListItem>
                            <SelectListItem
                                icon="card"
                                list="List Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                                value="id01"
                            >
                                Card Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </SelectListItem>
                            <SelectListItem
                                icon="archive"
                                list="List"
                                value="id02"
                            >
                                Card name
                            </SelectListItem>
                            <SelectListItem
                                icon="card"
                                list="List Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                                value="id01"
                            >
                                Card Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </SelectListItem>
                            <SelectListItem
                                icon="archive"
                                list="List"
                                value="id02"
                            >
                                Card name
                            </SelectListItem>
                        </SelectList>
                    </Search>
                </div>
            </section>

        </div>
    );
};

storiesOf('Controls', module)
    .add('Search', () => <Story/>);
