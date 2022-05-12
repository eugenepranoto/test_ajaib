import type { ReactElement } from 'react';
import Base from '@components/layout/base/base';
import Home from '@modules/home/home';

export default function Page() {
  return <Home></Home>;
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Base>{page}</Base>;
};
