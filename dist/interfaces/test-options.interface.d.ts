import { Type } from '@nestjs/common';
export interface TestOptions {
    testKey: string;
}
export interface ITestOptionsFactory {
    createTestOption(): Promise<TestOptions>;
}
export interface TestModuleOptions {
    testKey: string;
}
export interface TestModuleAsyncOptions<TOptions extends TestOptions, TFactory = ITestOptionsFactory> {
    useExisting?: Type<TFactory>;
    useClass?: Type<TFactory>;
    useFactory?: (...args: any[]) => Promise<TOptions>;
    inject?: any[];
}
