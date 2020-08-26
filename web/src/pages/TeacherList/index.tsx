import React, { useState, FormEvent, useContext } from "react";
import { Teacher } from "../../Utils/interfaces";

import { apiGet } from "../../services/api";
import getSave, { getIds } from "../../Utils/storage";

import { UserContext } from "../../store";

import PageHeader from "../../components/PageHeader";
import TeacherItem from "../../components/TeacherItem";
import Input from "../../components/Input";
import Select from "../../components/Select";
import Pagination from "../../components/Pagination";

import "./styles.css";

const CLASSES_FOR_PAGE = 5;
export const FAVORITES = "Favorites";

const TeacherList = () => {
  const AuthProvider = useContext(UserContext);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [teachers, setTeachers] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [subject, setSubject] = useState("");
  const [week_day, setWeek_day] = useState("");
  const [time, setTime] = useState("");

  const searchTeacher = async (e: FormEvent) => {
    e.preventDefault();
    const params = {
      subject,
      week_day,
      time,
      page,
    };

    const { data } = await apiGet("/classes/list", params);
    if (data.classes) setTeachers(data.classes);
    if (data.count) setTotalPages(data.count / CLASSES_FOR_PAGE);
  };

  const searchFavoriteOnStorage = (id: number) => {
    const favorites = getIds();

    return favorites.indexOf(id) >= 0 ? true : false;
  };

  const subjectFilter = (value: string) => {
    if (value === FAVORITES) {
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
      <PageHeader
        title="Estes são os proffys disponíveis."
        description=""
        avatar={AuthProvider?.user.account ? AuthProvider?.user.account.avatar : ""}
        user_id={AuthProvider?.user.account ? AuthProvider?.user.account.id : 0}
      >
        <form id="search-teachers" onSubmit={searchTeacher}>
          <Select
            name="subject"
            label="Matéria/Favoritos"
            value={subject}
            onChange={(e) => subjectFilter(e.target.value)}
            options={[
              { value: "Favorites", label: "Favoritos" },
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
        {teachers.length >= 1 ? (
          <>
            {teachers.map((teacher: Teacher) => {
              return (
                <TeacherItem
                  key={teacher.id}
                  teacher={teacher}
                  isFavorite={searchFavoriteOnStorage(teacher.id)}
                />
              );
            })}
            <Pagination page={page} totalPages={totalPages} setPage={setPage} />
          </>
        ) : null}
      </main>
    </div>
  );
};

export default TeacherList;
