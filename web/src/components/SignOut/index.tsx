import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { removeAccount, removeToken, removeRefreshToken } from '../../Utils/account';

const SignOut = () => {
  const history = useHistory();

  useEffect(() => {
    removeAccount();
    removeToken();
    removeRefreshToken();

    history.push("/");
    history.go(0);
  }, []);

  return null;
};

export default SignOut;