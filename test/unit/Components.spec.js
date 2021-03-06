import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import VueLodash from 'vue-lodash'
import Bootstrap from 'bootstrap-vue'
import Logo from '@/components/Logo.vue'
import Maps from '@/components/Maps.vue'
import Navbar from '@/components/Navbar.vue'

describe('Google Maps', () => {
  const options = {
    propsData: {
      marker: [],
      center: {}
    }
  }

  test.skip('is a Vue instance', () => {
    const wrapper = mount(Maps, options)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})

describe('Logo', () => {
  const localVue = createLocalVue()
  localVue.use(Bootstrap)

  const options = { localVue }
  test('is a Vue instance', () => {
    const wrapper = mount(Logo, options)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})

describe('Navbar', () => {
  jest.mock('@/components/Navbar.vue')

  const localVue = createLocalVue()
  localVue.use(VueLodash, { name: 'lodash' })
  localVue.use(Bootstrap)
  localVue.filter('toLocale', jest.fn())

  const mockStore = { getters: { loading: true } }
  const options = {
    localVue,
    mocks: {
      $store: mockStore
    }

  }
  test.skip('is a Vue instance', () => {
    const wrapper = shallowMount(Navbar, options)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
