const asyncHandler = require("express-async-handler");
const UserModel = require("../models/userModel");
const RoleModel = require("../models/roleModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class AuthController {
  generateToken = (id, roles) => {
    const payload = { id, roles };
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "8h" });
  };

  // 1. Валідуємо всі обов'язкові поля в контролері
  // 2. Шукаємо користувача в БД
  // 3. Якщо знайли такого користувача - відправляємо помилку залогінься
  // 4. Якщо не знайшли - хешуємо пароль
  // 5. Зберігаємо користувача в БД

  register = asyncHandler(async (req, res) => {
    const { userEmail, userPassword } = req.body;
    if (!userEmail || !userPassword) {
      throw new Error("User  email and password is required");
    }
    const candidate = await UserModel.findOne({ userEmail });
    if (candidate) {
      throw new Error("User already exists. Please login");
    }

    const hashPassword = bcrypt.hashSync(userPassword, 5);

    if (!hashPassword) {
      throw new Error("Unable to hash password");
    }

    const candidateRole = await RoleModel.findOne({ value: "ADMIN" });

    const user = await UserModel.create({
      ...req.body,
      userPassword: hashPassword,
      roles: [candidateRole.value],
    });

    if (!user) {
      throw new Error("Unable to save user to DB");
    }

    res.status(201).json({
      code: 201,
      status: "success",
      data: user,
    });
  });

  // 1. Валідуємо всі обов'язкові поля в контролері
  // 2. Шукаємо користувача в БД
  // 3. Перевіряємо логін і пароль з тим, що ввів користувач і з тим, що у нас в БД
  // 4. Якщо введені логін або пароль не валідні - віддаємо помилку "Invalid login or password"
  // 5. Якщо введені логін або пароль валідні - то видаємо токен
  login = asyncHandler(async (req, res) => {
    const { userEmail, userPassword } = req.body;
    if (!userEmail || !userPassword) {
      throw new Error("User email and password is required");
    }

    const user = await UserModel.findOne({ userEmail });
    const validPassword = bcrypt.compareSync(userPassword, user.userPassword);
    if (!user || !validPassword) {
      throw new Error("Invalid login or password");
    }

    user.token = this.generateToken(user._id, user.roles);
    await user.save();

    if (!user.token) {
      throw new Error("Unable to save token");
    }

    res.status(200).json({
      code: 200,
      status: "success",
      data: user,
    });
  });

  // 1. Нам потрібна мідлвара, яка буде первіряти наш токен
  // 2. В цій мідлварі ми дані про користувача записуємо в req.user. Потім можемо юзати де завгодно.
  // 3. В req.user.id дані про id користувача
  // 4. Виконуємо пошук користуача в БД по id
  // 5. Записуємо користувачу token = null
  logout = asyncHandler(async (req, res) => {
    // console.log("ex: ", req.user);
    const user = await UserModel.findById(req.user.id);
    console.log(user);
    if (!user) {
      throw new Error("Unable to find user");
    }

    user.token = null;
    await user.save();

    if (user.token) {
      throw new Error("Unable to remove token");
    }
    res.status(200).json({
      code: 200,
      status: "success",
      message: "logout success",
    });
  });

  info = asyncHandler(async (req, res) => {
    res.send("get all user info");
  });
}

module.exports = new AuthController();
