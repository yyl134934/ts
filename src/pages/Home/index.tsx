import { NavLink } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      访问前，请先<NavLink to='login'>登录</NavLink>！
    </div>
  );
}
