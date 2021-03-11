import { createLocalVue, shallowMount } from '@vue/test-utils'
import CommentCard from '@/views/components/base/CommentCard.vue'
import Vuetify from 'vuetify'
import VueMoment from 'vue-moment'

const localVue = createLocalVue();
localVue.use(Vuetify, {});
localVue.use(VueMoment);

describe('CommentCard.vue', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(CommentCard, {
      localVue,
      vuetify: new Vuetify(),
      propsData: {
        comment: {
          name: 'dino',
          created_at: '2021-03-03T15:14:23',
          comment: 'test comment'
        }
      }
    });
  })

  test('Commet card shows test', () => {
    expect(wrapper.props().comment.name).toBe('dino');
    expect(wrapper.props().comment.created_at).toBe('2021-03-03T15:14:23');
    expect(wrapper.vm.dateFormatter(wrapper.props().comment.created_at)).toEqual('2021-03-03 15:14:23')
  })
})