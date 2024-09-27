"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TestModule", {
    enumerable: true,
    get: function() {
        return TestModule;
    }
});
const _common = require("@nestjs/common");
const _testconstant = require("./test.constant");
const _testservice = require("./test.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
class TestModule {
    static forRoot(opts) {
        const providers = [
            {
                provide: _testconstant.TEST_OPTIONS_PROVIDER,
                useValue: {
                    testKey: opts.testKey
                }
            }
        ];
        return {
            module: TestModule,
            providers: [
                ...providers,
                _testservice.TestService
            ]
        };
    }
    static forRootAsync(opts) {
        const providers = [
            ...this.createAsyncProviders(opts),
            _testservice.TestService
        ];
        return {
            module: TestModule,
            providers
        };
    }
    static createAsyncProviders(opts) {
        let providers = [];
        if (opts.useFactory) {
            providers = [
                {
                    provide: _testconstant.TEST_OPTIONS_PROVIDER,
                    useFactory: async (...args)=>await opts.useFactory(...args),
                    inject: opts.inject || []
                }
            ];
        } else {
            providers = [
                {
                    provide: _testconstant.TEST_OPTIONS_PROVIDER,
                    useFactory: async (optionFactory)=>{
                        await optionFactory.createTestOption();
                    },
                    inject: [
                        opts.useClass || opts.useExisting
                    ]
                }
            ];
        }
        if (opts.useClass) {
            console.log('Add user class', opts.useClass);
            providers.push({
                provide: opts.useClass,
                useClass: opts.useClass
            });
        }
        return providers;
    }
}
TestModule = _ts_decorate([
    (0, _common.Module)({})
], TestModule);
