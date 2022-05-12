import { Layout } from 'antd';

interface BaseProps {
  // eslint-disable-next-line no-undef
  children: React.ReactNode;
}

export default function Base({ children }: BaseProps) {
  return (
    <Layout>
      <div className="p-l-r-50">
        <div>{children}</div>
      </div>
    </Layout>
  );
}
