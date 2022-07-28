import React from 'react';
import { connect } from 'react-redux';

import { Layout } from 'antd';
import Sider from './Sider';
import Header from './Header';
import TagView from './TagView';
import Content from './Content';

const LayoutPage = () => {
  return (
    <Layout style={{ display: 'flex', width: '100%'}}>
      <Sider />
      <Layout
        style={{
          overflow: 'auto',
          height: '100vh',
          flex: '1',
        }}
      >
        <Header />
        {true ? <TagView /> : null}
        <Content />

      </Layout>
    </Layout>
  )
}

export default LayoutPage;