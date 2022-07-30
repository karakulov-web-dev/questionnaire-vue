import axios from 'axios'

const SET_QUESTIONS = 'SET_QUESTIONS'

export const QUESTIONNAIRE_CHANGE_STATE_DIALOGUE = 'QUESTIONNAIRE_CHANGE_STATE_DIALOGUE'
export const FETCH_QUESTIONS = 'FETCH_QUESTIONS'

const QUESTIONNAIRE_PERSISTED_STATE = 'QUESTIONNAIRE_PERSISTED_STATE'

const persistedState = getPersistedState()

export default {
  namespaced: true,
  state: {
    questions: [],
    isOpen: typeof persistedState.isOpen !== 'undefined' ? persistedState.isOpen : true
  },
  mutations: {
    [SET_QUESTIONS]: (state, questions) => {
      state.questions = questions
    },
    [QUESTIONNAIRE_CHANGE_STATE_DIALOGUE]: (state, newState) => {
      state.isOpen = newState
    }
  },
  actions: {
    [FETCH_QUESTIONS]: async ({ commit }) => {
      const { data } = await axios.get('/questions.json')
      commit(SET_QUESTIONS, data)
    },
    [QUESTIONNAIRE_CHANGE_STATE_DIALOGUE]: ({ commit }, isOpen) => {
      updatePersistedState({ isOpen })
      commit(QUESTIONNAIRE_CHANGE_STATE_DIALOGUE, isOpen)
    }
  }
}

function getPersistedState () {
  const json = localStorage.getItem(QUESTIONNAIRE_PERSISTED_STATE)
  if (!json) return {}
  try {
    return JSON.parse(json)
  } catch (e) {
    return {}
  }
}

function updatePersistedState (newState = {}) {
  const state = getPersistedState()
  const json = JSON.stringify({ ...state, ...newState })
  localStorage.setItem(QUESTIONNAIRE_PERSISTED_STATE, json)
}
