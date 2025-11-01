import Team from "../models/team.model.js";
import User from "../models/user.model.js";

class TeamDao {
  async getTeamByUserId(userId) {
    const user = await User.findById(userId).populate("teams");

    // validaciones previas: buscar si o si un id de usuario, sino, error
    if (!user) {
      const force = await User.findOne({ _id: userId });
      if (!force) throw new Error("User not found");
      throw new Error("User has no team assigned");
    }

    const team = user ? user.myTeam : null;
    return team;
  }

  async createTeam(teamData) {
    const newTeam = await Team.create(teamData);
    return newTeam;
  }
}

const teamDao = new TeamDao();
export default teamDao;
