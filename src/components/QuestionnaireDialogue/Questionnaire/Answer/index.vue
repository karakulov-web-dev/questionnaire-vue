<template>
  <div>
    <component
      :is="components[type]"
      :value="value"
      :options="options"
      @input="value => $emit('input', value)"
    />
  </div>
</template>

<script>
import Radio from '@/components/Radio'
import Text from '@/components/Text'
import Checkboxes from '@/components/Checkboxes'

export default {
  name: 'AnswerArea',
  props: {
    type: String,
    options: Array,
    value: {
      type: [String, Object, Array]
    }
  },
  data: () => ({
    components: {
      radio: Radio,
      text: Text,
      checkbox: Checkboxes
    }
  })
}
</script>
