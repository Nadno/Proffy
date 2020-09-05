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

export default class ClassesController {
  async index(req: Request, res: Response) {
    const { page = 1 } = req.query;
    const filters = req.query;

    const week_day = filters.week_day as string;
    const subject = filters.subject as string;
    const time = filters.time as string;

    if (!week_day || !subject || !time) {
      return response(res, 200, {
        message: "Missing filters to search classes",
      });
    }

    const timeInMinutes = convertHourToMinutes(time);

    function ClassSchedule(this: QueryBuilder) {
      this.select("class_schedule.*")
        .from("class_schedule")
        .whereRaw("`class_schedule`.`class_id` = `classes`.`id`")
        .whereRaw("`class_schedule`.`week_day` = ??", [Number(week_day)])
        .whereRaw("`class_schedule`.`from` <= ??", [timeInMinutes])
        .whereRaw("`class_schedule`.`to` > ??", [timeInMinutes]);
    };

    const [count] = await db("classes")
      .whereExists(ClassSchedule)
      .where("classes.subject", "=", subject)
      .join("users", "classes.user_id", "=", "users.id")
      .count();
    const classes = await db("classes")
      .whereExists(ClassSchedule)
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

    return response(res, 200, {
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

    return response(res, 200, { class_id });
  }

  async update(req: Request, res: Response) {
    const { email, password, subject } = req.body;
    const SELECT = ["password", "id"];

    const verify = await verifyAccount(res, SELECT, { email, password });
    if (!verify.ok)
      return response(res, 400, { message: verify.ERRO_IN_ACCOUNT });

    try {
      await db("classes")
        .update({
          subject,
        })
        .where("user_id", "=", verify.account[0].id);

      return response(res, 200, { message: "success!" });
    } catch (err) {
      return response(res, 400, {
        message: "Ocorreu um erro inesperado, por favor tente mais tarde!",
      });
    }
  }

  async delete_schedule(req: Request, res: Response) {
    const { email, password, from, to } = req.body;
    const SELECT = ["password"];
    //TÁ ERRADO TEM QUE PEGAR O ID DA CLASSE TAMBÉM É ISSO!
    const verify = await verifyAccount(res, SELECT, { email, password });
    if (!verify.ok)
      return response(res, 400, { message: verify.ERRO_IN_ACCOUNT });

    try {
      const teste = db("class_schedule")
        .delete()
        .where("from", "=", from)
        .where("to", "=", to);

      console.log(teste);
    } catch (err) {
      console.log(err);
    };
  };
};
