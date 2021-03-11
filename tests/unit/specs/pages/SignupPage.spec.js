import { createLocalVue, shallowMount } from '@vue/test-utils'
import SignupPage from '@/views/pages/SignupPage.vue'
import Vuetify from 'vuetify'

const localVue = createLocalVue();
localVue.use(Vuetify, {});

describe('SignupPage', () => {

  let wrapper;

  beforeAll(() => {
    wrapper = shallowMount(SignupPage, {
      localVue,
      vuetify: new Vuetify(),
    })
  })

  test('Form test', () => {
    expect(wrapper.text()).toBe('회원가입     회원가입')
  })
})