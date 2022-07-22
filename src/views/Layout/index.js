import React from 'react';
import { connect } from 'react-redux';

import { Layout } from 'antd';

import Header from './Header';
import Sider from './Sider';
import Content from './Content';
import RightPanel from './RightPanel';


function App(props) {
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
        {/* {tagsView ? <TagsView /> : null} */}
        <Content />

        <RightPanel />
      </Layout>
    </Layout>
  )
}

export default App;