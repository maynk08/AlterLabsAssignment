import cors from 'cors';
import express, { Express } from 'express';
import { createServer, Server } from 'http';

const PORT: number = parseInt(String(process.env.PORT), 10);
const HOST: string = '0.0.0.0';

const appLoader = async (app: Express, router: any) =>
  new Promise<any>((resolve) => {
    const server: Server = createServer(app);
    app.use(
      cors({
        origin: true,
        credentials: true,
      })
    );
    app.use(
      express.json({
        limit: '10mb',
      })
    );
    app.use(
      express.urlencoded({
        extended: true,
      })
    );

    app.use('/api', router);
    app.use((req, res) => {
      res.status(404).send({
        success: false,
        data: undefined,
        message: 'the resource you are looking for is not found.',
      });
    });

    server.listen(PORT, HOST, () => {
      console.log('App is running');
      resolve(true);
    });
  });

export { appLoader };
