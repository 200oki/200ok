import { Csm } from "../db/index.js";

class CsmService {
  static async getCount({ villager }) {
    const count = await Csm.getCount({ villager });
    const totalList = await Csm.totalCount();
    const total = totalList[0].total;
    count[0]["total"] = total;
    const avg = ((count[0].count / count[0].total) * 100).toFixed(2);
    count[0]["avg"] = avg;
    const body = {
      success: true,
      payload: count[0],
    };
    return body;
  }

  static async upCount({ villager }) {
    const up = await Csm.upCount({ villager });
    return up;
  }

  static async totalCount() {
    const totalList = await Csm.totalCount();
    const total = totalList[0].total;
    return total;
  }
}
