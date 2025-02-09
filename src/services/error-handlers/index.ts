export const handleUncaughtErrors = async (err: Error) => {
  console.log(' UNCAUGHT EXCEPTION ' + new Date());
  console.log(`[Inside 'uncaughtException' event] ${err.stack || err.message}`);
};

export const handleUnhandledRejections = (reason: any, promise: Promise<any>) => {
  console.log(' UNHANDLED REJECTION ' + new Date());
  console.log('Unhandled Rejection at:', promise, 'REASON:', reason);
};
