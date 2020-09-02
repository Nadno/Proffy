import React, { useState, FormEvent, useContext } from "react";
import { useHistory } from "react-router-dom";

import { UserContext } from "../../store";
import { apiPost } from "../../services/api";
import verifyExpireToken from "../../Utils/refreshToken";

import SignOut from "../../components/SignOut";
import PageHeader from "../../components/PageHeader";
import Input from "../../components/Input";
import Select from "../../components/Select";
import LoginRedirect from "../../components/LoginRedirect";

import warningIcon from "../../assets/images/icons/warning.svg";


import "./styles.css";

const TeacherForm = () => {
  const AuthProvider = useContext(UserContext);
  const history = useHistory();

  const [subject, setSubject] = useState("Português");
  const [cost, setCost] = useState("");

  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: "", to: "" },
  ]);

  const addNewScheduleItem = () => {
    if (scheduleItems.length === 7) return 0;

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

  const handleCreateClass = async (e: FormEvent) => {
    e.preventDefault();
    const user_id = AuthProvider?.user ? AuthProvider?.user.account.id : 0;

    if (user_id === 0) return null;
    const data = {
      user_id,
      subject,
      cost: Number(cost),
      schedule: scheduleItems,
    };

    const itsOk = await verifyExpireToken();
    if(!itsOk) return SignOut();

    await apiPost("classes/create", data)
    .then(() => {
      console.log("Cadastro realizado com sucesso!");

      history.push('/');
    })
    .catch(() => console.log("Erro ao cadastrar aula!"));
  };

  if (AuthProvider?.user.account.id === 0) return <LoginRedirect />;

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        pageTitle="Dar aulas"
        title="Que incrível que você quer dar aulas."
        description="O primeiro passo é preencher esse formulário de inscrição"
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Sobre a aula</legend>
            <Select
              name="subject"
              label="Matéria"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
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

            <Input
              name="cost"
              label="Custo da sua hora por aula"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
              <button type="button" onClick={addNewScheduleItem}>
                + Novo horário
              </button>
            </legend>

            {scheduleItems.map((scheduleItem, index) => {
              return (
                <div key={scheduleItem.week_day} className="schedule-item">
                  <Select
                    name="week_day"
                    label="Matéria"
                    value={scheduleItem.week_day}
                    onChange={(e) =>
                      setScheduleItemValue(index, "week_day", e.target.value)
                    }
                    options={[
                      { value: "0", label: "Domingo" },
                      { value: "1", label: "Segunda-feira" },
                      { value: "2", label: "Terça-feira" },
                      { value: "4", label: "Quarta-feira" },
                      { value: "3 física", label: "Quinta-feira" },
                      { value: "5", label: "Sexta-feira" },
                      { value: "6", label: "Sábado" },
                    ]}
                  />

                  <Input
                    name="from"
                    label="Das"
                    type="time"
                    value={scheduleItem.from}
                    onChange={(e) =>
                      setScheduleItemValue(index, "from", e.target.value)
                    }
                  />
                  <Input
                    name="to"
                    label="Até"
                    type="time"
                    value={scheduleItem.to}
                    onChange={(e) =>
                      setScheduleItemValue(index, "to", e.target.value)
                    }
                  />
                </div>
              );
            })}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
              Importante! <br />
              Preencha todos os dados
            </p>

            <button type="submit">Salvar cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
};

export default TeacherForm;
