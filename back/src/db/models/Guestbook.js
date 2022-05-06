import { GuestbookModel } from "../schemas/guestbook.js";

class Guestbook {
  /** 방명록 오브젝트 생성 함수
   * 
   * @param {Number} id - 유저 id
   * @param {String} content - 방명록 내용
   */
  static async create({ id, date, content }) {
    const createNewContent = await GuestbookModel.create({ id, date, content });
    return createNewContent;
  }
  
  /** 아이디가 일치하는 유저의 방명록을 반환하는 함수
   * 
   * @param {String} id - 유저 id 
   * @returns {Object}
   */
  static async findUserGuestbook({ id }) {
    const guestbook = await GuestbookModel.findOne({ id });
    return guestbook;
  }

  /** 방명록 리스트 반환 함수
   * 
   * @returns {[Object]} - 방명록 전체 반환
   */
  static async findAll() {
    const guestbookList = await GuestbookModel.find().sort({ createdAt: -1 });
    return guestbookList;
  }
}


export { Guestbook };