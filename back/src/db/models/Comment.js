import { CommentModel } from "../schemas/Comment.js";

class Comment {
  static async create(newComment) {
    const createNewComment = await CommentModel.findOneAndUpdate(
      { villager: newComment.villager },
      { $push: { comment: newComment.comment } }
    );
    return createNewComment;
  }

  static async read({ villager }) {
    const list = await CommentModel.findOne({ villager });
    return list;
  }
}

export { Comment };
