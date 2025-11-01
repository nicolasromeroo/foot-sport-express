import teamDao from "../dao/team.dao";

export const getMyTeam = async (req, res) => {
  try {
    const team = await teamDao.getTeamByUserId(req.user._id);

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
  return res.status(200).json({ team });
};

export const createMyTeam = async (req, res) => {
  const { name, born, players } = req.body;

  const team = await teamDao.createTeam({
    name,
    born,
    players,
  });
};
