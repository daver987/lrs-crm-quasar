import { Loader } from '@googlemaps/js-api-loader'
// import { ref } from 'vue'

const loader = new Loader({
  apiKey: import.meta.env.VITE_MAPS_KEY as string,
  libraries: ['places'],
  version: 'weekly',
  region: 'ca',
})
// const myMap = ref<HTMLElement>(null)
// loader.load().then(() => {
//   const map = new google.maps.Map(myMap.value, {
//     mapTypeControl: false,
//     fullscreenControl: false,
//     center: { lat: 43.65107, lng: -79.347015 },
//     zoom: 9,
//   })
// })
export { loader }
