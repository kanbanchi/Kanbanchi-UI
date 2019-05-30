export interface ITabsStateProps {
    active: number;
}

export interface ITabsDispatchProps {
    onChange: (index: number) => void;
}

export interface ITabsProps extends
    ITabsStateProps,
    ITabsDispatchProps 
{
    size?: 'large';
}
