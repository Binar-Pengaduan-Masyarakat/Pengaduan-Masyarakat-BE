  module.exports = class {
    static authResponse = (res, statusCode, data) => {
        res.status(statusCode).json({
          status: "success",
          data: data,
        });
      };
      
    static handleError = (res, error, message) => {
        console.error(`${message}:`, error);
        res.status(500).json({
          status: "error",
          message: message,
        });
      };
  };