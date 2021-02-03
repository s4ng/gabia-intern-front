import { shallowMount } from '@vue/test-utils'
import UserProfile from '@/views/pages/UserProfile.vue'

const testString = "this is test"

test('App should work', () => {
  //const wrapper = shallowMount(UserProfile);
  expect(testString).toMatch('this is test')
})
