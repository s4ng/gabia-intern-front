import { createLocalVue, shallowMount } from '@vue/test-utils'
import ItemCard from '@/views/components/base/ItemCard.vue'
import Vuetify from 'vuetify'

const localVue = createLocalVue();
localVue.use(Vuetify, {});

describe('ItemCard.vue', () => {

  let wrapper;

  describe('Share post card', () => {
    beforeEach(() => {

      // 얇은 마운트, 하위 컴포넌트 포함 안함
      wrapper = shallowMount(ItemCard, {
        // vuetify로 인한 테스트 오류 방지용
        localVue,
        vuetify: new Vuetify(),
        propsData: {
          // 나눔 글 카드
          board: {
            board_type:"share",
            img:"https://kr.vuejs.org/images/logo.png",
            title:"testItem",
            raffle_close_at:'2021-03-23 13:13:05.34234',
            status:"CREATE",
            write_id:"dino"
          }
        },
        mocks: {
          $store: {
            state: {
              boardType: ['notice', 'used', 'share'],
            }
          }
        }
      })
    })

    test('props test', () => {
      expect(wrapper.props().board.board_type).toBe('share');
      expect(wrapper.props().board.status).toBe('CREATE');
      expect(wrapper.props().board.write_id).toBe('dino');
      expect(wrapper.vm.switchSubtitleByBoardType).toEqual('2021-03-23 13:13:05 까지')
    })
  })

  describe('Used post card', () => {

    beforeEach(() => {

      wrapper = shallowMount(ItemCard, {
        localVue,
        attachTo: '#app > div',
        vuetify: new Vuetify(),
        propsData: {
          board: {
            board_type:"used",
            img:"https://kr.vuejs.org/images/logo.png",
            title:"testItem",
            sell_price:'50000',
            status:"CREATE",
            write_id:"dino"
          }
        },
        mocks: {
          $store: {
            state: {
              boardType: ['notice', 'used', 'share'],
            }
          }
        }
      })
    })

    test('props test', () => {
      expect(wrapper.props().board.board_type).toBe('used');
      expect(wrapper.props().board.status).toBe('CREATE');
      expect(wrapper.props().board.write_id).toBe('dino');
      expect(wrapper.vm.switchSubtitleByBoardType).toEqual('₩50,000')
    })
  })
})