import { CsmModel } from "../schemas/csm.js";

class Csm {
  static async getCount({ villager }) {
    const count = await CsmModel.aggregate([
      {
        $match: {
          name_ko: villager,
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
    ]);
    return count;
  }

  static async upCount({ villager }) {
    const up = await CsmModel.findOneAndUpdate(
      { name_ko: villager },
      { $inc: { count: 1 } }
    );
    return up;
  }

  static async totalCount() {
    const total = await CsmModel.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$count" },
        },
      },
    ]);
    return total;
  }
}
