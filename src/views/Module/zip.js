import React, { useState, useEffect } from 'react';
import { 
    Card, 
    Table, 
    Input, 
    Button 
} from 'antd';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';

const data = [
    { id: '1', name: '韩畅畅', gender: '男', age: 23, work: 'CV练习生'},
    { id: '2', name: '曹青青', gender: '女', age: 21, work: '教师'},
    { id: '3', name: '李亚娟', gender: '女', age: 21, work: '程序员'},
    { id: '4', name: '田涵', gender: '男', age: 21, work: 'CV练习生'},
    { id: '5', name: '杨赛娅', gender: '女', age: 21, work: '诗人'}
];
function Zip() {
    const [loading, setLoading] = useState(false);
    const [fileName, setFileName] = useState('压缩包');
    const [tableData, setTableData] = useState([]);
    const columns = [
        { title: '姓名', dataIndex: 'name' },
        { title: '性别', dataIndex: 'gender' },
        { title: '年龄', dataIndex: 'age' },
        { title: '工作', dataIndex: 'work' }
    ];
    const handleFileChange = (event) => {
        setFileName(event.target.value);
    }
    const handleExportZip = () => {
        setLoading(true);
        const zip = new JSZip();

        let contentString = '';
        tableData.forEach(item => {
            contentString += item['name'] + ' ' + item['gender'] + ' ' + item['age'] + ' ' + item['work'] + '\n';
        });

        zip.file(`${fileName}.txt`, contentString);
        zip.generateAsync({ type: 'blob'})
            .then(blob => {
                saveAs(blob, `${fileName}.zip`);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
            });
    }
    useEffect(() => {
        setTableData(data);
    }, []);
    return (  
        <Card title="导出zip">
            <Input 
                className="w-1/4 mr-3"
                placeholder="请输入文件名" 
                value={fileName} 
                onChange={(event) => handleFileChange(event)}
            />
            <Button type="primary" onClick={() => handleExportZip()}>导出Zip</Button>
            <Table
                className="mt-4"
                bordered={true}
                loading={loading}
                columns={columns}
                dataSource={tableData}
                rowKey={(record) => `${record.id}`}
            />
        </Card>
    );
}

export default Zip;