import multer from "multer";
import fs from "fs";

try {
  fs.readdirSync("uploads"); // 폴더 존재 유무 확인
} catch (err) {
  console.log("이미지 저장 폴더를 생성 합니다.");
  fs.mkdirSync("uploads");
}

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, process.env.IMAGE_DIR);
    },
    filename(req, file, cb) {
      cb(null, Date.now() + file.originalname);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5mb로 이미지 크기 제한
});

export { upload };
