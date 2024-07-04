const sendResponse = (res, statusCode, data) => {
  res.status(statusCode).json({
    status: "success",
    data: data,
  });
};

const handleError = (res, error, message) => {
  console.error(`${message}:`, error);
  res.status(500).json({
    status: "error",
    message: message,
  });
};

module.exports = {
  sendResponse,
  handleError,
};
