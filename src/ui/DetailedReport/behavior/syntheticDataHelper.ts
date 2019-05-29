import { IReportsUser } from '../appDomainTypes';
import { colors } from '../constants';
import * as moment from 'moment';
import { IProductivityReportNodeData } from '../types';

export const makeUser =
(
    name: string,
    id: string,
): IReportsUser => {
    return {
        userId: id,
        dashboardPermissionId: '4565172278525952-18228684554388175692',
        fullName: name,
        photoUrl: 'https://lh6.googleusercontent.com/-3F4wXPUsSHk/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcBbaTpbriIfrpcRMCWwYcOBjWNNA/mo/photo.jpg',
        role: 'owner',
        initials: 'KP',
        firstName: 'Kirill',
        lastName: 'Penkin',
        authUser: true,
        online: false,
        color: colors[getRandomInt(5)] || 'yellow',
        isSelected: true,
    }
}

export const getRandomInt = (
    max: number = 5,
    min: number = 0,
) => {
    return Math.floor(Math.random() * (+max - +min)) + +min;
}

export const plussRandomDays = (date: number) => {
    return moment(date).add('days', getRandomInt(5)).valueOf();
}

export const makeProductivityNodeData = (): IProductivityReportNodeData => {
    return {
        signifyData: {
            label: 'Done',
            value: getRandomInt(5),
        },
        asideData: [{
            label: 'Overdue',
            value: getRandomInt(5),
        }]
    }
}

