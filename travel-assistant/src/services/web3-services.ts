import { Tx, PromiEvent, ABIDefinition } from 'web3/types';
import { default as W3 } from 'web3';
const Web3 = require('web3'); // tslint:disable-line

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

  /**
   * Make a "call" to node (ie run the code on a local node but not on the blockchain)
   * @param rawTransaction
   */
  static ethCall(web3: W3, rawTransaction: Tx): Promise<string> {
    return web3.eth.call(rawTransaction);
  }

}
