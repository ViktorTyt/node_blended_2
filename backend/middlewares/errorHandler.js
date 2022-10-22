module.exports = (err, req, res, next) => {
  // console.log(res.statusCode);
  let statusCode = "";
  if (res.statusCode) {
    statusCode = res.statusCode;
  } else {
    statusCode = 500;
  }

  let stack = "";
  if (process.env.NODE_ENV === "production") {
    stack = null;
  } else {
    stack = err.stack;
  }

  res.status(statusCode);
  res.json({ message: err.message, stack });
};
