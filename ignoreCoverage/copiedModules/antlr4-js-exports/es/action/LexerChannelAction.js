"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* Copyright (c) 2012-2022 The ANTLR Project Contributors. All rights reserved.
 * Use is of this file is governed by the BSD 3-clause license that
 * can be found in the LICENSE.txt file in the project root.
 */
const LexerActionType_js_1 = __importDefault(require("../atn/LexerActionType.js"));
const LexerAction_js_1 = __importDefault(require("./LexerAction.js"));
/**
 * Implements the {@code channel} lexer action by calling
 * {@link Lexer//setChannel} with the assigned channel.
 * Constructs a new {@code channel} action with the specified channel value.
 * @param channel The channel value to pass to {@link Lexer//setChannel}
 */
class LexerChannelAction extends LexerAction_js_1.default {
    constructor(channel) {
        super(LexerActionType_js_1.default.CHANNEL);
        this.channel = channel;
    }
    /**
     * <p>This action is implemented by calling {@link Lexer//setChannel} with the
     * value provided by {@link //getChannel}.</p>
     */
    execute(lexer) {
        lexer._channel = this.channel;
    }
    updateHashCode(hash) {
        hash.update(this.actionType, this.channel);
    }
    equals(other) {
        if (this === other) {
            return true;
        }
        else if (!(other instanceof LexerChannelAction)) {
            return false;
        }
        else {
            return this.channel === other.channel;
        }
    }
    toString() {
        return "channel(" + this.channel + ")";
    }
}
exports.default = LexerChannelAction;
