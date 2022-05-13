import React, { ReactNode, useState, useEffect } from 'react';
import { ColumnsType } from 'antd/es/table';
import User from '@models/user/user';
import Response from '@models/response/response';
import { TablePaginationConfig } from 'antd/es/table';
import { SorterResult, FilterValue } from 'antd/lib/table/interface';
import { get } from '@helpers/fetch_wrapper';

export default function HomeProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState([] as User[]);
  const [initialize, setInitialize] = useState(true);
  const [loading, setLoading] = useState(false);
  const [tmpSearch, setTmpSearch] = useState('');
  const [filter, setFilter] = useState({
    gender: '',
    search: ''
  });
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    pageSize: 10,
    total: 20,
    current: 1
  });
  const [sorter, setSorter] = useState({
    column: '',
    order: ''
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
      render: (val) => <span>{val.first + ' ' + val.last}</span>,
      sorter: true
    },
    {
      key: 'email',
      title: 'Email',
      dataIndex: 'email',
      sorter: true
    },
    {
      key: 'gender',
      title: 'Gender',
      dataIndex: 'gender',
      sorter: true
    },
    {
      key: 'registered',
      title: 'Registered Date',
      dataIndex: 'registered',
      render: (val) => (
        <span>{new Date(val.date).toISOString().substring(0, 16).replace('T', ' ')}</span>
      ),
      sorter: true
    }
  ];

  async function getData() {
    const params = {
      results: pagination?.pageSize?.toString() || '20',
      page: pagination?.current?.toString() || '1',
      pageSize: pagination?.total?.toString() || '20',
      ...(sorter.column && { sortBy: sorter.column }),
      ...(sorter.order && { sortOrder: sorter.order }),
      ...(filter.gender && { gender: filter.gender }),
      ...(filter.search && { keyword: filter.search })
    };

    const response = await get<{ results: User[] } & Response>('?' + new URLSearchParams(params));
    if (response && response.results) {
      setData(response.results);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await getData();
      setLoading(false);
      setInitialize(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!initialize) {
      const fetchData = async () => {
        setLoading(true);
        await getData();
        setLoading(false);
      };

      fetchData();
    }
  }, [filter, pagination]);

  function filterChange(key: string, value: string) {
    setFilter({ ...filter, [key]: value });
  }

  function resetFilter() {
    setFilter({ gender: '', search: '' });
    setTmpSearch('');
  }

  function searchChange(value: string) {
    setTmpSearch(value);
  }

  function tableChange(
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: any
  ) {
    setPagination({ ...pagination });
    setSorter({ column: sorter?.column?.dataIndex, order: sorter?.order });
  }

  const value = {
    tableChange,
    filterChange,
    searchChange,
    resetFilter,
    columns,
    data,
    loading,
    pagination,
    filter,
    tmpSearch
  };

  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
}

type HomeContextType = {
  tableChange: (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<User> | SorterResult<User>[]
  ) => void;
  filterChange: (key: string, value: string) => void;
  searchChange: (value: string) => void;
  resetFilter: () => void;
  columns: ColumnsType<User>;
  data: User[];
  loading: boolean;
  pagination: TablePaginationConfig;
  filter: { gender: string; search: string };
  tmpSearch: string;
};

export const HomeContext: React.Context<HomeContextType> = React.createContext(
  {} as HomeContextType
);
