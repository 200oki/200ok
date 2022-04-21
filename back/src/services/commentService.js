import { Comment } from "../db/index.js";
class CommentService {
  static async addComment({ villager, comment }) {
    const newComment = {
      villager,
      comment,
    };
    const createdComment = await Comment.create(newComment);
    return createdComment;
  }

  static async listComment({ villager }) {
    const readComment = await Comment.read({ villager });
    return readComment.comment;
  }
}

export { CommentService };
