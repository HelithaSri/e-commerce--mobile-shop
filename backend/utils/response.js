function commonResponse(status, title, message, data = {}) {
    return {
      status,
      title,
      message,
      data,
    };
  }
  
  module.exports = commonResponse;