import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify) 

// Components
import ChallengeCarousel from '@/components/ChallengeCarousel.vue'

// Utilities
import {
  mount,
  createLocalVue
} from '@vue/test-utils'

const localVue = createLocalVue()

describe('ChallengeCarousel.vue', () => {
  let vuetify: any;
  let wrapper: any;

  const grammars = Array.from({length: Math.round(Math.random() * 10) }, (v, i) => {
    return ['A', 'b', 'C'][i%3]
});
  const speech = "eeijfzeofj";
 
  beforeEach(() => {
    vuetify = new Vuetify();

    wrapper = mount(ChallengeCarousel, {
        localVue,
        vuetify,
        propsData: {
          grammars,
          speech,
        },
        sync: false,
      })
  })

  it('should have slides in the carousel from grammars', () => {
    const slides = wrapper.findAll('.v-window-item')
    expect(slides).toHaveLength(grammars.length);
  });

  it('should have speech content', () => {
    const speechContent = wrapper.find('.speech-content')
    expect(speechContent.text()).toBe(speech)
  });
})