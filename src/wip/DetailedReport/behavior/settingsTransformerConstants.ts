export const productivityDetailedDefault = {
    hAxis: {
        title: 'Date',
        slantedText: true,
        slantedTextAngle: -45,
        textStyle: {
            fontSize: 12,
            color: 'rgb(38, 45, 56)'
        },
        titleTextStyle: {
            fontSize: 15,
            bold: false,
            italic: false,
            color: 'rgb(38, 45, 56)'
        },
        format: 'dd MMM YYYY',
    },
    vAxis: {
        title: 'Cards',
        format: '#',
        viewWindow: {
            min: 0
        },
        titleTextStyle: {
            bold: false,
            italic: false,
            color: 'rgb(38, 45, 56)'
        },
        textStyle: {
            fontSize: 12,
            color: 'rgb(38, 45, 56)'
        },
    },
    crosshair: {
        trigger: 'both',
        orientation: 'vertical'
    },
    tooltip: {
        isHtml: true
    },
    legend: 'none',
    pointShape: {
        type: 'circle',
    },
    pointSize: 0,
    chartArea: {
        left: 70,
        top: 45,
        right: 124,
        bottom: 86,
    }
};
