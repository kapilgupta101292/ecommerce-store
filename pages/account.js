import AccountHeader from '../components/Account/AccountHeader';
import AccountOrder from '../components/Account/AccountOrders';
import AccountPermissions from '../components/Account/AccountPermissions';
import {parseCookies} from 'nookies';
import baseUrl from '../utils/baseUrl';
import axios from 'axios';


function Account({user, orders}) {
  return <>
    <AccountHeader {...user}/>
    <AccountOrder orders={orders} />
    {user.role === 'root' && <AccountPermissions
    currentUserId={user._id}/> }
  </>;
}

Account.getInitialProps = async ctx => {
  const {token} = parseCookies (ctx);
  if (!token) {
    return {orders: []};
  }
  const payload = {headers: {Authorization: token}};
  const url = `${baseUrl}/api/orders`
  const response = await axios.get (url, payload);
  return { orders: response.data };
}

export default Account;
