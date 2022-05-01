import { Guestbook } from "../db/index.js"; 

class GuestbookService {
  /** 방명록 저장 함수
   * 
   * @param {Date} content - 방명록 글 내용
   * @return {Object}
  */
  static async addGuestbook({ content }) {
    const guestbookList = await Guestbook.findAll();
    const id = guestbookList.length + 1;
    const createdGuestbook = await Guestbook.create({ id, content });
    return createdGuestbook;
  }

  /** 유저의 방명록 반환 함수
   * 
   * @param {String} id - 유저 id
   * 
   * @return {Object}
  */
  static async getGuestbook({ id }) {
    const userGuestbook = await Guestbook.findUserGuestbook({ id });
    return userGuestbook;
  }

  /** 전체 방명록 반환 함수
   * 
   * @return {Object} 
  */
  static async getGuestbookList() {
    const guestbookList = await Guestbook.findAll();
    return guestbookList;
  }
}


export { GuestbookService };