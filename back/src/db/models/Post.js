import { PostModel } from "../schemas/post.js";

class Post {
  static async create({ newPost }) {
    const createPost = await PostModel.create(newPost);
    return createPost;
  }
}

export { Post };
