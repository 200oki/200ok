import { CommentModel } from "../schemas/comment.js";
// import { client } from "../../middlewares/redisMiddleware.js";
class Comment {
  /** 댓글을 생성하는 함수
   *
   * @param {Object} newComment - 생성할 주민 댓글 데이터가 담긴 오브젝트
   * @returns {Object}
   */
  static async create({ newComment }) {
    const createNewComment = await CommentModel.create(newComment);
    return createNewComment;
  }
  /** 댓글을 검색하는 함수
   *
   * @param {String} villager - 댓글을 검색할 주민 이름
   * @param {String} location - 댓글을 검색할 위치
   * @returns {Object}
   */
  static async commentList({ villager, location }) {
    const list = await CommentModel.find(
      { villager, location },
      { _id: 0, __v: 0, id: 0, location: 0, updatedAt: 0 }
    )
      .sort({ createdAt: -1 })
      .lean();
    return list;
  }
  /** 주민 없이 댓글을 검색하는 함수
   *
   * @param {String} location - 댓글을 검색할 위치
   * @returns {Object}
   */
  static async honorList({ location }) {
    const list = await CommentModel.find(
      { location },
      { _id: 0, __v: 0, id: 0, location: 0, updatedAt: 0 }
    )
      .sort({ createdAt: -1 })
      .lean();
    return list;
  }
}

export { Comment };
