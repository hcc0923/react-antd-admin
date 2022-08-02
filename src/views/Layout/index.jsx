import React from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import Sider from './Sider';
import Header from './Header';
import Content from './Content';
import Tags from "@/components/Tags";

const LayoutPage = (props) => {
  const { showTag } = props;
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
        {showTag ? <Tags /> : null}
        <Content />
      </Layout>
    </Layout>
  );
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(LayoutPage);