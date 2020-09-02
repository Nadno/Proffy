import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../store";

import { apiGet } from "../../services/api";
import verifyExpireToken from "../../Utils/refreshToken";
import handlingFormResponse from "../../Utils/handlingResponses";

import PageHeader from "../../components/PageHeader";
import Avatar from "../../components/Avatar";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import Select from "../../components/Select";
import AvailableTimes from "../../components/Pattern/AvailableTimes";

import "./styles.css";

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
  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: "", to: "" },
  ]);

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

  useEffect(() => console.log(scheduleItems), [scheduleItems]);

  const addNewScheduleItem = () => {
    if (scheduleItems.length === 7) return;

    setScheduleItems([
      ...scheduleItems,
      {
        week_day: 0,
        from: "",
        to: "",
      },
    ]);
  };

  const setScheduleItemValue = (
    position: number,
    field: string,
    value: string
  ) => {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return { ...scheduleItem, [field]: value };
      }

      return scheduleItem;
    });

    setScheduleItems(updatedScheduleItems);
  };

  return (
    <div id="page-profile">
      <PageHeader title="">
        {account.id && <Avatar avatar={account?.avatar} link="#" />}
      </PageHeader>

      <main>
        <form>
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
            </legend>
          </fieldset>

          <AvailableTimes
            scheduleItems={scheduleItems}
            addNewScheduleItem={addNewScheduleItem}
            setScheduleItemValue={setScheduleItemValue}
          />
        </form>
      </main>
    </div>
  );
};

export default Profile;
