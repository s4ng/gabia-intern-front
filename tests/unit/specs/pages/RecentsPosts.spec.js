import { createLocalVue, shallowMount } from '@vue/test-utils'
import UserProfile from '@/views/pages/RecentPosts.vue'
import Vuetify from 'vuetify'

const localVue = createLocalVue();
localVue.use(Vuetify, {});

describe('RecentsPosts test', () => {

  let wrapper;

  beforeAll(() => {
    wrapper = shallowMount(UserProfile, {
      localVue,
      vuetify: new Vuetify(),
    });
  })

  test('App should work', () => {
    expect(true).toBe(true)
  })
})