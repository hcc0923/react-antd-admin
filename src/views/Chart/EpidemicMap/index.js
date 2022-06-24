import React, { Component } from 'react';
import MapChart from './MapChart';
import DataTable from './DataTable';
import { formatProvince } from '@/utils/formatTool';


const { $http } = React;


class Map extends Component {
    state = {
        mapData: [],
        tableData: []
    };
    handleCountExist = (totalConfirmed, totalCured, totalDeath) => {
        return Number(totalConfirmed) - Number(totalCured) - Number(totalDeath);
    };
    handleGetMapData = () => {
        $http.get('/map/getMapData')
            .then(result => {
                const data = JSON.parse(result.data);
                const mapData = data.provinceArray.map(item => {
                    return {
                        name: formatProvince(item.childStatistic),
                        value: this.handleCountExist(item.totalConfirmed, item.totalCured, item.totalDeath)
                    };
                });
                const tableData = data.provinceArray.map(item => {
                    return {
                        childStatistic: item.childStatistic,
                        totalConfirmed: item.totalConfirmed,
                        totalCured: item.totalCured,
                        totalDeath: item.totalDeath
                    };
                });
                this.setState({
                    mapData,
                    tableData
                });
            })
            .catch(error => {
                console.log(error);
            });
    };
    componentDidMount() {
        this.handleGetMapData();
    };
    render() {
        const { mapData, tableData } = this.state;
        return (
            <div className="map">
                {/* 地图 */}
                <div>
                    <MapChart mapData={mapData}></MapChart>
                </div>
                {/* 数据表格 */}
                <div style={{marginTop: '20px'}}>
                    <DataTable tableData={tableData} ></DataTable>
                </div>
            </div>
        );
    };
};


export default Map;