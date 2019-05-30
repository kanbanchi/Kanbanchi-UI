import { IDropdownPublicProps } from './../dropdown/types';
import { IInputPublicProps } from './../input/types';
import { ISelectDispatchProps } from './../select/types';

export interface ISearchProps extends
    ISelectDispatchProps,
    IDropdownPublicProps,
    IInputPublicProps
{
    editable?: boolean;
}
