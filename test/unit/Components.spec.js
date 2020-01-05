import { mount, createLocalVue } from '@vue/test-utils'
import Bootstrap from 'bootstrap-vue'
import Logo from '@/components/Logo.vue'
import Maps from '@/components/Maps.vue'

const localVue = createLocalVue()
localVue.use(Bootstrap)
localVue.use(Maps)

describe('Google Maps', () => {
  const options = {
    localVue,
    propsData: {
      locations: []
    }
  }

  test('is a Vue instance', () => {
    const wrapper = mount(Maps, options)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})

describe('Logo', () => {
  const options = { localVue }
  test('is a Vue instance', () => {
    const wrapper = mount(Logo, options)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
