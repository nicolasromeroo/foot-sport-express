import Joi from "joi";

export const validateTeam = (team) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    born: Joi.date().required(),
    // 5 vs 5 players -> len por equipo: 5
    players: Joi.array().items(Joi.string().length(5)).required(),
  });

  return schema.validate(team);
};
