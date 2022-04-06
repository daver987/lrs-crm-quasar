import { config } from '@vue/test-utils'

import {
  createRouterMock,
  injectRouterMock,
  VueRouterMock,
} from 'vue-router-mock'

const router = createRouterMock()

beforeEach(() => {
  injectRouterMock(router)
})

config.plugins.VueWrapper.install(VueRouterMock)
