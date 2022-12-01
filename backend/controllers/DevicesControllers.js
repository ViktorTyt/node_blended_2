const DeviceModel = require("../models/deviceModel");
const asyncHandler = require("express-async-handler");

class DevicesControllers {
  create = asyncHandler(async (req, res) => {
    const { vendor, price } = req.body;
    if (!vendor || !price) {
      res.status(400);
      throw new Error("please provide vendor and/or price");
    }
    const data = await DeviceModel.create(req.body);

    if (!data) {
      res.status(400);
      throw new Error("please provide vendor and/or price");
    }

    res.status(201).json({
      code: 201,
      status: "success",
      data,
    });
  });

  getAll = asyncHandler(async (req, res) => {
    const data = await DeviceModel.find({});
    if (!data) {
      res.status(400);
      throw new Error("unable to fetch devices");
    }

    res.status(200).json({
      code: 200,
      status: "success",
      data,
      total: data.length,
    });
  });

  getOne = asyncHandler((req, res) => {
    res.send("get one device");
  });

  update = asyncHandler((req, res) => {
    res.send("update one device");
  });

  remove = asyncHandler((req, res) => {
    res.send("remove one device");
  });
}

// express.get(
//   "/",
//   asyncHandler(async (req, res, next) => {
//     const bar = await foo.findAll();
//     res.send(bar);
//   })
// );

module.exports = new DevicesControllers();
