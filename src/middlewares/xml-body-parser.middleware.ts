import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NestMiddleware,
} from '@nestjs/common';
import { XmlHashingService, XmlParserService } from '../services';

/**
 * XmlBodyParserMiddleware
 */
@Injectable()
export class XmlBodyParserMiddleware implements NestMiddleware {
  /**
   * Logger instance for XmlBodyParserMiddleware.
   */
  private readonly logger = new Logger(XmlBodyParserMiddleware.name);
  /**
   * Constructs a new instance of the XmlBodyParserMiddleware class.
   * @param xmlParserService The XmlParserService instance used for parsing XML.
   */
  constructor(
    private readonly xmlParserService: XmlParserService,
    private xmlHashingService: XmlHashingService,
  ) {}
  /**
   * Middleware function to parse XML request body.
   * If the request content-type is 'application/xml' or 'text/xml', it parses the XML data and sets it as the request body.
   * If the parsing fails, it throws an HttpException with a status code of 400 (Bad Request).
   * @param req - The request object.
   * @param res - The response object.
   * @param next - The next function to call in the middleware chain.
   */
  use(req: any, res: any, next: () => void) {
    this.logger.log(`XmlBodyParserMiddleware activated for ${req.url}`);

    if (
      req.headers['content-type'] === 'application/xml' ||
      req.headers['content-type'] === 'text/xml'
    ) {
      let data = '';
      req.on('data', (chunk: string) => {
        data += chunk;
      });
      req.on('end', async () => {
        if (data) {
          try {
            const jsonObj = await this.xmlParserService.parseXml(data);
            const hash = await this.xmlHashingService.generateHash(data);
            // req.body = jsonObj;
            req.body = { content: jsonObj, hashContent: hash };
          } catch (error) {
            this.logger.error(error);
            throw new HttpException(
              'Error parsing XML',
              HttpStatus.BAD_REQUEST,
            );
          }
        }
        next();
      });
    } else {
      next();
    }
  }
}
