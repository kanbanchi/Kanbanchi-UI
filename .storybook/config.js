import { configure } from '@storybook/react';

function loadStories() {
    require('../src/ui/stories/index.js');
}

configure(loadStories, module);