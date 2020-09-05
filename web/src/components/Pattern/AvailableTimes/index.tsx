import React from "react";

import Select from "../../Select";
import Input from "../../Input";

import "./styles.css";

interface HoursProps {
  scheduleItems: Array<{ week_day: number; from: string; to: string }>;
  addNewScheduleItem: Function;
  setScheduleItemValue: Function;
}

const AvailableTimes: React.FC<HoursProps> = ({
  scheduleItems,
  addNewScheduleItem,
  setScheduleItemValue,
}) => {
  return (
    <fieldset id="available-times">
      <legend className="new-schedule">
        Horários disponíveis
        <button type="button" onClick={() => addNewScheduleItem()}>
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
                { value: "3", label: "Quinta-feira" },
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
  );
};

export default AvailableTimes;
