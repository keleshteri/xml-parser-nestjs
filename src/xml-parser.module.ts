import { Module } from '@nestjs/common';
import {
  StreamXmlParserService,
  XmlHashingService,
  XmlParserService,
} from './services';
/**
 * XmlParserModule
 */
@Module({
  providers: [XmlParserService, StreamXmlParserService, XmlHashingService],
  exports: [XmlParserService, StreamXmlParserService, XmlHashingService],
})
export class XmlParserModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(XmlBodyParserMiddleware).forRoutes({
  //     path: '*/xml-listing/upload/content', //TODO: need be more generic,path: '*xml-listing*', '*xml*', '*xml',
  //     method: RequestMethod.POST,
  //   });
  // }
}
