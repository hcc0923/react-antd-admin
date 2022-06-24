import React, { Component } from 'react';
import { Card, Switch } from 'antd';
import { connect } from 'react-redux';
import { setCollapse, setTheme, setBreadcrumb, setTag } from '@/store/actions/setting';
import './style.less';


class System extends Component {
    state = {};
    onCollapseChange = (checked) => {
        this.props.setCollapse({ show: checked });
    };
    onThemeChange = (checked) => {
        this.props.setTheme({ type: checked ? 'dark' : 'light' });
    };
    onBreadcrumbChange = (checked) => {
        this.props.setBreadcrumb({ show: checked });
    };
    onTagChange = (checked) => {
        this.props.setTag({ show: checked });
    };
    render() { 
        const { collapse, theme, breadcrumb, tag } = this.props;
        return (  
            <Card title="系统设置" className="system">
                <div className="item">
                    <section>侧边栏</section>
                    <Switch 
                        checked={collapse.show}
                        checkedChildren="折叠"
                        unCheckedChildren="展开"
                        onChange={this.onCollapseChange}
                    />
                </div>
                <div className="item">
                    <section>主题</section>
                    <Switch 
                        checked={theme.type === "dark" ? true : false}
                        checkedChildren="暗色"
                        unCheckedChildren="亮色"
                        onChange={this.onThemeChange}
                    />
                </div>
                <div className="item">
                    <section>面包屑</section>
                    <Switch 
                        checked={breadcrumb.show}
                        checkedChildren="开启"
                        unCheckedChildren="关闭"
                        onChange={this.onBreadcrumbChange}
                    />
                </div>
                <div className="item">
                    <section>标签</section>
                    <Switch 
                        checked={tag.show}
                        checkedChildren="开启"
                        unCheckedChildren="关闭"
                        onChange={this.onTagChange}
                    />
                </div>
            </Card>
        );
    };
};


const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
	setCollapse: data => {
		dispatch(setCollapse(data));
	},
	setTheme: data => {
		dispatch(setTheme(data));
	},
	setBreadcrumb: data => {
		dispatch(setBreadcrumb(data));
	},
	setTag: data => {
		dispatch(setTag(data));
	}
});
export default connect(mapStateToProps, mapDispatchToProps)(System);