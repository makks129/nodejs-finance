import Log from './utils/Log';
import { port } from './config';
import app from './app';

app
  .listen(port, () => {
    Log.info(`Server running on port : ${port}`);
  })
  .on('error', (e: any) => {
    Log.error(e);
  });
