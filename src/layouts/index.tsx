import { Link, Outlet } from 'umi';
import './index.less';
import moment from 'moment';
import Root from '@/pages/root';
import { startTime } from '../../../constant';

export default function Layout() {

  if (moment().diff(moment(startTime), 'days') > 30) {
    return <Root status={'error'} />;
  }
  return (
    <div>
      <Outlet />
    </div>
  );
}
