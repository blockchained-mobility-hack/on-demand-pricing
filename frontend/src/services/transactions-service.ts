import {Tx} from 'web3/types';
import {ConfigService, ConfigurationKey} from './config-service';
import {Web3Util} from './web3-service';

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
    const web3 = configService.getWeb3();
    const cfg = configService.getConfig(configKey);
    const abi = cfg.contract.abi;
    const contractAddress = cfg.contract.address;
    // gas and gas values are hardcoded for the moment
    const gas = 1000000;
    const gasPrice = '1';
    return Web3Util.buildRawTransaction(web3, methodName, abi, contractAddress, args, gas, gasPrice);
  }
}
