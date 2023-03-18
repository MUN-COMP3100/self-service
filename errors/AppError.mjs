class AppError extends Error {
  constructor(status, ...message) {
      super();
      
      Error.captureStackTrace(this, this.constructor);
      this.name = this.constructor.name;
      
      this.messages = message || 'Unexpected Error Occured';
  
      this.status = status || 500;
  }
}


export default AppError