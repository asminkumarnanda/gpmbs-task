$(window).on("load", function () {
    "use strict";
    var flatPicker = $(".flat-picker"),
        lineChartEx = $(".line-chart-ex");

    var cashIndata = [];
    var cashOutdata = [];
    function cashLedgerData(dateStart,dateEnd) {
        $.ajaxSetup({
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            },
        });
        $.ajax({
            url: "cash-in-out/",
            type: "GET",
            data:'startdate='+dateStart+'&enddate='+ dateEnd,
            success: function (data) {
                cashIndata = data[0];
                cashOutdata = data[1];
                cashInOutdata(cashIndata, cashOutdata);
            },
        });
    }
    //Date Filter
    $(".flat-picker").flatpickr({
        mode: "range",
        altInput: true,
        altFormat: "d/m/Y",
        dateFormat: "d/m/Y",
        defaultDate: [
            new Date().setMonth(new Date().getMonth() - 1),
            new Date(),
        ],
        onReady: function (selectedDates, dateStr, instance) {
            var dateStart = instance.formatDate(selectedDates[0], "Y-m-d");
            var dateEnd = instance.formatDate(selectedDates[1], "Y-m-d");
            cashLedgerData(dateStart,dateEnd);
        },
        onClose: function (selectedDates, dateStr, instance) {
            var dateStart = instance.formatDate(selectedDates[0], "Y-m-d");
            var dateEnd = instance.formatDate(selectedDates[1], "Y-m-d");
            cashLedgerData(dateStart,dateEnd);
        },
    });

    // Line Chart
    // --------------------------------------------------------------------

    var primaryColorShade = "#836AF9",
        yellowColor = "#ffe800",
        successColorShade = "#28dac6",
        warningColorShade = "#ffe802",
        warningLightColor = "#FDAC34",
        infoColorShade = "#299AFF",
        greyColor = "#4F5D70",
        blueColor = "#2c9aff",
        blueLightColor = "#84D0FF",
        greyLightColor = "#EDF1F4",
        tooltipShadow = "rgba(0, 0, 0, 0.25)",
        lineChartPrimary = "#008000",
        lineChartDanger = "#ff4961",
        labelColor = "#6e6b7b",
        grid_line_color = "#a0a0a0"; // RGBA color helps in dark layout

    function cashInOutdata(cashIndata, cashOutdata) {
        if (lineChartEx.length) {
            var lineExample = new Chart(lineChartEx, {
                type: "line",
                plugins: [
                    // to add spacing between legends and chart
                    {
                        beforeInit: function (chart) {
                            chart.legend.afterFit = function () {
                                this.height += 20;
                            };
                        },
                    },
                ],
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    backgroundColor: false,
                    hover: {
                        mode: "label",
                    },
                    tooltips: {
                        // Updated default tooltip UI
                        shadowOffsetX: 1,
                        shadowOffsetY: 1,
                        shadowBlur: 8,
                        shadowColor: tooltipShadow,
                        backgroundColor: window.colors.solid.white,
                        titleFontColor: window.colors.solid.black,
                        bodyFontColor: window.colors.solid.black,
                    },
                    layout: {
                        padding: {
                            top: -15,
                            bottom: -25,
                            left: -15,
                        },
                    },
                    scales: {
                        xAxes: [
                            {
                                display: true,
                                scaleLabel: {
                                    display: true,
                                },
                                gridLines: {
                                    display: true,
                                    color: grid_line_color,
                                    zeroLineColor: grid_line_color,
                                },
                                ticks: {
                                    fontColor: labelColor,
                                },
                            },
                        ],
                        yAxes: [
                            {
                                display: true,
                                scaleLabel: {
                                    display: true,
                                },
                                ticks: {
                                    stepSize: 5000,
                                    min: 0,
                                    max: 50000,
                                    fontColor: labelColor,
                                },
                                gridLines: {
                                    display: true,
                                    color: grid_line_color,
                                    zeroLineColor: grid_line_color,
                                },
                            },
                        ],
                    },
                    legend: {
                        position: "top",
                        align: "start",
                        labels: {
                            usePointStyle: true,
                            padding: 25,
                            boxWidth: 9,
                        },
                    },
                },
                data: {
                    labels: [
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "May",
                        "Jun",
                        "July",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec",
                    ],
                    datasets: [
                        {
                            data: cashOutdata,
                            label: "Cash Out",
                            borderColor: lineChartDanger,
                            lineTension: 0.5,
                            pointStyle: "circle",
                            backgroundColor: lineChartDanger,
                            fill: false,
                            pointRadius: 1,
                            pointHoverRadius: 5,
                            pointHoverBorderWidth: 5,
                            pointBorderColor: "transparent",
                            pointHoverBorderColor: window.colors.solid.white,
                            pointHoverBackgroundColor: lineChartDanger,
                            pointShadowOffsetX: 1,
                            pointShadowOffsetY: 1,
                            pointShadowBlur: 5,
                            pointShadowColor: tooltipShadow,
                        },
                        {
                            data: cashIndata,
                            label: "Cash In",
                            borderColor: lineChartPrimary,
                            lineTension: 0.5,
                            pointStyle: "circle",
                            backgroundColor: lineChartPrimary,
                            fill: false,
                            pointRadius: 1,
                            pointHoverRadius: 5,
                            pointHoverBorderWidth: 5,
                            pointBorderColor: "transparent",
                            pointHoverBorderColor: window.colors.solid.white,
                            pointHoverBackgroundColor: lineChartPrimary,
                            pointShadowOffsetX: 1,
                            pointShadowOffsetY: 1,
                            pointShadowBlur: 5,
                            pointShadowColor: tooltipShadow,
                        },
                    ],
                },
            });
        }
    }
});
