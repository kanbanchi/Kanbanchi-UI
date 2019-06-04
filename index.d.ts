import {IButtonProps} from './src/ui/button/types';
import {IButtonDropdownProps} from './src/ui/buttonDropdown/types';
import {IButtonsGroupProps} from './src/ui/buttonsGroup/types';
import {IButtonsSegmentedProps} from './src/ui/buttonsSegmented/types';

import {ICheckboxProps} from './src/ui/checkbox/types';

import {IDatepickerProps} from './src/ui/datepicker/types';
import {IDividerProps} from './src/ui/divider/types';
import {IDropdownProps} from './src/ui/dropdown/types';

import {IIconProps} from './src/ui/icon/types';
import {IInputProps} from './src/ui/input/types';

import {ILabelProps} from './src/ui/label/types';
import {ILoaderProps} from './src/ui/loader/types';
import {ILoaderBlockProps} from './src/ui/loaderBlock/types';

import {IRadioProps} from './src/ui/radio/types';

import {ISearchProps} from './src/ui/search/types';
import {ISelectProps} from './src/ui/select/types';
import {ISelectListProps} from './src/ui/selectList/types';
import {ISelectListItemProps} from './src/ui/selectListItem/types';
import {ISnackbarProps} from './src/ui/snackbar/types';
import {ISwitchProps} from './src/ui/switch/types';

import {ITabsProps} from './src/ui/tabs/types';
import {ITooltipInheritedProps} from './src/ui/tooltip/types';

export declare const Button: React.SFC<IButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>>;
export declare const ButtonDropdown: React.SFC<IButtonDropdownProps & React.ButtonHTMLAttributes<HTMLButtonElement>>;
export declare const ButtonsGroup: React.SFC<IButtonsGroupProps & React.HTMLAttributes<HTMLElement>>;
export declare const ButtonsSegmented: React.SFC<IButtonsSegmentedProps & React.HTMLAttributes<HTMLElement>>;

export declare const Checkbox: React.SFC<ICheckboxProps & React.InputHTMLAttributes<HTMLElement>>;

export declare const Datepicker: React.SFC<IDatepickerProps & React.HTMLAttributes<HTMLElement>>;
export declare const Divider: React.SFC<IDividerProps & React.HTMLAttributes<HTMLElement>>;
export declare const Dropdown: React.SFC<IDropdownProps & React.HTMLAttributes<HTMLElement>>;

export declare const Icon: React.SFC<IIconProps & React.ImgHTMLAttributes<HTMLImageElement>>;
export declare const Input: React.SFC<IInputProps & React.InputHTMLAttributes<HTMLElement>>;

export declare const Label: React.SFC<ILabelProps & React.LabelHTMLAttributes<HTMLElement>>;
export declare const Loader: React.SFC<ILoaderProps & React.HTMLAttributes<HTMLElement>>;
export declare const LoaderBlock: React.SFC<ILoaderBlockProps & React.HTMLAttributes<HTMLElement>>;

export declare const Radio: React.SFC<IRadioProps & React.HTMLAttributes<HTMLElement>>;

export declare const ISearchProps: React.SFC<ISearchProps & React.HTMLAttributes<HTMLElement>>;
export declare const ISelectProps: React.SFC<ISelectProps & React.HTMLAttributes<HTMLElement>>;
export declare const ISelectListProps: React.SFC<ISelectListProps & React.HTMLAttributes<HTMLElement>>;
export declare const ISelectListItemProps: React.SFC<ISelectListItemProps & React.HTMLAttributes<HTMLElement>>;
export declare const ISnackbarProps: React.SFC<ISnackbarProps & React.HTMLAttributes<HTMLElement>>;
export declare const ISwitchProps: React.SFC<ISwitchProps & React.InputHTMLAttributes<HTMLElement>>;

export declare const ITabsProps: React.SFC<ITabsProps & React.HTMLAttributes<HTMLElement>>;
export declare const Tooltip: React.SFC<ITooltipInheritedProps>;
