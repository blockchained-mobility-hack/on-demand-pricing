import {Provides} from 'typescript-ioc';
import {default as W3, default as Web3} from 'web3';

/**
 * Unique way to identify a configuration.
 * Configuration settings can be joined in groups with a certain purpose.
 */
export enum ConfigurationKey {

  /**
   * Identifies the travel targets configuration group.
   */
  TravelTargets = 0,

  /**
   * Identifies travel events configuration group.
   */
  Events = 1
}

/**
 * Define the functionality for the configuration service.
 * This service is mean to manage all te configuration related
 * tasks.
 */
export abstract class ConfigService {

  /**
   * Returns the configuration for a given key.
   * For each group the configuration is a JSON object
   */
  abstract getConfig(key: ConfigurationKey): any;
  abstract getWeb3(): W3;
}

/**
 * Environment variables based configuration.
 * Here are the variables and their semantic.
 * <ul>
 * <li>WEB_URL - the URL to the node to be connected.
 * <li>TARGETS_CONTRACT_FILE
 * <li>TARGETS_CONTRACT_OWNER_ADDRESS
 * <li>TARGETS_CONTRACT_OWNER_PKEY
 * <li>TARGETS_CONTRACT_ADDRESS
 * </ul>
 */
@Provides(ConfigService)
export class ConfigServicesImpl implements ConfigService {

  /**
   * Holds all the entire configuration organized in groups, each group has its own key.
   */
  readonly configs: Map<ConfigurationKey, any>;

  /**
   * The web3 client used to communicate with the underlying block.
   */
  readonly web3: W3;

  constructor() {
    this.configs = new Map<ConfigurationKey, any>();
    this.web3  = this.buildWeb3();
    this.configs.set(
      ConfigurationKey.TravelTargets,
      {
        'owner': '0x00a329c0648769a73afac7f9381e08fb43dbea72', // tslint:disable-line:object-literal-sort-keys
        'transactionHash': '0x', // tslint:disable-line:object-literal-sort-keys
        'gas': 100000000, // tslint:disable-line:object-literal-sort-keys
        'gasPrice': 1, // tslint:disable-line:object-literal-sort-keys
        'contract': { // tslint:disable-line:object-literal-sort-keys
          'file': 'TravelTargets.sol', // tslint:disable-line:object-literal-sort-keys
          'address': '0x29fa4fd8f4de1f0a73b90df2b95780754b728d60', // tslint:disable-line:object-literal-sort-keys
          'abi': [] // tslint:disable-line:object-literal-sort-keys
        },
        'accountToKey': { // tslint:disable-line:object-literal-sort-keys
          '0x00a329c0648769a73afac7f9381e08fb43dbea72': '0x4d5db4107d237df6a3d58ee5f70ae63d73d7658d4026f2eefd2f204c81682cb7' // tslint:disable-line:object-literal-sort-keys
        }
      }
    );
  }

  /**
   * Builds a Web3 insance based on the <b>WEB3_URL</b>
   * environment variable.
   * Following values are supported:
   * <ul>
   * <li>http://.... for HttpProvider web3 instances.
   * <li>ws://....   for WebsocketProvider web3 instances.
   * </ul>
   * Any other protocol (than http or ws) is not supported.
   * If the <b>WEB3_URL</b> environment variable is not available then
   * the http://localhost:8545 is used.
   */
  private buildWeb3(): W3  {
    let web3Url =  process.env.WEB3_URL;
    web3Url = !web3Url ? 'http://localhost:8545' : web3Url;

    if (web3Url.indexOf('http') === 0) {
      return new Web3(new Web3.providers.HttpProvider(web3Url));
    }

    if (web3Url.indexOf('ws') === 0) {
      return new Web3(new Web3.providers.WebsocketProvider(web3Url));
    }

    throw Error('web3 url not supported.');
  }

  getConfig(key: ConfigurationKey): any {
    return this.configs.get(key);
  }

  getWeb3(): Web3 {
    return this.web3;
  }
}
