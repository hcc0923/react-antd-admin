import React from 'react';
import Chart from '@/components/Chart';


const chartOptions = {
    backgroundColor: '#08263a',
	title: {
		top: 30,
		text: '饼图',
		textStyle: {
			fontWeight: 'normal',
			fontSize: 16,
			color: '#1DA57A'
		},
		left: 'center'
	},
	color: ['#001529', '#1890FF', '#1b9436', '#751313'],
	tooltip: {
		trigger: 'item',
		formatter: '{a} <br/>{b} : {c} ({d}%)'
	},
	legend: {
		orient: 'vertical',
		x: 20,
		data: ['电费', '水费', '物业费', '管理费', '停车费'],
        top: 20,
        textStyle: {
			fontWeight: 'normal',
			fontSize: 16,
			color: '#fff'
		}
	},
	series: [
		{
			name: '费用支出',
			type: 'pie',
			radius: '55%',
			center: ['50%', '60%'],
			data: [{ value: 100, name: '电费' }, { value: 50, name: '水费' }, { value: 224, name: '物业费' }, { value: 60, name: '管理费' }, { value: 800, name: '停车费' }]
		}
	]
};
function Pie() {
    return (
        <Chart chartId={"pie"} chartOptions={chartOptions}/>
    );
};
export default Pie;