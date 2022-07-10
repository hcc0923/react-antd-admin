import React, { useState }from 'react';
import { 
    Card, 
    Select,
    Image,
    Empty
} from 'antd';
import permission from '@/assets/images/permission.png';
import permissions from '@/assets/images/permissions.png';


function Authority() {
    const roleMap = { 1: '用户', 2: '管理员', 3: '超级管理员' };
    const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};
    const [authority, setAuthority] = useState(userInfo.role);

    const onSelectChange = (value) => {
        setAuthority(value);
        localStorage.setItem('userInfo', JSON.stringify({...userInfo, 'role': value}));
        window.location.reload();
    }
    return (  
        <Card title="权限切换">
            <div className="flex flex-col items-center">
                <div>
                    你当前的权限是：
                    <span className="text-sm font-bold text-green-700">{roleMap[authority]}</span>
                </div>
                <div className="mt-8">
                    <Select className="w-32" defaultValue={authority} onChange={(value) => onSelectChange(value)}>
                        <Select.Option value={1}>用户</Select.Option>
                        <Select.Option value={2}>管理员</Select.Option>
                        <Select.Option value={3}>超级管理员</Select.Option>
                    </Select>
                </div>
            </div>
            <div className="flex justify-center mt-8">
                { 
                    authority > 2 ?
                    <>
                        <Image
                            alt="三上悠亚"
                            width={400}
                            height={500}
                            src={permission}
                        />
                        <Image
                            alt="三上悠亚"
                            width={400}
                            height={500}
                            src={permissions}
                        />
                    </>
                    :
                    authority > 1 ?
                    <Image
                        alt="三上悠亚"
                        width={400}
                        height={500}
                        src={permissions}
                    />
                    :
                    <Empty description={false} imageStyle={{ width: 400, height: 500 }} />
                }
            </div>
        </Card>
    );
}

export default Authority;