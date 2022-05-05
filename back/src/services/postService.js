import { Post } from "../db/index.js";
import crypto from "crypto";

class PostService {
  static async createPost({ title, content, nickname, images }) {
    const id = crypto.randomUUID();

    const newPost = {
      id,
      title,
      content,
      nickname,
      images,
    };

    const data = await Post.create({ newPost });
    return data;
  }

  static async listPost() {
    const posts = await Post.find();
    return posts;
  }

  static async findPost({ id }) {
    const post = await Post.findOne({ id });
    return post;
  }
}

export { PostService };
