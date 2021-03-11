import { createLocalVue, shallowMount } from '@vue/test-utils'
import PostPage from '@/views/pages/PostPage.vue'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import axios from 'axios'
import VueMoment from 'vue-moment'

const localVue = createLocalVue();
localVue.use(Vuetify);
localVue.use(VueRouter)
localVue.use(VueMoment);
jest.mock('axios');
const router = new VueRouter();

describe('PostPage.vue', () => {

  let wrapper;

  beforeAll(() => {
    wrapper = shallowMount(PostPage, {
      localVue,
      vuetify: new Vuetify(),
      router
    });
  })

  const data = {
    board_id : 1,
    board_type: 'NOTICE',
    title: 'test title',
    name: 'dino',
    created_at: '2021-03-21T15:30:23.00022',
    description: 'test description'
  }

  axios.get = jest.fn().mockResolvedValue(data);

  test('글 조회 테스트', () => {
    expect(wrapper.text()).toBe('댓글');
  })
})