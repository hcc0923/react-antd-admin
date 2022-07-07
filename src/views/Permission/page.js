import React from 'react';
import { 
    Card, 
    Image 
} from 'antd';
import permission from '@/assets/images/permission.png';
import permissions from '@/assets/images/permissions.png';


function Page() {
    const { role } = JSON.parse(localStorage.getItem('userInfo')) || {};
    return (  
        <Card title="权限切换">
            <div className="flex justify-center">
                { 
                    role > 2 ?
                    <section>
                        <Image
                            alt="三上悠亚"
                            width={320}
                            height={500}
                            src={permission}
                        />
                        <Image
                            alt="三上悠亚"
                            width={320}
                            height={500}
                            src={permissions}
                        />
                    </section>
                    :
                    <section>
                        <Image
                            alt="三上悠亚"
                            width={320}
                            height={500}
                            src={permissions}
                        />
                    </section>
                }
            </div>
        </Card>
    );
}

export default Page;