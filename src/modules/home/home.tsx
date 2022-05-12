import HomeProvider, { HomeContext } from './home_provider';
import React, { useContext } from 'react';
import { Table, Input, Space, Select, Form, Button, Breadcrumb } from 'antd';

export default function Home() {
  return (
    <HomeProvider>
      <Content></Content>
    </HomeProvider>
  );
}

function Content() {
  const { Search } = Input;
  const { Option } = Select;

  const provider = useContext(HomeContext);

  return (
    <>
      <Breadcrumb className="m-b-16">
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Example Page</Breadcrumb.Item>
      </Breadcrumb>
      <h2 className="m-b-16">Example With Search and Filter</h2>
      <Form layout="vertical">
        <Space>
          <Form.Item label="Search">
            <Search
              value={provider.filter.search}
              placeholder="input search text"
              onSearch={(value) => provider.filterChange('search', value)}
              enterButton
            />
          </Form.Item>
          <Form.Item label="Gender">
            <Select
              placeholder="Select a gender"
              value={provider.filter.gender}
              onChange={(value) => provider.filterChange('gender', value)}
              style={{ width: 200 }}>
              <Option value="all">All</Option>
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
            </Select>
          </Form.Item>
          <Button onClick={() => provider.resetFilter()}>Reset Filter</Button>
        </Space>
      </Form>
      <Table
        rowKey={(record) => record.login.uuid}
        pagination={provider.pagination}
        columns={provider.columns}
        loading={provider.loading}
        dataSource={provider.data}
        className="m-b-16"
      />
    </>
  );
}
