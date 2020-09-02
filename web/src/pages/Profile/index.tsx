import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../store';

import { apiGet } from '../../services/api';
import verifyExpireToken from '../../Utils/refreshToken';
import handlingFormResponse from '../../Utils/handlingResponses';
import PageHeader from '../../components/PageHeader';

const Profile = () => {
  const AuthProvider = useContext(UserContext);

  const [account, setAccount] = useState({
    id: 0,
    avatar: "",
    bio: "",
    email: "",
    name: "",
    whatsapp: "",
  });

  const getUsers = async () => {
    const id = AuthProvider?.user.account.id;
    
    const itsOk = await verifyExpireToken();
    if(!itsOk) return console.log("Logout");
    
    await apiGet(`/users/${id}`)
      .then(handlingFormResponse)
      .then((res) => {
        if (!res.account) return;
        setAccount(res.data);
      })
      .catch(alert);
  };

  useEffect(() => {
    if (AuthProvider?.user.account.id) getUsers();
    console.log(account);
  }, [AuthProvider]);

  return (
    <div id="page-profile">
      <PageHeader title="Profile" />
    </div>
  )
};

export default Profile;