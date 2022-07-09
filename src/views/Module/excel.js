import React, { useState } from 'react';
import { 
    Card, 
    Table, 
    Upload, 
    Button 
} from 'antd';
import * as XLSX from 'xlsx';


function Excel() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [fileList, setFileList] = useState([]);

    const columns = [
        { title: "姓名", dataIndex: "name" },
        { title: "性别", dataIndex: "gender" },
        { title: "年龄", dataIndex: "age" },
        { title: "工作", dataIndex: "work" }
    ];
    const sheetToBlob = (sheet, sheetName) => {
        sheetName = sheetName || 'sheet1';
        const workBook = {
            SheetNames: [sheetName],
            Sheets: {}
        };
        workBook.Sheets[sheetName] = sheet;
        const options = {
            bookType: 'xlsx',
            bookSST: false,
            type: 'binary'
        };
        const XLSXBook = XLSX.write(workBook, options);
        function stringToArrayBuffer(string) {
            const buffer = new ArrayBuffer(string.length);
            const unit8Array = new Uint8Array(buffer);
            for (let index = 0; index !== string.length; ++index) {
                unit8Array[index] = string.charCodeAt(index) & 0xFF;
            }
            return buffer;
        }
        const blob = new Blob([stringToArrayBuffer(XLSXBook)], { type: "application/octet-stream" }); 
        console.log(blob);
        return blob;
    }
    const openDownloadDialog = (blob, saveName) => {
        const url = URL.createObjectURL(blob);
        
        const aLink = document.createElement('a');

        aLink.href = url;
        aLink.download = saveName || ''; 
        const event = new MouseEvent('click');
        aLink.dispatchEvent(event);
    }
    const handleExportAll = () => {
        const rowMap = {
            "name":"姓名",
            "gender":"性别",
            "age":"年龄",
            "work":"工作"
        };
        const newData = data.map(item => {
            return Object.keys(item).reduce((newItem, key) => {
               const newKey = rowMap[key];
               newItem[newKey] = item[key];
               return newItem;
            }, {});
        });

        const sheet = XLSX.utils.json_to_sheet(newData);
        openDownloadDialog(sheetToBlob(sheet, undefined), `全部信息.xlsx`);
    }
    const formatTitleAndFileld = (a, b) => {
        const rowMap = {};
        columns.forEach(item => rowMap[item[a]] = item[b]);
        return rowMap;
    }
    const handleImportJSON = (array, file) => {
        const header = array[0];
        const rowMap = formatTitleAndFileld('title', 'dataIndex');
        const firstRow = header.map(item => rowMap[item]);

        const newArray = [...array];

        newArray.splice(0, 1);

        const JSON = newArray.map(items => {
            const newItem = {};
            items.forEach((item, index) => {
                const newKey = firstRow[index] || index;
                newItem[newKey] = item;
            });
            return newItem;
        });

        const formatData = JSON.map(item => {
            const { name, gender, age, work } = item;
            return {
                name,
                gender,
                age,
                work
            };
        });
        setData(formatData);
        setFileList([file]);
        return formatData;
    }
    const uploadProps = {
        accept: ".xlsx",
        fileList,
        onRemove: () => {
            setData([]);
            setFileList([]);
        },
        beforeUpload: (file) => {
            const fileReader = new FileReader();
            fileReader.addEventListener('load', (event) => {
                const list = event.target.result;

                // try parse list
                const workBook = XLSX.read(list, { type: 'binary' });

                // parse sheet to json
                const JSONList = XLSX.utils.sheet_to_json(workBook.Sheets[workBook.SheetNames[0]], { header: 1 });

                handleImportJSON(JSONList, file);
            })
            fileReader.readAsBinaryString(file);
        }
    };
    return (  
        <Card title="Excel导入导出解析">
            <div className="flex justify-start mb-4">
                <Upload {...uploadProps}>
                    <Button type="primary">Excel导入</Button>
                </Upload>
                <Button className="ml-4" type="primary" onClick={() => handleExportAll()}>Excel导出数据</Button>
            </div>
            <Table 
                bordered={true}
                loading={loading}
                columns={columns} 
                dataSource={data} 
                rowKey={(record) => `${record.name}`}
            />
        </Card>
    );
}

export default Excel;