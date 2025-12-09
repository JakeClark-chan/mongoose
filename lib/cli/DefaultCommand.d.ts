import type { HasCwd } from '@wesjet/core';
import type { fs } from '@wesjet/utils';
import type { HasConsole } from '@wesjet/utils/effect';
import { OT, T } from '@wesjet/utils/effect';
import { Command } from 'clipanion';
export declare class DefaultCommand extends Command {
    configPath: string;
    stackbitYamlPath: string;
    transformPath: string;
    execute(): Promise<void>;
    executeSafe: () => T.Effect<OT.HasTracer & HasCwd & HasConsole & fs.HasFs, unknown, void>;
}
//# sourceMappingURL=DefaultCommand.d.ts.map