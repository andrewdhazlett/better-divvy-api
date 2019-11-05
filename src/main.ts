import * as cluster from 'cluster';
import * as os from 'os';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  console.log(`Worker ${process.pid} started`);
}

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);
  for (const _ of os.cpus()) {
    cluster.fork();
  }

  cluster.on('exit', worker => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  bootstrap();
}
