import { DynamicModule } from '@nestjs/common';
import { TestModuleAsyncOptions, TestModuleOptions, TestOptions } from './interfaces/test-options.interface';
export declare class TestModule {
    static forRoot(opts: TestModuleOptions): DynamicModule;
    static forRootAsync<TOptions extends TestOptions>(opts: TestModuleAsyncOptions<TOptions>): DynamicModule;
    private static createAsyncProviders;
}
