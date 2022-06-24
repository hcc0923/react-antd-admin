import React, { Component } from 'react';
import { Card, Table, Input, Button } from 'antd';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';


class Zip extends Component {
    state = {
        loading: false,
        filename: '压缩包',
        columns:[
            {title:"姓名",dataIndex:"name"},
            {title:"性别",dataIndex:"gender"},
            {title:"年龄",dataIndex:"age"},
            {title:"工作",dataIndex:"work"}
        ],
        tableData:[]
    };
    handleInputChange = (e) => {
        this.setState({filename: e.target.value});
    };
    handleExportZip = () => {
        this.setState({loading: true});
        const zip = new JSZip();
        let contentString = '';
        this.state.tableData.forEach(item => {
            contentString += item["name"] + " " + item["gender"] + " " + item["age"] + " " + item["work"] + "\n";
        });
        zip.file(`${this.state.filename}.txt`, contentString);
        
        zip.generateAsync({type:"blob"})
            .then(content => {
                saveAs(content, `${this.state.filename}.zip`);
                this.setState({loading: false});
            })
            .catch(error => {
                console.log(error);
            });
    };
    componentDidMount() {
        const data = [
            { name: "韩畅畅", gender: "男", age: 23, work: "CV练习生"},
            { name: "曹青青", gender: "女", age: 21, work: "教师"},
            { name: "李亚娟", gender: "女", age: 21, work: "程序员"},
            { name: "田涵", gender: "男", age: 21, work: "CV练习生"},
            { name: "杨赛娅", gender: "女", age: 21, work: "诗人"}
        ];
        this.setState({tableData: data});
    }
    render() { 
        const { loading, filename, columns, tableData } = this.state;
        return (  
            <Card title="导出zip">
                <Input style={{width: '170px', marginRight: '10px'}} placeholder="请输入文件名" value={filename} onChange={this.handleInputChange}/>
                <Button type="primary" onClick={this.handleExportZip}>导出Zip</Button>
                <Table
                    bordered={true}
                    loading={loading}
                    columns={columns}
                    dataSource={tableData}>
                </Table>
            </Card>
        );
    };
};
export default Zip;