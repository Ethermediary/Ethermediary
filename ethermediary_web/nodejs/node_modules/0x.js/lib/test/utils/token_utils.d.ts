import { Token } from '../../src';
export declare class TokenUtils {
    private tokens;
    constructor(tokens: Token[]);
    getProtocolTokenOrThrow(): Token;
    getNonProtocolTokens(): Token[];
}
