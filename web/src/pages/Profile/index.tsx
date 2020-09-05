import React, { useEffect, useState, useContext, FormEvent } from "react";
import { UserContext } from "../../store";

import { apiGet } from "../../services/api";
import verifyExpireToken from "../../Utils/refreshToken";
import handlingFormResponse from "../../Utils/handlingResponses";

import PageHeader from "../../components/PageHeader";
import Avatar from "../../components/Avatar";
import ClassForm from "../../components/Pattern/ClassForm";

import "./styles.css";
import Textarea from "../../components/Textarea";
import Input from "../../components/Input";

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

  const [data, setData] = useState({});

  const getUsers = async () => {
    const id = AuthProvider?.user.account.id;

    const itsOk = await verifyExpireToken();
    if (!itsOk) return console.log("Logout");

    await apiGet(`/users/${id}`)
      .then(handlingFormResponse)
      .then((res) => {
        if (!res.id) return;
        setAccount(res);
      })
      .catch(alert);
  };

  useEffect(() => {
    if (AuthProvider?.user.account.id) getUsers();
    console.log(AuthProvider);
  }, [AuthProvider]);

  useEffect(() => console.log(data), [data]);


  const handleUpdateProfile = (e: FormEvent) => {

  }

  return (
    <div id="page-profile">
      <PageHeader pageTitle="Seu Perfil" title="">
        {account.id &&
        <Avatar
          avatar={account?.avatar}
          link="#"
        />}
      </PageHeader>

      <main>
      <ClassForm
          Submit={handleUpdateProfile}
          setData={setData}
      >
        <fieldset>
            <legend>
              <strong>Seus Dados</strong>
            </legend>

            <div className="input-blocks-container">
              <Input name="name" label="Nome" />
              <Input name="last_name" label="Sobrenome" />
            </div>
            
            <div className="input-blocks-container">
              <Input name="email" label="E-mail" />
              <Input name="whatsapp" label="whatsapp" />
            </div>

            <Textarea name="bio" label="Biografia" />
          </fieldset>
      </ClassForm>
        {/* <form className="form">
          <fieldset>
            <legend>
              <h1>Seus Dados</h1>
            </legend>

            <div className="input-blocks-container">
              <Input name="name" label="Nome" />
              <Input name="last_name" label="Sobrenome" />
            </div>
            
            <div className="input-blocks-container">
              <Input name="email" label="E-mail" />
              <Input name="whatsapp" label="whatsapp" />
            </div>

            <Textarea name="bio" label="Biografia" />
          </fieldset>

          <fieldset>
            <legend>
              <h1>Sobre a aula</h1>
            </legend>
              <Select
                name="subject"
                label="Matéria"
                options={[
                  { value: "Artes", label: "Artes" },
                  { value: "Biologia", label: "Biologia" },
                  { value: "Ciências", label: "Ciências" },
                  { value: "Educação física", label: "Educação física" },
                  { value: "Física", label: "Física" },
                  { value: "Química", label: "Química" },
                  { value: "Matemática", label: "Matemática" },
                  { value: "Português", label: "Português" },
                ]}
              />
          </fieldset>

          <AvailableTimes
            scheduleItems={scheduleItems}
            addNewScheduleItem={addNewScheduleItem}
            setScheduleItemValue={setScheduleItemValue}
          />
        </form> */}
      </main>
    </div>
  );
};

export default Profile;
