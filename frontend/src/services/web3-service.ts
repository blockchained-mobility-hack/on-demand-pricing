import { Tx, PromiEvent, ABIDefinition, Contract, Account } from 'web3/types';
import { default as W3 } from 'web3';
import Web3 from "web3";

export class Web3Service {
  private web3: W3;
  private config: any;

  constructor() {
    // @todo: repalce hardcoded host/port of web3 provider
    this.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
  }

  public setConfig(config: any): void {
    this.config = config;
  }

  public getConfig(): any {
    return this.config;
  }

  public getTransactionCount(address: string): Promise<number> {
    return this.web3.eth.getTransactionCount(address);
  }

  public createContractObject(address?: string, contractAbi?: ABIDefinition ): Contract {
    const abi = contractAbi || this.config.contract.abi;
    const contractAddress = address || this.config.contract.address;
    return new this.web3.eth.Contract(abi, contractAddress);
  }

  public async signTransaction(rawTx: Tx, sender?: string): Promise<any> {
    const accountToKey = this.config.accountToKey;
    // change this for vars to make more sense
    const contractUserAddress = sender || this.config.owner;
    const contractUserPrivateKey = accountToKey[contractUserAddress];
    const result = await this.web3.eth.accounts.signTransaction(rawTx, contractUserPrivateKey);
    return result;
  }

  public sendSignedTransaction(signedTx: string): PromiEvent<any> {
    return this.web3.eth.sendSignedTransaction(signedTx);
  }

  public async callMethod(rawTx: any): Promise<any> {
    return this.web3.eth.call(rawTx);
  }

  /**
   * Decode the results for a function return in human readable format
   *
   * @param params Array of parameters
   * @param hex string to decode
   *
   * @returns decoded results
   */
  public decodeParams(params: any[], hex: string): any {
    return this.web3.eth.abi.decodeParameters(params, hex);
  }

  /**
   *
   * @param methodAbi function signature
   * @param params values to pass to function
   */
  public encodeMethod(methodAbi: ABIDefinition, params: any[]): string {
    const encodedMethod = this.web3.eth.abi.encodeFunctionCall(methodAbi, params);
    return encodedMethod;
  }

  /**
   *
   * @param methodName return the abi of a single function from a contract abi
   */
  public getAbiMethodAbi(methodName: string, contractAbi?: ABIDefinition): ABIDefinition {
    const abi = contractAbi || this.config.contract.abi;
    const methodAbi: ABIDefinition = this.web3.utils._.find(abi, (item: any) => { return item.name === methodName;});
    return methodAbi;
  }

  /**
   * Make a "call" to node (ie run the code on a local node but not on the blockchain)
   * @param rawTransaction
   */
  public ethCall(rawTransaction: Tx): Promise<string> {
    return this.web3.eth.call(rawTransaction);
  }

  /**
   * Create a raw transaction from given params
   *
   * @param methodName The name of a method from abi to find
   * @param params Paramters passed to the method
   * @param from (optional) The sender of transaction
   * @param contractAbi The contract ABI
   *
   * @returns A raw (unsigned) transaction object
   */
  public buildRawTransaction(methodName: string, params: Array<any>, from?: string, contractAbi?: ABIDefinition): Tx {
    const methodAbi: ABIDefinition = this.getAbiMethodAbi(methodName, contractAbi);
    const encodedMethod = this.encodeMethod(methodAbi, params);

    const gas = this.config.gas;
    const gasPrice = '0';
    const contractAddress = this.config.contract.address;

    const rawTx = {
      // chainid:
      data: encodedMethod,
      from: from || this.config.owner,
      gas: gas,
      gasPrice: gasPrice,
      // nonce:
      to: contractAddress,
      value: 0
    };

    return rawTx;
  }

  /**
   * Returns web3.utils - helpers for formatting and translating numbers.
   */
  public getUtils(): any {
    return this.web3.utils;
  }

