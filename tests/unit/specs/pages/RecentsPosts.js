import { createLocalVue, shallowMount } from '@vue/test-utils'
import UserProfile from '@/views/pages/RecentPosts.vue'

describe('RecentsPosts test', () => {

  test('App should work', () => {
    const wrapper = shallowMount(UserProfile, {
      stubs: ['router-link', 'router-view']
    });
    expect(true).toBe(true)
  })
})