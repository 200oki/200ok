import mongoose from "mongoose";

const Schema = mongoose.Schema;
const model = mongoose.model;

/**
 * @swagger
 *   components:
 *    schemas:
 *      GuestBook:
 *        type: object
 *        required:
 *          - id
 *          - date
 *          - content
 *        properties:
 *          id:
 *            type: number
 *          content:
 *            type: string
 *            description: "방명록 내용"
 *        example:
 *          id: 1
 *          content: 안녕!
 */
const GuestBookSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const GuestbookModel = model("GuestBook", GuestBookSchema);

export { GuestbookModel };
