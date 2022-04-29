import db from "../models/index";

let getTopDoctorHomeService = (limitInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.User.findAll({
        limit: limitInput,
        where: { roleId: "R2" },
        order: [["createdAt", "DESC"]],
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: db.Allcode,
            as: "positionData",
            attributes: ["valueEN", "valueVI"],
          },
          {
            model: db.Allcode,
            as: "genderData",
            attributes: ["valueEN", "valueVI"],
          },
        ],
        raw: true,
        nest: true,
      });
      resolve({
        errCode: 0,
        data: users,
      });
    } catch (err) {
      reject(err);
    }
  });
};
module.exports = {
  getTopDoctorHomeService: getTopDoctorHomeService,
};
