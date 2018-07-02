import React, {Component} from 'react';

var echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/pie');
require('echarts/lib/component/legend');

export default class PieChart extends Component {
    static defaultProps = {
        style: {width: '100%', height: '300px', margin: 'auto'},
        data: null
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.initPieChart();
    }

    componentDidUpdate(prevProps, prevState) {
        this.initPieChart();
    }

    initPieChart() {
        const {data} = this.props;
        if (!data && data.length) return;
        let chartData = data.map(item => {
            let {percent, min_vocab, max_vocab} = item;
            return {
                value: percent,
                name: `${percent}% 词汇量${min_vocab}${max_vocab ? '-' + max_vocab : '以上'}`
            };
        });

        let myChart = echarts.init(this.refs.pieChart);
        let options = this.setOption(chartData);
        myChart.setOption(options);
    }

    setOption(data) {
        let legend_data = [];
        data.forEach((item, i) => {
            legend_data.push(item);
            if (i % 2 !== 0 && i !== data.length - 1) {
                legend_data.push('\n');
            }
        });
        return {
            animation: false,
            title: {
                show: false
            },

            color: ['#ffd941', '#ffb138', '#fe7f41', '#34bcd9', '#2d7be6', '#65ce18'],
            legend: {
                show: true,
                left: 'center',
                selectedMode: false,
                bottom: 0,
                data: legend_data,
                icon: 'circle',
                textStyle: {
                    color: '#9ba5ac',
                    fontSize: '12px'
                },
                shadowOffsetX: 0,
                shadowOffsetY: 2,
                shadowBlur: 5,
                shadowColor: 'rgba(141, 117, 19, 0.2)'
            },
            series: [
                {
                    name: '比例',
                    type: 'pie',
                    data: data,
                    center: ['50%', '40%'],
                    radius: [0, '65%'],
                    label: {
                        normal: {
                            position: 'inner',
                            formatter: '{d}%',
                            color: '#fefefe',
                            fontSize: 12
                        }
                    },
                    itemStyle: {
                        normal: {
                            // 阴影的大小
                            shadowBlur: 8,
                            // 阴影水平方向上的偏移
                            shadowOffsetX: 6,
                            // 阴影垂直方向上的偏移
                            shadowOffsetY: 6,
                            // 阴影颜色
                            shadowColor: 'rgba(67, 67, 67, .2)',

                            // borderWidth: 2,

                            borderColor: '#fff'
                        }
                    }
                }
            ]
        };
    }

    render() {
        let {style} = this.props;
        return (
            <div className="pie-react">
                <div ref="pieChart" style={style} />
            </div>
        );
    }
}
