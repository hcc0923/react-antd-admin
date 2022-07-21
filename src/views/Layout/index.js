import React from 'react';
import { connect } from 'react-redux';

import { Layout } from 'antd';

import Header from './Header';
import Sider from './Sider';
import Content from './Content';
import RightPanel from './RightPanel';


function App(props) {
  return (
    <Layout  style={{ minHeight: '100vh'}}>
      <Sider 
        
      />
      <Layout
        style={{
          marginLeft: 200
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