import { HttpModule, Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { WikiService } from './wikipedia.service'

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [WikiService]
})
export class AppModule {}