  /**
   *
   * @param method Method name in abi
   * @param result Hex code results
   *
   * returns human readable text
   */
  public decodeResultParams(method: string, result: any): any {
    const methodAbi: ABIDefinition = this.getAbiMethodAbi(method);
    return this.decodeParams(methodAbi.outputs, result);
  }

}

/**
 * Contains a set of common purposes stateless web3
 * related methods.
 */
export class Web3Util {

  static buildRawTransaction(web3: W3,
                             methodName: string,
                             contractAbi: ABIDefinition,
                             contractAddress: string,
                             params: any[],
                             gas: number,
                             gasPrice: string,
                             from?: string): Tx {
    const methodAbi: ABIDefinition =
      web3.utils._.find(contractAbi, (item: any) => { return item.name === methodName;});
    const encodedMethod = this.encodeMethod(web3, methodAbi, params);
    const rawTx = {
      // chainid:
      data: encodedMethod,
      from: from,
      gas: gas,
      gasPrice: gasPrice,
      to: contractAddress,
      value: 0
    };
    return rawTx;
  }

  static async signTransaction(web3: W3, rawTx: Tx, sender: string, key: string): Promise<any> {
    return await web3.eth.accounts.signTransaction(rawTx, key);
  }

  static sendSignedTransaction(web3: W3, signedTx: string): PromiEvent<any> {
    return web3.eth.sendSignedTransaction(signedTx);
  }

  static encodeMethod(web3: W3, methodAbi: ABIDefinition, params: any[]): string {
    return web3.eth.abi.encodeFunctionCall(methodAbi, params);
  }

  /**
   * Calls the given transaction usign the given web3 instance.
   *
   * @param web3 the web3 instance to be considered.
   * @param rawTx the transaction to be call.
   */
  static async invokeTransaction(web3: W3, rawTx: Tx,): Promise<any> {
    return web3.eth.call(rawTx);
  }

  static getAbiMethodAbi(web3: W3, methodName: string, contractAbi: ABIDefinition): ABIDefinition {
    return web3.utils._.find(contractAbi, (item: any) => { return item.name === methodName;});
  }

  static async estimateGas(web3: W3, transaction: Tx) {
    return web3.eth.estimateGas(transaction);
  }

  static buildWeb3(protocol: string, host: string, port: string): W3 {
    if (!port) {
      throw Error('No port information is available.');
    }

    const web3URL = protocol + '://' + host + ':' + port;

    if (protocol === 'http') {
      return new Web3(new Web3.providers.HttpProvider(web3URL));
    }

    if (protocol === 'ws') {
      return new Web3(new Web3.providers.WebsocketProvider(web3URL));
    }

    throw Error('Protocol : ' + protocol + ' is not supported.');
  }

  static decodeParams(web3: W3, params: any[], hexParams: string): any {
    return web3.eth.abi.decodeParameters(params, hexParams);
  }

  static decodeResultParams(web3: W3, method: string, contractAbi: ABIDefinition, result: any): any {
    const methodAbi: ABIDefinition = this.getAbiMethodAbi(web3, method, contractAbi);
    return this.decodeParams(web3, methodAbi.outputs, result);
  }

  static generateEthAccount(web3: W3, user: NewUserType, seed: string): UserTypeWithPrivateKey {
    const account: Account = web3.eth.accounts.create(seed);
    return new UserWithPrivateKey(account.address, user.name, user.email, account.privateKey);
  }

  /**
   * Validate an address is well formed
   *
   * @param address an ethereum address
   * @returns bool
   */
  static isAddress(web3: W3, address: string): boolean {
    return web3.utils.isAddress(address);
  }

  /**
   * Make a "call" to node (ie run the code on a local node but not on the blockchain)
   * @param rawTransaction
   */
  static ethCall(web3: W3, rawTransaction: Tx): Promise<string> {
    return web3.eth.call(rawTransaction);
  }

}
