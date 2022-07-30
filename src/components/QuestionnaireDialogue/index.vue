<template>
    <el-dialog
      visible
      @close="$emit('close')"
    >
      <h2 class="dialogue-title">{{ title }}</h2>
      <Questionnaire
        :count="questionsCount"
        :current-order="currentQuestion.order"
        :question="currentQuestion"
        :answer="currentAnswer"
        @input="handleInput"
      />
      <div class="dialogue-body">
        <el-button
          v-if="!isLastQuestion"
          type="primary"
          :disabled="isDisabledNextButton"
          @click="next"
        >
          Next
        </el-button>
        <el-button
          v-else
          type="primary"
          @click="submit"
        >
          Submit
        </el-button>
      </div>
    </el-dialog>
</template>

<script>
import Questionnaire from './Questionnaire'
import isEmpty from 'lodash/isEmpty'

export default {
  name: 'QuestionnaireDialogue',
  components: {
    Questionnaire
  },
  props: {
    title: String,
    initialId: String,
    questions: {
      type: Array,
      default: () => ([])
    }
  },
  data: () => ({
    currentQuestionId: null,
    answers: {}
  }),
  created () {
    this.currentQuestionId = this.initialId
  },
  computed: {
    questionsCount () {
      return this.questions.reduce((count, question) => question.order >= count ? question.order : count, 0)
    },
    currentQuestion () {
      return this.questions.find(question => question.id === this.currentQuestionId) || {}
    },
    currentAnswer () {
      return this.answers[this.currentQuestionId]
    },
    nextQuestionId () {
      const { currentQuestionId, currentQuestion } = this
      const { next } = currentQuestion || {}
      if (next.type === 'choice') {
        const answer = this.answers[currentQuestionId] || {}
        return next.options[answer]
      } else {
        return next.id
      }
    },
    isLastQuestion () {
      const { currentQuestion, questionsCount } = this
      if (!currentQuestion) return true
      return currentQuestion.order === questionsCount
    },
    isDisabledNextButton () {
      return isEmpty(this.answers[this.currentQuestionId])
    }
  },
  methods: {
    next () {
      this.currentQuestionId = this.nextQuestionId
    },
    submit () {
      this.$emit('submit', this.answers)
    },
    handleInput (value) {
      this.$set(this.answers, this.currentQuestionId, value)
    }
  }
}
</script>

<style lang="scss" scoped>
.dialogue-title {
  text-align: center;
}
.dialogue-body {

}
</style>
