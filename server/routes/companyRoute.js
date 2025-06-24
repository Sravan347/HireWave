const express = require("express");

import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/company"
import isAuthenticated from "../middlewares/isAuthenticated";
import { singleUpload } from "../middlewares/mutler";

const router = express.Router();

router.route("/register").post(isAuthenticated,registerCompany);
router.route("/get").get(isAuthenticated,getCompany);
router.route("/get/:id").get(isAuthenticated,getCompanyById);
router.route("/update/:id").put(isAuthenticated,singleUpload, updateCompany);

module.exports = router;

