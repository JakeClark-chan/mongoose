"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@kokkoro/core");
const service_1 = require("./service");
const option = {
    apply: true,
    lock: false,
    auto_send: true,
};
const pkg = require('../package.json');
const plugin = new core_1.Plugin('kfc', option);
const service = new service_1.Service(plugin);
plugin
    .version(pkg.version)
    .schedule(process.env.KFC_DATE ?? '0 0 12 * * 4', async () => {
    await service.autoSend();
});
plugin
    .command('say')
    .description('v50 看看实力')
    .sugar(/(v|V|vivo|Vivo|v我|V我)50/)
    .action(async (ctx) => {
    const message = await service.getMessage();
    await ctx.reply(message);
});
