import { DynamicModule, Module, Provider } from '@nestjs/common';
import {
  ITestOptionsFactory,
  TestModuleAsyncOptions,
  TestModuleOptions,
  TestOptions,
} from './interfaces/test-options.interface';
import { TEST_OPTIONS_PROVIDER } from './test.constant';
import { TestService } from './test.service';

@Module({})
export class TestModule {
  static forRoot(opts: TestModuleOptions): DynamicModule {
    const providers = [
      {
        provide: TEST_OPTIONS_PROVIDER,
        useValue: {
          testKey: opts.testKey,
        },
      },
    ];

    return {
      module: TestModule,
      providers: [...providers, TestService],
    };
  }

  static forRootAsync<TOptions extends TestOptions>(
    opts: TestModuleAsyncOptions<TOptions>
  ): DynamicModule {
    const providers = [...this.createAsyncProviders(opts), TestService];

    return {
      module: TestModule,
      providers,
    };
  }

  private static createAsyncProviders<TOptions extends TestOptions>(
    opts: TestModuleAsyncOptions<TOptions>
  ): Provider[] {
    let providers: Provider[] = [];
    if (opts.useFactory) {
      providers = [
        {
          provide: TEST_OPTIONS_PROVIDER,
          useFactory: async (...args: any[]) => await opts.useFactory(...args),
          inject: opts.inject || [],
        },
      ];
    } else {
      providers = [
        {
          provide: TEST_OPTIONS_PROVIDER,
          useFactory: async (optionFactory: ITestOptionsFactory) => {
            await optionFactory.createTestOption();
          },
          inject: [opts.useClass || opts.useExisting],
        },
      ];
    }

    if (opts.useClass) {
      console.log('Add user class', opts.useClass);
      providers.push({
        provide: opts.useClass,
        useClass: opts.useClass,
      });
    }

    return providers;
  }
}
