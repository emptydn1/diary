const notFound = (req, res, next) => {
  const error = new Error("not found abc");
  console.log("mid1");
  res.status(404);
  next(error);
};

const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  console.log("mid2");
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === "production" ? "ok" : error.stack
  });
};

module.exports = {
  notFound,
  errorHandler
};
