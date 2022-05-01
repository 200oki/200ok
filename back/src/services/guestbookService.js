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
}


export { GuestbookService };