"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sdk_1 = require("quikdb-cli-beta/v1/sdk");
const quikdb = new sdk_1.QuikDB();
const InitOwner = () => __awaiter(void 0, void 0, void 0, function* () {
    yield quikdb.init();
    const initOwnerResult = yield quikdb.callCanisterMethod(sdk_1.CanisterMethod.InitOwner, []);
    if (initOwnerResult) {
        const owner = yield quikdb.callCanisterMethod(sdk_1.CanisterMethod.GetOwner, []);
        return owner;
    }
    else {
        throw new Error("Init owner wasn't created!");
    }
});
const GetOwner = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield quikdb.init();
        const getOwnerArgs = [];
        const owner = yield quikdb.callCanisterMethod(sdk_1.CanisterMethod.GetOwner, getOwnerArgs);
        if (owner._isPrincipal) {
            return `Owner Already exits: ${Array.from(owner.toText())}`;
        }
        else {
            const newOwner = yield InitOwner();
            return `new owner ${Array.from(newOwner.toText())}`;
        }
    }
    catch (err) {
        console.log(err);
        throw err;
    }
});
exports.default = GetOwner;
