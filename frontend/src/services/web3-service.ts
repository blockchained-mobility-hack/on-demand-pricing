import { Tx, PromiEvent, ABIDefinition } from 'web3/types'; // tslint:disable-line
import { default as W3 } from 'web3'; // tslint:disable-line
const Web3 = require('web3'); // tslint:disable-line

/**
 * Contains a set of common purposes stateless web3
 * related methods.
 */
export class Web3Util {

  public static buildRawTransaction(web3: W3,
                             methodName: string,
                             contractAbi: ABIDefinition,
                             contractAddress: string,
                             params: any[],
                             gas: number,
                             gasPrice: string,
                             from?: string): Tx {
    const methodAbi: ABIDefinition =
      web3.utils._.find(contractAbi, (item: any) => { return item.name === methodName;}); // tslint:disable-line
    const encodedMethod = this.encodeMethod(web3, methodAbi, params);// tslint:disable-line
    const rawTx = {
      // chainid:
      data: encodedMethod, // tslint:disable-line
      from: from, // tslint:disable-line
      gas: gas, // tslint:disable-line
      gasPrice: gasPrice, // tslint:disable-line
      to: contractAddress, // tslint:disable-line
      value: 0 // tslint:disable-line
    };
    return rawTx;
  }

  public static async signTransaction(web3: W3, rawTx: Tx, sender: string, key: string): Promise<any> {
    return await web3.eth.accounts.signTransaction(rawTx, key);
  }

  public static sendSignedTransaction(web3: W3, signedTx: string): PromiEvent<any> {
    return web3.eth.sendSignedTransaction(signedTx);
  }

  public static encodeMethod(web3: W3, methodAbi: ABIDefinition, params: any[]): string {
    return web3.eth.abi.encodeFunctionCall(methodAbi, params);
  }

  /**
   * Calls the given transaction usign the given web3 instance.
   *
   * @param web3 the web3 instance to be considered.
   * @param rawTx the transaction to be call.
   */
  public static async invokeTransaction(web3: W3, rawTx: Tx,): Promise<any> {
    return web3.eth.call(rawTx);
  }

  public static getAbiMethodAbi(web3: W3, methodName: string, contractAbi: ABIDefinition): ABIDefinition {
    return web3.utils._.find(contractAbi, (item: any) => { return item.name === methodName;}); // tslint:disable-line
  }

  public static async estimateGas(web3: W3, transaction: Tx) {
    return web3.eth.estimateGas(transaction);
  }

  public static buildWeb3(protocol: string, host: string, port: string): W3 {
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

  public static decodeParams(web3: W3, params: any[], hexParams: string): any {
    return web3.eth.abi.decodeParameters(params, hexParams);
  }

  /*static decodeResultParams(web3: W3, method: string, contractAbi: ABIDefinition, result: any): any {
    const methodAbi: ABIDefinition = this.getAbiMethodAbi(web3, method, contractAbi);
    return this.decodeParams(web3, methodAbi.outputs, result);
  }*/

  /**
   * Make a "call" to node (ie run the code on a local node but not on the blockchain)
   * @param rawTransaction
   */
  public static ethCall(web3: W3, rawTransaction: Tx): Promise<string> {
    return web3.eth.call(rawTransaction);
  }

}
