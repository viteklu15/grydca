var data = ['2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016'];
$(function() {
    $("#chart").shieldChart({
        theme: "dark",
        exportOptions: {
            image: false,
            print: false

        },
        axisX: {
            categoricalValues: data,
            axisTickText: {
                style: {
                    color: "#FFFFFF"
                }
            },
        },
        axisY: {
            axisTickText: {
                format: "{text:c}",
                style: {
                    color: "#FFFFFF"
                }
            },
            title: {
                text: "Цена (EUR в kWh)",
                style: {
                    color: "#FFFFFF"
                }
            }
        },
        tooltipSettings: {
            chartBound: true
        },
        seriesSettings: {
            line: {
                enablePointSelection: true,
                pointMark: {
                    activeSettings: {
                        pointSelectedState: {
                            drawWidth: 4,
                            drawRadius: 4
                        }
                    }
                }
            }
        },
        primaryHeader: {
            text: "Цены на электроэнергию",
            // style: {
            // color: "#FFFFFF"
            // }
        },
        dataSeries: [{
            seriesType: 'line',
            collectionAlias: 'Домохозяйства',
            data: [0.164, 0.173, 0.184, 0.167, 0.177, 0.189, 0.180, 0.183, 0.188, 0.160, 0.176, 0.178],
            // color: "#FFFF00"  // цыкт графика
        }, {
            seriesType: 'line',
            collectionAlias: 'Промышленность',
            data: [0.103, 0.105, 0.112, 0.111, 0.102, 0.099, 0.110, 0.113, 0.117, 0.119, 0.123, 0.117]
        }]
    });
});