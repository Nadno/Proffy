import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../store';

import { apiGet } from '../../services/api';
import verifyExpireToken from '../../Utils/refreshToken';

const Profile = () => {
  const AuthProvider = useContext(UserContext);

  const [account, setAccount] = useState({
    avatar: "",
    bio: "",
    email: "",
    id: 0,
    name: "",
    whatsapp: "",
  });

  const getUsers = async () => {
    const id = AuthProvider?.user.account.id;

    const itsOk = await verifyExpireToken();
    // if(!itsOk) return console.log("Logout");
    
    await apiGet(`/users/${id}`)
      .then(res => {
        setAccount(res.data);
        console.log(res.data, AuthProvider?.user.account.id);
      })
      .catch(alert);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div id="page-profile">
      Nada ainda
    </div>
  )
};

export default Profile;