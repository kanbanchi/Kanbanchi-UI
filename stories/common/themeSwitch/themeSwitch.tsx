import { Switch } from '../../../index';
import * as React from 'react';

export const ThemeSwitch = () => {
    const [isDarkTheme, setDarkTheme] = React.useState(false);

    const onChange = () => {
        setDarkTheme(!isDarkTheme);
    };

    React.useEffect(() => {
        if (isDarkTheme) {
            document.documentElement.classList.add('dark-theme');
            document.documentElement.classList.remove('light-theme');
        } else {
            document.documentElement.classList.add('light-theme');
            document.documentElement.classList.remove('dark-theme');
        }
    }, [isDarkTheme]);

    return <section style={{width: '200px'}}>
        <Switch checked={isDarkTheme} onChange={onChange}>Dark Theme</Switch>
    </section>;
}
