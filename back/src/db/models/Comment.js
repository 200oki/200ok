import { CommentModel } from "../schemas/Comment.js";

class Comment {
  /**
   *
   * @param {Object} newComment - 생성할 주민 댓글 데이터가 담긴 오브젝트
   * @returns {Object}
   */
  static async create(newComment) {
    const createNewComment = await CommentModel.create(newComment);
    // const createNewComment = await CommentModel.findOneAndUpdate(
    //   { villager: newComment.villager },
    //   { $push: { comments: newComment.comment } }
    // );
    return createNewComment;
  }
  /**
   *
   * @param {String} villager - 댓글을 검색할 주민 이름
   * @param {String} location - 댓글을 검색할 위치
   * @returns {Object}
   */
  static async commentList({ villager, location }) {
    const list = await CommentModel.find(
      { villager, location },
      { _id: 0, __v: 0, id: 0, villager: 0, location: 0, updatedAt: 0 }
    );
    return list;
  }
}

export { Comment };
