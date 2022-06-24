import React from 'react';
import { Drawer, Switch } from 'antd';


const styles = {
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	paddingBottom: '8px'
};


const BasicDrawer = props => {
	const { title, closable, visible, theme, breadcrumb, tag, onClose, onChangeTheme, onChangeBreadCrumb, onChangeTag } = props;
	return (
		<Drawer 
			title={title} 
			placement="right" 
			closable={closable} 
			visible={visible} 
			onClose={onClose}>
				<p style={styles}>
					<span>主题切换</span>
					<Switch 
						checkedChildren="暗色" 
						unCheckedChildren="亮色" 
						defaultChecked={theme.type === 'dark' ? true : false} 
						onChange={onChangeTheme}>
					</Switch>
				</p>
				<p style={styles}>
					<span>面包屑</span>
					<Switch 
						checkedChildren="开" 
						unCheckedChildren="关" 
						defaultChecked={breadcrumb.show} 
						onChange={onChangeBreadCrumb}>
					</Switch>
				</p>
				<p style={styles}>
					<span>标签</span>
					<Switch 
						checkedChildren="开" 
						unCheckedChildren="关" 
						defaultChecked={tag.show} 
						onChange={onChangeTag}>
					</Switch>
				</p>
		</Drawer>
	);
};
export default BasicDrawer;
