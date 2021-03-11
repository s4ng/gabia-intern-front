import { createLocalVue, shallowMount } from '@vue/test-utils'
import WriteCommentCard from '@/views/components/base/WriteCommentCard.vue'
import Vuetify from 'vuetify'

const localVue = createLocalVue();
localVue.use(Vuetify, {});

describe('WriteCommentCard.vue', () => {

  let wrapper;

  test('props test', () => {

    wrapper = shallowMount(WriteCommentCard, {
      localVue,
      vuetify: new Vuetify(),
      propsData: {
        boardId: 1,
        board: 'notice'
      },
      mocks: {
        $store: {
          state: {
            userId: 1
          }
        }
      }
    });

    expect(wrapper.props().boardId).toBe(1);
    expect(wrapper.props().board).toBe('notice');
  })

  test('로그아웃 상태', () => {

    wrapper = shallowMount(WriteCommentCard, {
      localVue,
      vuetify: new Vuetify(),
      propsData: {
        boardId: 1,
        board: 'notice'
      },
      mocks: {
        $store: {
          state: {
            userId: ''
          }
        }
      }
    });

    expect(wrapper.text()).toBe('댓글을 남기려면 로그인 해주세요.\n       로그인')
  })
})