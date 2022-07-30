<template>
  <div>
    <Steps
      :count="count"
      :current="currentOrder"
    />
    <div class="question">
      {{ question.question }} ({{currentOrder}}/{{count}})
    </div>
    <Answer
      class="answer-area"
      :type="question.type"
      :options="question.options"
      :value="answer"
      @input="answer => $emit('input', answer)"
    />
  </div>
</template>

<script>
import Steps from '@/components/Steps'
import Answer from './Answer'

export default {
  name: 'QuestionnaireBody',
  components: {
    Steps,
    Answer
  },
  props: {
    count: Number,
    currentOrder: Number,
    answer: {
      type: [String, Object]
    },
    question: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style>
.question {
  margin-top: 1rem;
  font-size: 1.2rem;
}
.answer-area {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
</style>
