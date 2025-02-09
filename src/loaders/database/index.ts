import mongoose from 'mongoose';
const databaseLoader = async () =>
  new Promise<any>((resolve, reject) => {
    mongoose
      .connect(String(process.env.MONGO_URI))
      .then(() => {
        resolve(true);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });

export { databaseLoader };
