import React, { useState, useEffect } from 'react';
import * as Echarts from 'echarts';
import cityMap from './citymap';
import CHINA_JSON from './map/china.json';


//34个省、市、自治区的名字拼音映射数组
const provinces = {
    //23个省
    "台湾": "taiwan",
    "河北": "hebei",
    "山西": "shanxi",
    "辽宁": "liaoning",
    "吉林": "jilin",
    "黑龙江": "heilongjiang",
    "江苏": "jiangsu",
    "浙江": "zhejiang",
    "安徽": "anhui",
    "福建": "fujian",
    "江西": "jiangxi",
    "山东": "shandong",
    "河南": "henan",
    "湖北": "hubei",
    "湖南": "hunan",
    "广东": "guangdong",
    "海南": "hainan",
    "四川": "sichuan",
    "贵州": "guizhou",
    "云南": "yunnan",
    "陕西": "shanxi1",
    "甘肃": "gansu",
    "青海": "qinghai",
    //5个自治区
    "新疆": "xinjiang",
    "广西": "guangxi",
    "内蒙古": "neimenggu",
    "宁夏": "ningxia",
    "西藏": "xizang",
    //4个直辖市
    "北京": "beijing",
    "天津": "tianjin",
    "上海": "shanghai",
    "重庆": "chongqing",
    //2个特别行政区
    "香港": "xianggang",
    "澳门": "aomen"
};
//直辖市和特别行政区-只有二级地图，没有三级地图
const special = ["北京","天津","上海","重庆","香港","澳门"];

const China = () => {
    let chart;
    const [mapData, setMapData] = useState([]);
    
    // init basic config
    const option = {
        backgroundColor: '#000',
        title : {
            text: '全国地图',
            subtext: '三级下钻',
            link:'http://www.ldsun.com',
            left: 'center',
            textStyle:{
                color: '#fff',
                fontSize:16,
                fontWeight:'normal',
                fontFamily:"Microsoft YaHei"
            },
            subtextStyle:{
                color: '#ccc',
                fontSize:13,
                fontWeight:'normal',
                fontFamily:"Microsoft YaHei"
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b}'
        },
        toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
                saveAsImage: {}
            },
            iconStyle:{
                normal:{
                    color:'#fff'
                }
            }
        },
        animationDuration:1000,
        animationEasing:'cubicOut',
        animationDurationUpdate:1000
    };
    const initChart = () => {
        chart = Echarts.init(document.getElementById("chartMap"));
    }
    const renderMap = (map, data) => {
        option.title.subtext = map;
        option.series = [ 
            {
                name: map,
                type: 'map',
                mapType: map,
                roam: false,
                nameMap:{
                    'china':'中国'
                },
                label: {
                    normal:{
                        show:true,
                        textStyle:{
                            color:'#999',
                            fontSize:13
                        }  
                    },
                    emphasis: {
                        show: true,
                        textStyle:{
                            color:'#fff',
                            fontSize:13
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        areaColor: '#323c48',
                        borderColor: 'dodgerblue'
                    },
                    emphasis: {
                        areaColor: 'darkorange'
                    }
                },
                data
            }	
        ];
        //渲染地图
        chart.setOption(option);
    }
    const drawChinaMap = () => {
        const areaData = [];
        const features = CHINA_JSON.features;
        
        features.forEach((feature) => {
            areaData.push({ name: feature.properties.name });
        });
    
        setMapData(areaData);
        Echarts.registerMap('china', CHINA_JSON);
        renderMap('china', areaData);
    }
    const clickMapEvent = () => {
        chart.on('click', (params) => {
            const { name, seriesName } = params;
            if (name in provinces) {
                //如果点击的是34个省、市、自治区，绘制选中地区的二级地图
                const moduleData = import(`./map/province/${provinces[name]}.json`);
                console.log(moduleData);
                moduleData.then(result => {
                    Echarts.registerMap(name, result.default);

                    const areaData = [];
                    const features = result.default.features;

                    features.forEach((feature) => {
                        areaData.push({ name: feature.properties.name });
                    });

                    renderMap(name, areaData);
                });
            } else if (seriesName in provinces) {
                //如果是【直辖市/特别行政区】只有二级下钻
                if(special.indexOf(seriesName) >= 0){
                    renderMap('china', mapData);
                }else{
                    //显示县级地图
                    const moduleData = import(`./map/city/${cityMap[name]}.json`);
                    
                    moduleData.then((result) => {
                        Echarts.registerMap(name, result.default);

                        const areaData = [];
                        const features = result.default.features;

                        features.forEach((feature) => {
                            areaData.push({ name: feature.properties.name });
                        });

                        renderMap(name, areaData);
                    });
                }	
            } else {
                renderMap('china',mapData);
            }
        });
    }

    useEffect(() => {
        if (document.getElementById("chartMap")) {
            initChart();
            drawChinaMap();
            clickMapEvent();
        }
    }, []);

    return (
        <div id="chartMap" style={{ width: 'auto', height: 600 }}></div>
    )
}

export default China;