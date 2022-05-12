import React, { ReactNode, useState, useEffect } from 'react';
import { ColumnsType } from 'antd/es/table';
import User from '@models/user/user';
import Response from '@models/response/response';

export default function HomeProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState([] as User[]);
  const [initialize, setInitialize] = useState(true);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({
    gender: '',
    search: ''
  });
  const [apiUrl] = useState('https://randomuser.me/api');
  const [pagination, setPagination] = useState({
    pageSize: 10,
    total: 20,
    current: 1,
    onChange: (current: number) => setPagination({ ...pagination, current: current })
  });

  const columns: ColumnsType<User> = [
    {
      key: 'login',
      title: 'Username',
      dataIndex: 'login',
      render: (val) => <span>{val.username}</span>
    },
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'name',
      render: (val) => <span>{val.first + ' ' + val.last}</span>
    },
    {
      key: 'email',
      title: 'Email',
      dataIndex: 'email'
    },
    {
      key: 'gender',
      title: 'Gender',
      dataIndex: 'gender'
    },
    {
      key: 'registered',
      title: 'Registered Date',
      dataIndex: 'registered',
      render: (val) => (
        <span>{new Date(val.date).toISOString().substring(0, 16).replace('T', ' ')}</span>
      )
    }
  ];

  async function getData() {
    const params = {
      results: pagination.pageSize.toString(),
      page: pagination.current.toString(),
      pageSize: pagination.total.toString(),
      ...(filter.gender && { gender: filter.gender }),
      ...(filter.search && { keyword: filter.search })
    };
    await fetch(apiUrl + '?' + new URLSearchParams(params), { method: 'get' })
      .then((response) => response.json())
      .then((data: { results: User[] } & Response) => setData(data.results))
      .catch((error) => error);
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await getData();
      setLoading(false);
      setInitialize(false);
    };

    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    if (!initialize) {
      const fetchData = async () => {
        setLoading(true);
        await getData();
        setLoading(false);
      };

      fetchData().catch(console.error);
    }
  }, [filter, pagination]);

  function filterChange(key: string, value: string) {
    console.log(value);
    setFilter({ ...filter, [key]: value });
    console.log(filter);
  }

  function resetFilter() {
    setFilter({ gender: '', search: '' });
  }

  const value = {
    filterChange,
    resetFilter,
    columns,
    data,
    loading,
    pagination,
    filter
  };

  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
}

type HomeContextType = {
  filterChange: (key: string, value: string) => void;
  resetFilter: () => void;
  columns: ColumnsType<User>;
  data: User[];
  loading: boolean;
  pagination: { pageSize: number; total: number };
  filter: { gender: string; search: string };
};

export const HomeContext: React.Context<HomeContextType> = React.createContext(
  {} as HomeContextType
);
