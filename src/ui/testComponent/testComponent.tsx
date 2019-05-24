import * as React from 'react';
import { ITestComponentProps } from './types';
import { ButtonsGroup } from '../../ui';

export const TestComponent: React.SFC<ITestComponentProps> = 
    (props) => {
        return (
            <div
                className="test-component"
                onClick={props.doWork}
            >
                <ButtonsGroup size="large">
                    <div>
                        {props.isBlack ? 'Black' : 'White'}
                    </div>
                </ButtonsGroup>
            </div>
        );
    }

TestComponent.defaultProps = {
    isBlack: false,
    doWork: () => undefined
}

TestComponent.displayName = 'TestComponent';
