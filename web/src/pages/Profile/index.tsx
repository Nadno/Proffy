import React, { useEffect, useState } from 'react';
import { apiGet } from '../../services/api';

const Profile = () => {
  const [account, setAccount] = useState({
    avatar: "",
    bio: "",
    email: "",
    id: 0,
    name: "",
    whatsapp: "",
  });

  useEffect(() => {
    const id = 1;
    
    apiGet(`/users/${id}`)
      .then(res => setAccount(res.data[0]))
      .catch(res => {throw new Error(res)});
  }, []);

  return (
    <div id="page-profile">
      Nada ainda
    </div>
  )
};

export default Profile;