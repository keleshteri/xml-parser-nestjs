import { Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
/**
 * XmlHashingService
 */
@Injectable()
export class XmlHashingService {
  private readonly logger = new Logger(XmlHashingService.name);
  private readonly saltRounds = 10;

  /**
   * Generates a content hash for the given XML content.
   * @param xmlContent The XML content to generate the hash for.
   * @returns A promise that resolves to the generated content hash.
   */
  async generateHash(xmlContent: string): Promise<string> {
    try {
      const hash = await bcrypt.hash(xmlContent, this.saltRounds);
      return hash;
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`Error generating content hash: ${error.message}`);
        throw new Error('Hashing algorithm not supported.');
      }
      //   throw error;
      return '';
    }
  }

  /**
   * Verifies the XML content against a given hash.
   * @param xmlContent The XML content to verify.
   * @param hash The hash to verify against.
   * @returns A promise that resolves to a boolean indicating if the content and hash match.
   */
  async verifyHash(xmlContent: string, hash: string): Promise<boolean> {
    try {
      return await bcrypt.compare(xmlContent, hash);
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`Error verifying content hash: ${error.message}`);
      }
      //   throw error;
      return false;
    }
  }
}
