import * as Web3 from 'web3';
import { DecodedArgs } from '../types';
export declare class AbiDecoder {
    private savedABIs;
    private methodIds;
    constructor(abiArrays: Web3.AbiDefinition[][]);
    decodeLog(logItem: Web3.LogEntry): DecodedArgs | undefined;
    private addABI(abiArray);
    private padZeros(address);
}
