"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Web3 = require("web3");
var _ = require("lodash");
var BigNumber = require("bignumber.js");
var types_1 = require("../types");
var SolidityCoder = require("web3/lib/solidity/coder");
var AbiDecoder = (function () {
    function AbiDecoder(abiArrays) {
        this.savedABIs = [];
        this.methodIds = {};
        _.map(abiArrays, this.addABI.bind(this));
    }
    AbiDecoder.prototype.decodeLog = function (logItem) {
        var _this = this;
        var methodId = logItem.topics[0];
        var event = this.methodIds[methodId];
        if (!_.isUndefined(event)) {
            var logData = logItem.data;
            var decodedParams_1 = {};
            var dataIndex_1 = 0;
            var topicsIndex_1 = 1;
            var nonIndexedInputs = _.filter(event.inputs, function (input) { return !input.indexed; });
            var dataTypes = _.map(nonIndexedInputs, function (input) { return input.type; });
            var decodedData_1 = SolidityCoder.decodeParams(dataTypes, logData.slice(2));
            _.map(event.inputs, function (param) {
                var value;
                if (param.indexed) {
                    value = logItem.topics[topicsIndex_1];
                    topicsIndex_1++;
                }
                else {
                    value = decodedData_1[dataIndex_1];
                    dataIndex_1++;
                }
                if (param.type === 'address') {
                    value = _this.padZeros(new BigNumber(value).toString(16));
                }
                else if (param.type === 'uint256' || param.type === 'uint8' || param.type === 'int') {
                    value = new BigNumber(value);
                }
                decodedParams_1[param.name] = value;
            });
            return {
                event: event.name,
                args: decodedParams_1,
            };
        }
    };
    AbiDecoder.prototype.addABI = function (abiArray) {
        var _this = this;
        _.map(abiArray, function (abi) {
            if (abi.type === types_1.AbiType.Event) {
                var signature = abi.name + "(" + _.map(abi.inputs, function (input) { return input.type; }).join(',') + ")";
                var signatureHash = new Web3().sha3(signature);
                _this.methodIds[signatureHash] = abi;
            }
        });
        this.savedABIs = this.savedABIs.concat(abiArray);
    };
    AbiDecoder.prototype.padZeros = function (address) {
        var formatted = address;
        if (_.startsWith(formatted, '0x')) {
            formatted = formatted.slice(2);
        }
        formatted = _.padStart(formatted, 40, '0');
        return "0x" + formatted;
    };
    return AbiDecoder;
}());
exports.AbiDecoder = AbiDecoder;
//# sourceMappingURL=abi_decoder.js.map