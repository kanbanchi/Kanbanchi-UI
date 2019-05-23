import * as React from 'react';
import { ITestComponentProps } from './types';

export const TestComponent: React.SFC<ITestComponentProps> = 
    (props) => {
        return (
            <div
                className="test-component"
                onClick={props.doWork}
            >
                {props.isBlack ? 'Black' : 'White'}
            </div>
        );
    }

TestComponent.defaultProps = {
    isBlack: false,
    doWork: () => undefined
}

TestComponent.displayName = 'TestComponent';
