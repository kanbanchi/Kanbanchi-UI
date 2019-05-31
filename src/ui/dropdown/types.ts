export type IDropdownDirectionVertical =
    'auto'
    | 'down'
    | 'up';

export interface IDropdownPublicProps {
    directionVertical?: IDropdownDirectionVertical;
    directionHorizontal?: 'left' | 'right';
    opened?: boolean;
}

export interface IDropdownProps extends
    IDropdownPublicProps
{
    ref?: any;
}
