import { Router } from "express";
import multer from "multer";
import path from "path";
import { getAllAgents, loginUser, registerUser, uploadFile } from "../controllers/auth.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, `${file.originalname}`);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = [".csv", ".xlsx", ".xls"];

    const ext = path.extname(file.originalname).toLowerCase();

    if(allowedTypes.includes(ext))
        cb(null, true);
    else
        cb(new Error("Only CSV, XLSX or XLS files are allowed"), false);
}

const upload = multer({storage, fileFilter});

//un-protected routes
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

//protected routes
router.route("/get-agents").get(verifyJWT, getAllAgents);
router.route("/upload-file").post(verifyJWT, upload.single("file"), uploadFile);

export default router;