import { Csm } from "../db/index.js";

class CsmService {
  static async getCount({ id }) {
    const count = await Csm.getCount({ id });
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

  static async upCount({ id }) {
    const up = await Csm.upCount({ id });
    const body = {
      id: up.id,
      name_ko: up.name_ko,
      image_photo: up.image_photo,
      count: up.count,
    };
    return body;
  }

  static async totalCount() {
    const totalList = await Csm.totalCount();
    const total = totalList[0].total;
    return total;
  }
}

export { CsmService };
