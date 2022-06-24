import React, { Component } from 'react';
import { Card, Image } from 'antd';
import permission from '@/assets/images/permission.png';
import permissions from '@/assets/images/permissions.png';


class Page extends Component {
    state = JSON.parse(localStorage.getItem('userInfo')) || {};
    render() { 
        const { role } = this.state;
        return (  
            <Card>
                <div style={{display: 'flex', justifyContent: 'center'}}>
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
    };
};
export default Page;