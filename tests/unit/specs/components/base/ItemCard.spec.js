import { createLocalVue, shallowMount } from '@vue/test-utils'
import ItemCard from '@/views/components/base/ItemCard.vue'
import Vuetify from 'vuetify'
import VueMoment from 'vue-moment'

const localVue = createLocalVue();
localVue.use(Vuetify, {});
localVue.use(VueMoment);

describe('ItemCard.vue', () => {

  let wrapper;


  test('present test', () => {

    wrapper = shallowMount(ItemCard, {
      // vuetify로 인한 테스트 오류 방지용
      localVue,
      vuetify: new Vuetify(),
      propsData: {
        // 나눔 글 카드
        board: {
          board_type:'PRESENT',
          img:'https://kr.vuejs.org/images/logo.png',
          title:'testItem',
          raffle_closed_at: '2021-03-23T13:13:05',
          status:'CREATE',
          name:'dino'
        }
      },
      mocks: {
        $store: {
          state: {
            boardType: ['notice', 'used', 'present'],
          }
        }
      }
    })

    expect(wrapper.props().board.board_type).toBe('PRESENT');
    expect(wrapper.props().board.status).toBe('CREATE');
    expect(wrapper.props().board.name).toBe('dino');
    expect(wrapper.vm.switchSubtitleByBoardType).toEqual('2021-03-23 13:13:05 까지')
  })

  test('used test', () => {
    wrapper = shallowMount(ItemCard, {
      localVue,
      attachTo: '#app > div',
      vuetify: new Vuetify(),
      propsData: {
        board: {
          board_type:'USED',
          img:'https://kr.vuejs.org/images/logo.png',
          title:'testItem',
          sell_price:'50000',
          status:'CREATE',
          name:'dino'
        }
      },
      mocks: {
        $store: {
          state: {
            boardType: ['notice', 'used', 'present'],
          }
        }
      }
    })

    expect(wrapper.props().board.board_type).toBe('USED');
    expect(wrapper.props().board.status).toBe('CREATE');
    expect(wrapper.props().board.name).toBe('dino');
    expect(wrapper.vm.switchSubtitleByBoardType).toEqual('₩50,000')
  })
})