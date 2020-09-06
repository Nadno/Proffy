import { Request, Response } from "express";
import db from "../database/connection";
import { QueryBuilder } from "knex";

import response from "../Utils/returnResponse";
import convertHourToMinutes from "../Utils/convertHourToMinutes";

import bcrypt from "bcrypt";
import verifyAccount from "../Utils/verifyAccount";

export interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

const STATUS_CODE_OK = 200;
const STATUS_CODE_BAD_REQUEST = 400;

export default class ClassesController {
  async index(req: Request, res: Response) {
    const { page = 1 } = req.query;
    const filters = req.query;

    const week_day = filters.week_day as string;
    const subject = filters.subject as string;
    const time = filters.time as string;

    if (!week_day || !subject || !time)
      return response(res, STATUS_CODE_OK, {
        message: "Missing filters to search classes",
      });

    const timeInMinutes = convertHourToMinutes(time);

    function searchClassSchedule(this: QueryBuilder) {
      this.select("class_schedule.*")
        .from("class_schedule")
        .whereRaw("`class_schedule`.`class_id` = `classes`.`id`")
        .whereRaw("`class_schedule`.`week_day` = ??", [Number(week_day)])
        .whereRaw("`class_schedule`.`from` <= ??", [timeInMinutes])
        .whereRaw("`class_schedule`.`to` > ??", [timeInMinutes]);
    }

    const [count] = await db("classes")
      .whereExists(searchClassSchedule)
      .where("classes.subject", "=", subject)
      .join("users", "classes.user_id", "=", "users.id")
      .count();
    const classes = await db("classes")
      .whereExists(searchClassSchedule)
      .where("classes.subject", "=", subject)
      .join("users", "classes.user_id", "=", "users.id")
      .limit(5)
      .offset((Number(page) - 1) * 5)
      .select(
        "users.name",
        "users.email",
        "users.avatar",
        "users.whatsapp",
        "users.bio",
        "users.jwtVersion",
        "classes.*"
      );

    return response(res, STATUS_CODE_OK, {
      classes,
      count: count["count(*)"],
    });
  }

  async create(req: Request, res: Response) {
    const { subject, cost, schedule, user_id } = req.body;

    const insertedClassesIds = await db("classes").insert({
      subject,
      cost,
      user_id,
    });

    const class_id = insertedClassesIds[0];
    const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
      return {
        week_day: scheduleItem.week_day,
        from: convertHourToMinutes(scheduleItem.from),
        to: convertHourToMinutes(scheduleItem.to),
        class_id,
      };
    });

    await db("class_schedule").insert(classSchedule);

    return response(res, STATUS_CODE_OK, { class_id });
  }

  async update(req: Request, res: Response) {
    const { email, password, subject, cost } = req.body;
    const SELECT = ["password", "id"];

    const verify = await verifyAccount(SELECT, { email, password });
    if (!verify.ok)
      return response(res, STATUS_CODE_BAD_REQUEST, {
        message: verify.ERRO_IN_ACCOUNT,
      });

    try {
      await db("classes")
        .update({
          subject,
          cost,
        })
        .where("user_id", "=", verify.account[0].id);

      return response(res, STATUS_CODE_OK, { message: "success!" });
    } catch (err) {
      return response(res, STATUS_CODE_BAD_REQUEST, {
        message: "Ocorreu um erro inesperado, por favor tente mais tarde!",
      });
    }
  }

  async delete_schedule(req: Request, res: Response) {
    const { email, password } = req.body;
    const SELECT = ["password", "id"];

    const verify = await verifyAccount(SELECT, { email, password });
    if (!verify.ok)
      return response(res, STATUS_CODE_BAD_REQUEST, {
        message: verify.ERRO_IN_ACCOUNT,
      });
    const filters = req.query;

    const DELETE_ERROR = "Ocorreu um erro ao deletar o horário!";

    const week_day = filters.week_day as string;
    const subject = filters.subject as string;
    const time = filters.time as string;

    if (!week_day || !subject || !time)
      return response(res, STATUS_CODE_OK, {
        message: DELETE_ERROR,
      });

    const timeInMinutes = convertHourToMinutes(time);
    function searchClassSchedule(this: QueryBuilder) {
      this.select("class_schedule.*")
        .from("class_schedule")
        .whereRaw("`class_schedule`.`class_id` = `classes`.`id`")
        .whereRaw("`class_schedule`.`week_day` = ??", [Number(week_day)])
        .whereRaw("`class_schedule`.`from` <= ??", [timeInMinutes])
        .whereRaw("`class_schedule`.`to` > ??", [timeInMinutes]);
    }
    const DELETE_SUCCESS = "Horário deletado!";

    try {
      const classId = await db("classes")
        .where("classes.user_id", "=", verify.account[0].id)
        .whereExists(searchClassSchedule)
        .select("id");
      const [count] = await db("classes")
        .where("classes.user_id", "=", verify.account[0].id)
        .whereExists(searchClassSchedule)
        .count();

      if (count["count(*)"] === 1) {
        await db("classes")
          .where("classes.user_id", "=", verify.account[0].id)
          .whereExists(searchClassSchedule)
          .where("classes.subject", "=", subject)
          .delete();
      };

      await db("class_schedule")
        .where("class_schedule.class_id", "=", classId[0].id)
        .delete("*");

      return response(res, STATUS_CODE_OK, { message: DELETE_SUCCESS });
    } catch (err) {
      return response(res, STATUS_CODE_OK, {
        message: DELETE_ERROR,
      });
    }
  }
}
