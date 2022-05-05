import { PostModel } from "../schemas/post.js";

class Post {
  static async create({ newPost }) {
    const createPost = await PostModel.create(newPost);
    return createPost;
  }

  static async find() {
    const posts = await PostModel.find({}, { _id: 0, updatedAt: 0, __v: 0 });
    return posts;
  }

  static async findOne({ id }) {
    const post = await PostModel.findOne(
      { id },
      { _id: 0, updatedAt: 0, __v: 0 }
    );
    return post;
  }
}

export { Post };
