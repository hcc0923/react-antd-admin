import React, { Component } from 'react';
import { Card, Table, Upload, Button } from 'antd';
import * as XLSX from 'xlsx';


class Excel extends Component {
    state={
        columns:[
            {title:"姓名",dataIndex:"name"},
            {title:"性别",dataIndex:"gender"},
            {title:"年龄",dataIndex:"age"},
            {title:"工作",dataIndex:"work"}
        ],
        data:[],
        fileList:[]
    };
    formatTitleOrFileld = (a, b) => {
        const entozh = {};
        this.state.columns.forEach(item => {
            entozh[item[a]] = item[b]
        });
        return entozh;
    };
    sheet2blob = (sheet, sheetName) => {
        sheetName = sheetName || 'sheet1';
        let workbook = {
            SheetNames: [sheetName],
            Sheets: {}
        };
        workbook.Sheets[sheetName] = sheet; // 生成excel的配置项
        let wopts = {
          bookType: 'xlsx', // 要生成的文件类型
          bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
            type: 'binary'
        };
        let wbout = XLSX.write(workbook, wopts);
        let blob = new Blob([s2ab(wbout)], {
            type: "application/octet-stream"
        }); // 字符串转ArrayBuffer
        function s2ab(s) {
            let buf = new ArrayBuffer(s.length);
            let view = new Uint8Array(buf);
            for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
            return buf;
        };
        return blob;
    };
    openDownloadDialog = (url, saveName) => {
        if (typeof url == 'object' && url instanceof Blob) {
          url = URL.createObjectURL(url); // 创建blob地址
        }
        let aLink = document.createElement('a');
        aLink.href = url;
        aLink.download = saveName || ''; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
        let event;
        if (window.MouseEvent) event = new MouseEvent('click');
        else {
            event = document.createEvent('MouseEvents');
            event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        }
        aLink.dispatchEvent(event);
    };
    handleExportAll = (e) => {
        const entozh = {
            "name":"姓名",
            "gender":"性别",
            "age":"年龄",
            "work":"工作"
        };
        const nowdata = this.state.data;
        const json = nowdata.map((item) => {
            return Object.keys(item).reduce((newData, key) => {
                const newKey = entozh[key] || key
                newData[newKey] = item[key]
                return newData
            }, {})
        });
        const sheet = XLSX.utils.json_to_sheet(json);
        this.openDownloadDialog(this.sheet2blob(sheet,undefined), `全部信息.xlsx`);
    };
    handleImpotedJson = (array, file) => {
        const header = array[0];
        const entozh = this.formatTitleOrFileld('title', 'dataIndex');
        const firstRow = header.map(item => entozh[item]);

        const newArray = [...array];

        newArray.splice(0, 1);

        const json = newArray.map((item, index) => {
            const newitem = {};
            item.forEach((im, i) => {
                const newKey = firstRow[i] || i;
                newitem[newKey] = im
            });
            return newitem;
        });

        const formatData = json.map(item => ({
            name: item.name,
            gender: item.gender,
            age: item.age,
            work: item.work,
        }));
        this.setState({ data: formatData, fileList: [file] });
        return formatData;
    };
    render() { 
        const { columns, data, fileList }=this.state;
        const uploadProps={
            accept: ".xls,.xlsx,application/vnd.ms-excel",
            fileList,
            onRemove: () => {
                this.setState({
                    data:[],
                    fileList:[]
                });
            },
            beforeUpload: (file) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const list = e.target.result;

                    //尝试解析list
                    const workbook = XLSX.read(list, {type: 'binary'});

                    //将工作簿对象转换为JSON对象数组
                    const JSONList = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { header: 1 });

                    this.handleImpotedJson(JSONList, file);
                };
                reader.readAsBinaryString(file);
            }
        };
        return (  
            <Card title="Excel导入解析预览，导出所有">
                <div style={{display: 'flex'}}>
                    <section>
                        <Upload {...uploadProps}>
                            <Button type="primary">Excel导入</Button>
                        </Upload>
                    </section>
                    <section style={{marginLeft: '10px'}}>
                        <Button type="primary" onClick={this.handleExportAll}>Excel导出数据</Button>
                    </section>
                </div>
                <Table columns={columns} dataSource={data} bordered></Table>
            </Card>
        );
    };
};
export default Excel;