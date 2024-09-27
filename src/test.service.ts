import { Inject, Injectable } from '@nestjs/common';
import { TEST_OPTIONS_PROVIDER } from './test.constant';
import { TestOptions } from './interfaces/test-options.interface';

@Injectable()
export class TestService {
  constructor(@Inject(TEST_OPTIONS_PROVIDER) options: TestOptions) {
    console.log('Test options', options);
  }
}
