import { Injectable, Logger } from '@nestjs/common';
import { XMLParser } from 'fast-xml-parser';
/********************
 * XmlParserService *
 ********************/
@Injectable()
export class XmlParserService {
  private readonly logger = new Logger(XmlParserService.name);

  private readonly parserOptions = {
    attributeNamePrefix: '',
    textNodeName: 'value',
    ignoreAttributes: false,
    parseAttributeValue: true,
    trimValues: true,
    parseTrueNumberOnly: true,
    numberParseOptions: {
      hex: false,
      leadingZeros: false,
    },
  };

  /**
   * Parses the given XML content and returns the parsed data.
   * @param content The XML content to parse.
   * @returns A Promise that resolves to the parsed data.
   * @throws If there is an error parsing the XML content.
   */
  async parseXml(content: string): Promise<any> {
    try {
      const parser = new XMLParser(this.parserOptions);
      this.logger.log(`XML: starting parsing content`);
      // parse xml to json
      const parsedData = await parser.parse(content);
      this.logger.log('XML: Parsered');
      return parsedData.propertyList;
    } catch (error) {
      const errorMessage = `Error parsing XML content`;
      this.logger.error(errorMessage, error);
      throw new Error(errorMessage);
    }
  }
}
