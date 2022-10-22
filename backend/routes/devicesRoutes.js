const { Router } = require("express");
const DevicesControllers = require("../controllers/DevicesControllers");

const router = Router();

// CRUD
router.post("/", DevicesControllers.create);

router.get("/", DevicesControllers.getAll);

router.get("/:id", DevicesControllers.getOne);

router.patch("/:id", DevicesControllers.update);

router.delete("/:id", DevicesControllers.remove);

module.exports = router;
