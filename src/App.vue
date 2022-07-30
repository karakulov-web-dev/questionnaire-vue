<template>
  <div id="app">
    <el-button
      type="primary"
      @click="openDialogue"
    >
      Open
    </el-button>
    <QuestionnaireDialogue
      v-if="isOpen"
      :questions="questions"
      title="Please answer a few questions"
      initial-id="id1"
      @close="closeDialogue"
      @submit="submit"
    />
  </div>
</template>

<script>
import QuestionnaireDialogue from './components/QuestionnaireDialogue/index'
import { QUESTIONNAIRE_CHANGE_STATE_DIALOGUE, FETCH_QUESTIONS } from './store/questionnaire/index'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'App',
  components: {
    QuestionnaireDialogue
  },
  computed: {
    ...mapState({
      isOpen: state => state.questionnaire.isOpen,
      questions: state => state.questionnaire.questions
    })
  },
  created () {
    this.fetch()
  },
  methods: {
    ...mapActions('questionnaire', {
      changeStateDialogue: QUESTIONNAIRE_CHANGE_STATE_DIALOGUE,
      fetch: FETCH_QUESTIONS
    }),
    submit () {
      this.closeDialogue()
    },
    closeDialogue () {
      this.changeStateDialogue(false)
    },
    openDialogue () {
      this.changeStateDialogue(true)
    }
  }
}
</script>

<style lang="scss">

</style>
