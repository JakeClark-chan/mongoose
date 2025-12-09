"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
const axios_1 = __importDefault(require("axios"));
class Service {
    plugin;
    /** API */
    api;
    constructor(
    /** 插件 */
    plugin) {
        this.plugin = plugin;
        this.api = 'https://kfc.yuki.sh/api/index';
    }
    async getMessage() {
        let message;
        try {
            const { data } = await axios_1.default.get(this.api);
            message = data;
        }
        catch (error) {
            message = error.message;
        }
        return message;
    }
    async autoSend() {
        const message = await this.getMessage();
        this.plugin.bl.forEach((bot) => {
            const sendQueue = [];
            const uins = [...bot.gl.keys()];
            const uins_length = uins.length;
            for (let i = 0; i < uins_length; i++) {
                const uin = uins[i];
                const info = bot.gl.get(uin);
                const { group_id } = info;
                const { apply, auto_send } = bot.profile.getOption(group_id, 'message');
                if (apply && auto_send) {
                    sendQueue.push(bot.sendGroupMsg(group_id, message));
                }
            }
            Promise.allSettled(sendQueue);
        });
    }
}
exports.Service = Service;
