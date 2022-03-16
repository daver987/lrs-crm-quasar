import { ref } from 'vue'

const distTotal = ref(0)
const timeTotal = ref(0)
function usePricing(hourlyCost, distanceCost, time, distance) {
  if (distance < 25) {
    distTotal.value = hourlyCost
  } else {
    distTotal.value = distanceCost * distance - 25 + hourlyCost
  }
  if (60 / time > 2) {
    timeTotal.value = hourlyCost * 2
  } else {
    timeTotal.value = (hourlyCost * time) / 60
  }
  return {
    distTotal,
    timeTotal,
  }
}

export { usePricing }

