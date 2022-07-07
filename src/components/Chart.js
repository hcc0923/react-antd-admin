import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as Echarts from 'echarts';
import { debounce } from '@/utils/optimize';


class Chart extends Component {
    state = { chart: null };
    static propTypes = {
        chartId: PropTypes.string.isRequired,
        chartHeight: PropTypes.string.isRequired,
        chartOptions: PropTypes.object.isRequired,
    }
    static defaultProps = {
		chartId: 'chartId',
		chartHeight: '100vh',
		chartOptions: {}
	}
    handleInitChart = () => {
		this.setState(
			{
				chart: Echarts.init(document.getElementById(this.props.chartId))
			},
			() => {
                this.state.chart.showLoading({ color: '#5FB878'});
                this.state.chart.setOption(this.props.chartOptions);
                this.state.chart.hideLoading();
			}
		);
    }
    handleResizeWindow = () => {
        const chart = this.state.chart;
        if (chart) {
            debounce(chart.resize.bind(this), 500)();
        };
    }
    handleDisposeWatch = () => {
		if (!this.state.chart) return null;
		window.removeEventListener('resize', () => this.handleResizeWindow()); // 移除窗口，变化时重置图表
		this.setState({ chart: null });
    }
    componentDidMount() {
        debounce(this.handleInitChart.bind(this), 500)(); //初始化图表
        window.addEventListener('resize', () => this.handleResizeWindow()); // 监听窗口，变化时重置图表
    }
    componentWillUnmount() {
		this.handleDisposeWatch();
	}
    render() { 
        return (  
            <div id={this.props.chartId} style={{height: this.props.chartHeight}}></div>
        )
    }
}
export default Chart;