import { CsmModel } from "../schemas/csm.js";

class Csm {
  static async getCount({ id }) {
    const count = await CsmModel.aggregate([
      {
        $match: {
          id,
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

  static async upCount({ id }) {
    const up = await CsmModel.findOneAndUpdate({ id }, { $inc: { count: 1 } });
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

export { Csm };
