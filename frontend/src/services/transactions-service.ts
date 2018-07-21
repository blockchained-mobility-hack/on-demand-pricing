import {Tx} from 'web3/types';

/**
 * Top level class for the other services that create transactions to Smart Contract
 * based on a given configuration.
 */
export abstract class TransactionBuilder {

  /**
   * Builds a raw transaction for a given configuration
   * and some arguments.
   */
  protected buildRawTx(configService: ConfigService, configKey: ConfigurationKey, methodName: string, args: any[]): Tx {

  }
}
