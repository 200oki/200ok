import { Comment } from "../db/index.js";
import crypto from "crypto";

class CommentService {
  /** 댓글을 저장하는 함수
   *
   * @param {String} villager - 댓글 달 주민의 이름
   * @param {String} comment - 댓글 내용
   * @param {String} nickname - 댓글을 다는 사용자의 닉네임
   * @param {String} location - 현재 댓글 다는 곳의 위치
   * @returns {Object}
   */
  static async addComment({ villager, comment, nickname, location }) {
    const id = crypto.randomUUID();
    const newComment = {
      id,
      villager,
      location,
      nickname,
      comment,
    };
    const createdComment = await Comment.create({ newComment });
    const body = {
      villager: createdComment.villager,
      nickname: createdComment.nickname,
      comment: createdComment.comment,
      createdAt: createdComment.createdAt,
    };
    return body;
  }
  /** 댓글을 검색하는 함수
   *
   * @param {String} villager - 댓글을 검색할 주민의 이름
   * @param {String} location - 댓글 검색할 곳의 위치
   * @returns {Object}
   */
  static async listComment({ villager, location }) {
    const readComment = await Comment.commentList({
      villager,
      location,
    });
    return readComment;
  }

  static async listHonor({ location }) {
    const comments = await Comment.honorList({ location });
    return comments;
  }
}

export { CommentService };
