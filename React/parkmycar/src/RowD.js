import React from 'react';
import Chart from 'react-apexcharts';
import './RowD.css';

const RowD = ({ parkingArea, onClose }) => {
    const lineChartData = {
        series: [
            {
                name: 'Occupancy',
                data: [30, 40, 45, 50, 49, 60, 70, 91, 125],
            },
        ],
        options: {
            chart: {
                height: 350,
                type: 'line',
            },
            title: {
                text: `Occupancy of ${parkingArea['Parking Name']}`,
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
            },
            yaxis: {
                title: {
                    text: 'Percentage (%)',
                },
            },
        },
    };

    const polarAreaData = {
        series: [30, 40, 45, 50, 49, 60, 70, 91, 125],
        options: {
            chart: {
                type: 'polarArea',
            },
            title: {
                text: `Polar Area Chart`,
            },
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
            theme: {
                monochrome: {
                    enabled: false,
                    shadeTo: 'light',
                    shadeIntensity: 0.65,
                },
            },
            legend: {
                position: 'bottom',
            },
            stroke: {
                colors: ['#fff'],
            },
            fill: {
                opacity: 0.8,
                colors: [
                    '#FF5733',
                    '#FFC300',
                    '#DAF7A6',
                    '#900C3F',
                    '#581845',
                    '#4B0082',
                    '#40E0D0',
                    '#2ECC71',
                    '#3498DB',
                ],
            },
        },
    };

    const pieChartData = {
        series: [30, 40, 45, 50, 49, 60, 70, 91, 125],
        options: {
            chart: {
                type: 'pie',
            },
            title: {
                text: 'Pie Chart',
            },
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
            theme: {
                monochrome: {
                    enabled: false,
                },
            },
            legend: {
                position: 'bottom',
            },
            fill: {
                colors: [
                    '#FF5733',
                    '#FFC300',
                    '#DAF7A6',
                    '#900C3F',
                    '#581845',
                    '#4B0082',
                    '#40E0D0',
                    '#2ECC71',
                    '#3498DB',
                ],
            },
        },
    };

    return (
        <div className="row-data">
            <button className="close-button" onClick={onClose}>
                Close
            </button>
            <div className="chart-container">
                <Chart
                    options={lineChartData.options}
                    series={lineChartData.series}
                    type="line"
                    height={350}
                />
            </div>
            <div className="chart-container">
                <Chart
                    options={polarAreaData.options}
                    series={polarAreaData.series}
                    type="polarArea"
                    height={350}
                />
            </div>
            <div className="chart-container">
                <Chart
                    options={pieChartData.options}
                    series={pieChartData.series}
                    type="pie"
                    height={350}
                />
            </div>
        </div>
    );
};

export default RowD;