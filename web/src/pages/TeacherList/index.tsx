import React, { useState, FormEvent } from "react";
import { Teacher } from "../../Utils/interfaces";

import PageHeader from "../../components/PageHeader";
import TeacherItem from "../../components/TeacherItem";
import Input from "../../components/Input";
import Select from "../../components/Select";

import api from "../../services/api";
import getSave, { getIds } from "../../Utils/storage";

import "./styles.css";

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [subject, setSubject] = useState("");
  const [week_day, setWeek_day] = useState("");
  const [time, setTime] = useState("");

  const searchTeacher = async (e:FormEvent) => {
    e.preventDefault();
    const params = {
      subject,
      week_day,
      time,
    };
    const response = await api.get('classes', { params });

    setTeachers(response.data);
  };

  const searchFavoriteOnStorage = (id:number) => {
    const favorites = getIds();

    return  favorites.indexOf(id) >= 0 ? true : false;
  };

  const subjectFilter = (value:string) => {
    if(value === "Favoritos") {
      setButtonDisabled(true);
      setSubject(value);
      
      const favorites = getSave();
      setTeachers(favorites);
      return 0;
    };
    setButtonDisabled(false);
    setSubject(value);
  };

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponíveis.">
        <form id="search-teachers" onSubmit={searchTeacher}>
          <Select
            name="subject"
            label="Matéria/Favoritos"
            value={subject}
            onChange={(e) => subjectFilter(e.target.value)}
            options={[
              { value: "Favoritos", label: "Favoritos" },
              { value: "Artes", label: "Artes" },
              { value: "Biologia", label: "Biologia" },
              { value: "Ciências", label: "Ciências" },
              { value: "Educação física", label: "Educação física" },
              { value: "Física", label: "Física" },
              { value: "Quimica", label: "Quimica" },
              { value: "Matemática", label: "Matemática" },
              { value: "Português", label: "Português" },
            ]}
          />
          <Select
            name="week_day"
            label="Dia da Semana"
            value={week_day}
            onChange={(e) => setWeek_day(e.target.value)}
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
            type="time"
            name="time"
            label="Hora"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />

          <button type="submit" disabled={buttonDisabled}>
            Buscar
          </button>
        </form>
      </PageHeader>

      <main>
        {teachers.map((teacher: Teacher) => {
          return <TeacherItem key={teacher.id} teacher={teacher} isFavorite={searchFavoriteOnStorage(teacher.id)} />;
        })}
      </main>
    </div>
  );
};

export default TeacherList;
