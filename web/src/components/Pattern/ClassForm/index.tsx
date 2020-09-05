import React, { useState, FormEventHandler, useEffect } from "react";

import AvailableTimes from "../AvailableTimes";
import Input from "../../Input";
import Select from "../../Select";

import warningIcon from "../../../assets/images/icons/warning.svg";

import './styles.css';
  
interface ClassFormProps {
  Submit: FormEventHandler;
  setData: Function;
};

const ClassForm: React.FC<ClassFormProps> = ({ Submit, setData, children }) => {
  const [subject, setSubject] = useState("Português");
  const [cost, setCost] = useState("");

  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: "", to: "" },
  ]);

  useEffect(() => {
    setData({
      subject,
      cost: Number(cost),
      schedule: scheduleItems,
    });
  }, [subject, cost, scheduleItems]);

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
    <form className="form" onSubmit={Submit}>
      {children}
      <fieldset>
        <legend>Sobre a aula</legend>
        <div className="input-blocks-container">
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
        </div>
      </fieldset>

      <AvailableTimes
        scheduleItems={scheduleItems}
        addNewScheduleItem={addNewScheduleItem}
        setScheduleItemValue={setScheduleItemValue}
      />

      <footer>
        <p>
          <img src={warningIcon} alt="Aviso importante" />
          Importante! <br />
          Preencha todos os dados
        </p>

        <button type="submit">Salvar cadastro</button>
      </footer>
    </form>
  );
};

export default ClassForm;
