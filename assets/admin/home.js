$(document).ready(function () {
    if ($('#btnexportdata').length) {
        $('#btnexportdata').on('click', function () {
            var url = BASE_URL + 'exportdata';
            window.open(url, '_blank');
        });
    }

    if ($('#monthlyusers').length) {
        var data = $('#monthlyusers').attr('data');
        var months = $('#monthlyusers').attr('months');
        var arr_months = months.split(',');
        var array = data.split(',');
        var barChartData = {
            labels: [arr_months[0], arr_months[1]],
            datasets: [{
                    label: 'Registered Users',
                    backgroundColor: window.chartColors.green,
                    data: [
                        array[0],
                        array[1]
                    ]
                }]
        };
        var ctx = document.getElementById("monthlyusers").getContext("2d");
        var monthlyusers = new Chart(ctx, {
            type: 'bar',
            data: barChartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                title: {
                    display: false
                },
                legend: {
                    display: false
                },
                tooltips: {
                    mode: 'index',
                    intersect: false
                },
                scales: {
                    xAxes: [{
                            stacked: true
                        }],
                    yAxes: [{
                            stacked: true
                        }]
                }
            }
        });
    }

    if ($('#monthlylikes').length) {
        var data = $('#monthlylikes').attr('data');
        var months = $('#monthlylikes').attr('months');
        var arr_months = months.split(',');
        var array = data.split(',');
        var barChartData = {
            labels: [arr_months[0], arr_months[1]],
            datasets: [{
                    label: 'Likes',
                    backgroundColor: window.chartColors.green,
                    data: [
                        array[0],
                        array[1]
                    ]
                }]
        };
        var ctx = document.getElementById("monthlylikes").getContext("2d");
        var monthlyusers = new Chart(ctx, {
            type: 'bar',
            data: barChartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                title: {
                    display: false
                },
                legend: {
                    display: false
                },
                tooltips: {
                    mode: 'index',
                    intersect: false
                },
                scales: {
                    xAxes: [{
                            stacked: true
                        }],
                    yAxes: [{
                            stacked: true
                        }]
                }
            }
        });
    }

    if ($('#monthlydislikes').length) {
        var data = $('#monthlydislikes').attr('data');
        var months = $('#monthlydislikes').attr('months');
        var arr_months = months.split(',');
        var array = data.split(',');
        var barChartData = {
            labels: [arr_months[0], arr_months[1]],
            datasets: [{
                    label: 'Dislikes',
                    backgroundColor: window.chartColors.green,
                    data: [
                        array[0],
                        array[1]
                    ]
                }]
        };
        var ctx = document.getElementById("monthlydislikes").getContext("2d");
        var monthlyusers = new Chart(ctx, {
            type: 'bar',
            data: barChartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                title: {
                    display: false
                },
                legend: {
                    display: false
                },
                tooltips: {
                    mode: 'index',
                    intersect: false
                },
                scales: {
                    xAxes: [{
                            stacked: true
                        }],
                    yAxes: [{
                            stacked: true
                        }]
                }
            }
        });
    }

    if ($('#monthlycomments').length) {
        var data = $('#monthlycomments').attr('data');
        var months = $('#monthlycomments').attr('months');
        var arr_months = months.split(',');
        var array = data.split(',');
        var barChartData = {
            labels: [arr_months[0], arr_months[1]],
            datasets: [{
                    label: 'Comments',
                    backgroundColor: window.chartColors.green,
                    data: [
                        array[0],
                        array[1]
                    ]
                }]
        };
        var ctx = document.getElementById("monthlycomments").getContext("2d");
        var monthlyusers = new Chart(ctx, {
            type: 'bar',
            data: barChartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                title: {
                    display: false
                },
                legend: {
                    display: false
                },
                tooltips: {
                    mode: 'index',
                    intersect: false
                },
                scales: {
                    xAxes: [{
                            stacked: true
                        }],
                    yAxes: [{
                            stacked: true
                        }]
                }
            }
        });
    }

    if ($('#monthlycopies').length) {
        var data = $('#monthlycopies').attr('data');
        var months = $('#monthlycopies').attr('months');
        var arr_months = months.split(',');
        var array = data.split(',');
        var barChartData = {
            labels: [arr_months[0], arr_months[1]],
            datasets: [{
                    label: 'Copy',
                    backgroundColor: window.chartColors.green,
                    data: [
                        array[0],
                        array[1]
                    ]
                }]
        };
        var ctx = document.getElementById("monthlycopies").getContext("2d");
        var monthlyusers = new Chart(ctx, {
            type: 'bar',
            data: barChartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                title: {
                    display: false
                },
                legend: {
                    display: false
                },
                tooltips: {
                    mode: 'index',
                    intersect: false
                },
                scales: {
                    xAxes: [{
                            stacked: true
                        }],
                    yAxes: [{
                            stacked: true
                        }]
                }
            }
        });
    }

    if ($('#monthlypostdeleted').length) {
        var data = $('#monthlypostdeleted').attr('data');
        var months = $('#monthlypostdeleted').attr('months');
        var arr_months = months.split(',');
        var array = data.split(',');
        var barChartData = {
            labels: [arr_months[0], arr_months[1]],
            datasets: [{
                    label: 'Deleted',
                    backgroundColor: window.chartColors.green,
                    data: [
                        array[0],
                        array[1]
                    ]
                }]
        };
        var ctx = document.getElementById("monthlypostdeleted").getContext("2d");
        var monthlyusers = new Chart(ctx, {
            type: 'bar',
            data: barChartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                title: {
                    display: false
                },
                legend: {
                    display: false
                },
                tooltips: {
                    mode: 'index',
                    intersect: false
                },
                scales: {
                    xAxes: [{
                            stacked: true
                        }],
                    yAxes: [{
                            stacked: true
                        }]
                }
            }
        });
    }

    if ($('#monthlydownloads').length) {
        var data = $('#monthlydownloads').attr('data');
        var months = $('#monthlydownloads').attr('months');
        var arr_months = months.split(',');
        var array = data.split(',');
        var barChartData = {
            labels: [arr_months[0], arr_months[1]],
            datasets: [{
                    label: 'Downloads',
                    backgroundColor: window.chartColors.green,
                    data: [
                        array[0],
                        array[1]
                    ]
                }]
        };
        var ctx = document.getElementById("monthlydownloads").getContext("2d");
        var monthlyusers = new Chart(ctx, {
            type: 'bar',
            data: barChartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                title: {
                    display: false
                },
                legend: {
                    display: false
                },
                tooltips: {
                    mode: 'index',
                    intersect: false
                },
                scales: {
                    xAxes: [{
                            stacked: true
                        }],
                    yAxes: [{
                            stacked: true
                        }]
                }
            }
        });
    }

    if ($('#monthlyposttext').length) {
        var data = $('#monthlyposttext').attr('data');
        var months = $('#monthlyposttext').attr('months');
        var arr_months = months.split(',');
        var array = data.split(',');
        var barChartData = {
            labels: [arr_months[0], arr_months[1]],
            datasets: [{
                    label: 'Post Text',
                    backgroundColor: window.chartColors.green,
                    data: [
                        array[0],
                        array[1]
                    ]
                }]
        };
        var ctx = document.getElementById("monthlyposttext").getContext("2d");
        var monthlyusers = new Chart(ctx, {
            type: 'bar',
            data: barChartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                title: {
                    display: false
                },
                legend: {
                    display: false
                },
                tooltips: {
                    mode: 'index',
                    intersect: false
                },
                scales: {
                    xAxes: [{
                            stacked: true
                        }],
                    yAxes: [{
                            stacked: true
                        }]
                }
            }
        });
    }

    if ($('#monthlypostimage').length) {
        var data = $('#monthlypostimage').attr('data');
        var months = $('#monthlypostimage').attr('months');
        var arr_months = months.split(',');
        var array = data.split(',');
        var barChartData = {
            labels: [arr_months[0], arr_months[1]],
            datasets: [{
                    label: 'Post Image',
                    backgroundColor: window.chartColors.green,
                    data: [
                        array[0],
                        array[1]
                    ]
                }]
        };
        var ctx = document.getElementById("monthlypostimage").getContext("2d");
        var monthlyusers = new Chart(ctx, {
            type: 'bar',
            data: barChartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                title: {
                    display: false
                },
                legend: {
                    display: false
                },
                tooltips: {
                    mode: 'index',
                    intersect: false
                },
                scales: {
                    xAxes: [{
                            stacked: true
                        }],
                    yAxes: [{
                            stacked: true
                        }]
                }
            }
        });
    }

    if ($('#monthlypostgif').length) {
        var data = $('#monthlypostgif').attr('data');
        var months = $('#monthlypostgif').attr('months');
        var arr_months = months.split(',');
        var array = data.split(',');
        var barChartData = {
            labels: [arr_months[0], arr_months[1]],
            datasets: [{
                    label: 'Post Gif',
                    backgroundColor: window.chartColors.green,
                    data: [
                        array[0],
                        array[1]
                    ]
                }]
        };
        var ctx = document.getElementById("monthlypostgif").getContext("2d");
        var monthlyusers = new Chart(ctx, {
            type: 'bar',
            data: barChartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                title: {
                    display: false
                },
                legend: {
                    display: false
                },
                tooltips: {
                    mode: 'index',
                    intersect: false
                },
                scales: {
                    xAxes: [{
                            stacked: true
                        }],
                    yAxes: [{
                            stacked: true
                        }]
                }
            }
        });
    }

    if ($('#monthlypostvideo').length) {
        var data = $('#monthlypostvideo').attr('data');
        var months = $('#monthlypostvideo').attr('months');
        var arr_months = months.split(',');
        var array = data.split(',');
        var barChartData = {
            labels: [arr_months[0], arr_months[1]],
            datasets: [{
                    label: 'Post Video',
                    backgroundColor: window.chartColors.green,
                    data: [
                        array[0],
                        array[1]
                    ]
                }]
        };
        var ctx = document.getElementById("monthlypostvideo").getContext("2d");
        var monthlyusers = new Chart(ctx, {
            type: 'bar',
            data: barChartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                title: {
                    display: false
                },
                legend: {
                    display: false
                },
                tooltips: {
                    mode: 'index',
                    intersect: false
                },
                scales: {
                    xAxes: [{
                            stacked: true
                        }],
                    yAxes: [{
                            stacked: true
                        }]
                }
            }
        });
    }

    if ($('#monthlypostmessages').length) {
        var data = $('#monthlypostmessages').attr('data');
        var months = $('#monthlypostmessages').attr('months');
        var arr_months = months.split(',');
        var array = data.split(',');
        var barChartData = {
            labels: [arr_months[0], arr_months[1]],
            datasets: [{
                    label: 'Messages',
                    backgroundColor: window.chartColors.green,
                    data: [
                        array[0],
                        array[1]
                    ]
                }]
        };
        var ctx = document.getElementById("monthlypostmessages").getContext("2d");
        var monthlyusers = new Chart(ctx, {
            type: 'bar',
            data: barChartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                title: {
                    display: false
                },
                legend: {
                    display: false
                },
                tooltips: {
                    mode: 'index',
                    intersect: false
                },
                scales: {
                    xAxes: [{
                            stacked: true
                        }],
                    yAxes: [{
                            stacked: true
                        }]
                }
            }
        });
    }

    if ($('#monthlysupports').length) {
        var data = $('#monthlysupports').attr('data');
        var months = $('#monthlysupports').attr('months');
        var arr_months = months.split(',');
        var array = data.split(',');
        var barChartData = {
            labels: [arr_months[0], arr_months[1]],
            datasets: [{
                    label: 'Support',
                    backgroundColor: window.chartColors.green,
                    data: [
                        array[0],
                        array[1]
                    ]
                }]
        };
        var ctx = document.getElementById("monthlysupports").getContext("2d");
        var monthlyusers = new Chart(ctx, {
            type: 'bar',
            data: barChartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                title: {
                    display: false
                },
                legend: {
                    display: false
                },
                tooltips: {
                    mode: 'index',
                    intersect: false
                },
                scales: {
                    xAxes: [{
                            stacked: true
                        }],
                    yAxes: [{
                            stacked: true
                        }]
                }
            }
        });
    }

    if ($('#monthlysupportanswered').length) {
        var data = $('#monthlysupportanswered').attr('data');
        var months = $('#monthlysupportanswered').attr('months');
        var arr_months = months.split(',');
        var array = data.split(',');
        var barChartData = {
            labels: [arr_months[0], arr_months[1]],
            datasets: [{
                    label: 'Support Answered',
                    backgroundColor: window.chartColors.green,
                    data: [
                        array[0],
                        array[1]
                    ]
                }]
        };
        var ctx = document.getElementById("monthlysupportanswered").getContext("2d");
        var monthlyusers = new Chart(ctx, {
            type: 'bar',
            data: barChartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                title: {
                    display: false
                },
                legend: {
                    display: false
                },
                tooltips: {
                    mode: 'index',
                    intersect: false
                },
                scales: {
                    xAxes: [{
                            stacked: true
                        }],
                    yAxes: [{
                            stacked: true
                        }]
                }
            }
        });
    }

    if ($('#monthlydeletedusers').length) {
        var data = $('#monthlydeletedusers').attr('data');
        var months = $('#monthlydeletedusers').attr('months');
        var arr_months = months.split(',');
        var array = data.split(',');
        var barChartData = {
            labels: [arr_months[0], arr_months[1]],
            datasets: [{
                    label: 'Deleted Users',
                    backgroundColor: window.chartColors.green,
                    data: [
                        array[0],
                        array[1]
                    ]
                }]
        };
        var ctx = document.getElementById("monthlydeletedusers").getContext("2d");
        var monthlyusers = new Chart(ctx, {
            type: 'bar',
            data: barChartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                title: {
                    display: false
                },
                legend: {
                    display: false
                },
                tooltips: {
                    mode: 'index',
                    intersect: false
                },
                scales: {
                    xAxes: [{
                            stacked: true
                        }],
                    yAxes: [{
                            stacked: true
                        }]
                }
            }
        });
    }
});