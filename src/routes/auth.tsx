import { getLoginInfo } from '@/api/local-storage';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthRouter({ children }: { children: React.ReactElement }) {
  const navigator = useNavigate();

  useEffect(() => {
    const token = getLoginInfo();
    if (!token) {
      navigator('login', { replace: true });
    }
  }, []);

  return <>{children}</>;
}
