import swatches from '../swatches/swatches_list'
import _ from 'lodash'

export const swatchNames = ['neutral', 'primary', 'success', 'error', 'warning', 'support']

export const KEY = 'currentSwatches'
const defaultInitialState = {
  neutral: {
    listKey: 'grey',
    colors: _.clone(swatches['grey']),
  },
  primary: {
    listKey: 'blue_vivid',
    colors: _.clone(swatches['blue_vivid']),
  },
  success: {
    listKey: 'green',
    colors: _.clone(swatches['green']),
  },
  error: {
    listKey: 'red',
    colors: _.clone(swatches['red']),
  },
  warning: {
    listKey: 'yellow',
    colors: _.clone(swatches['yellow']),
  },
  support: {
    listKey: 'purple',
    colors: _.clone(swatches['purple']),
  },
}

export function initialState () {
  if (localStorage.getItem(KEY)) return JSON.parse(localStorage.getItem(KEY))
  return defaultInitialState
}


export const CHANGE_COLOR = 'change_color'
export const CHANGE_SWATCH = 'change_swatch'

export function swatchesReducer (state, action) {
  switch (action.type) {
    case CHANGE_COLOR:
      let newSwatch = {
        ...state[action.role],
      }
      newSwatch.colors[action.index] = action.value
      return {...state, [action.role]: newSwatch}
    case CHANGE_SWATCH:
      return {
        ...state,
        [action.role]: {
          listKey: action.listKey,
          colors: _.clone(swatches[action.listKey])
        }
      }
  }
}