import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot(
      (() => {
        return {
          rootPath: resolve('./public'),
          serveRoot: '/public',
        };
      })(),
    ),
  ],
})
export class PathModule {}
