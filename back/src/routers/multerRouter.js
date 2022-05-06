import multer from "multer";
import { Router } from "express";

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== '.png' || ext !== '.jpg') {
      return cb(res.status(400).end('only png, jpg are allowed'), false);
    }
    cb(null, true);
  }
});

const upload = multer({ storage: storage }).single("file");