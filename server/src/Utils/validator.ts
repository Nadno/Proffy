import { Request, Response, NextFunction } from "express";
import { Joi } from "celebrate";

const rules = {
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z-0-9]{3,30}$")),
};
const options = { abortEarly: true };

const accountSingIn = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const schema = Joi.object({
    email: rules.email,
    password: rules.password,
  });

  const { error } = schema.validate({ email, password }, options);

  if (error) {
    const details = error["details"][0];
    const { type, path } = details;
    
    return res.json({
      status: 400,
      message: type,
      field: path[0],
    });
  };

  next();
};

const accountSingUp = (req: Request, res: Response, next: NextFunction) => {
  const {
    email,
    password,
    password_confirmation,
    name,
    avatar,
    whatsapp,
    bio,
  } = req.body;

  const schema = Joi.object({
    email: rules.email,
    password: rules.password,
    password_confirmation: Joi.string().valid(Joi.ref('password')).required(),
    name: Joi.string().required(),
    avatar: Joi.string(),
    bio: Joi,
    whatsapp: Joi.string().pattern(
      new RegExp(/^([0-9]{2})([9]{1})?([0-9]{4})([0-9]{4})$/)
    ),
  });

  const { error } = schema.validate({ 
    email, password, password_confirmation, name, avatar, whatsapp, bio 
  }, options);

  if (error) {
    const details = error["details"][0];
    const { type, path } = details;
    
    return res.json({
      status: 400,
      message: type,
      field: path[0],
    });
  }

  next();
};


export {
  accountSingIn,
  accountSingUp,
}
