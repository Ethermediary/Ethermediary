export const relayerApiFeesResponseSchema = {
    id: '/RelayerApiFeesResponse',
    type: 'object',
    properties: {
        makerFee: {$ref: '/Number'},
        takerFee: {$ref: '/Number'},
        feesRecipient: {$ref: '/Address'},
        takerToSpecify: {$ref: '/Address'},
    },
    required: ['makerFee', 'takerFee'],
};
