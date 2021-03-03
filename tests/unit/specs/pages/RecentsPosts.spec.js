import { createLocalVue, shallowMount } from '@vue/test-utils'
import UserProfile from '@/views/pages/RecentPosts.vue'
import Vuetify from 'vuetify'

const localVue = createLocalVue();
localVue.use(Vuetify, {});

describe('RecentsPosts.vue', () => {

  let wrapper;

  beforeAll(() => {
    wrapper = shallowMount(UserProfile, {
      localVue,
      vuetify: new Vuetify(),
    });
  })

  test('Title text test', () => {
    expect(wrapper.find('[data-test="recent-used-title"]').text()).toEqual('최근 중고게시물');
    expect(wrapper.find('[data-test="recent-share-title"]').text()).toEqual('최근 나눔게시물');
  })
})