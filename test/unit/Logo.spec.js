import { mount, createLocalVue } from '@vue/test-utils'
import Bootstrap from 'bootstrap-vue'
import Logo from '@/components/Logo.vue'

const localVue = createLocalVue()
localVue.use(Bootstrap)

describe('Logo', () => {
  const options = { localVue }
  test('is a Vue instance', () => {
    const wrapper = mount(Logo, options)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
