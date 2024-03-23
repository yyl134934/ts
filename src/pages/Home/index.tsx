import { getLoginInfo } from 'Src/api/local-storage';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Home() {
  const [hasLogin, setLoginStatus] = useState(false);

  useEffect(() => {
    const token = getLoginInfo();
    setLoginStatus(!!token);
  }, []);

  const memolize = useMemo(
    () =>
      hasLogin ? (
        <div>首页，欢迎！！</div>
      ) : (
        <div>
          访问前，请先<NavLink to='login'>登录</NavLink>！
        </div>
      ),
    [hasLogin],
  );

  return <>{memolize}</>;
}
