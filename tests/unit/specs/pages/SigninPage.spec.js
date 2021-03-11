import { createLocalVue, shallowMount } from '@vue/test-utils'
import SigninPage from '@/views/pages/SigninPage.vue'
import Vuetify from 'vuetify'

const localVue = createLocalVue();
localVue.use(Vuetify, {});

describe('SigninPage', () => {

  let wrapper;

  beforeAll(() => {
    wrapper = shallowMount(SigninPage, {
      localVue,
      vuetify: new Vuetify(),
    })
  })

  test('Form test', () => {
    expect(wrapper.text()).toBe('로그인   회원가입 로그인   로그인')
  })
})