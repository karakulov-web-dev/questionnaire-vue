<template>
  <div class="checkboxes-area">
    <el-checkbox
      v-for="option in checkboxes"
      :key="option.value"
      :value="value.checked.includes(option.value)"
      @change="checked => handleCheck(option.value, checked)"
    >
      {{ option.label }}
    </el-checkbox>
    <el-input
      type="textarea"
      :value="value.customValue"
      :rows="2"
      :disabled="!value.checked.includes('customValue')"
      @input="customOptionChange"
    />
  </div>
</template>

<script>
export default {
  name: 'CheckboxesArea',
  props: {
    value: {
      type: Object,
      default: () => ({ checked: [] })
    },
    options: {
      type: Array,
      default: () => ([])
    }
  },
  computed: {
    checkboxes () {
      return [...this.options, { label: 'Your answer', value: 'customValue' }]
    }
  },
  methods: {
    handleCheck (key, value) {
      const { checked, customValue } = this.value
      const newCheckedList = value ? [...checked, key] : checked.filter(item => item !== key)
      this.$emit('input', { checked: newCheckedList, customValue })
    },
    customOptionChange (value) {
      const { checked } = this.value
      this.$emit('input', { checked, customValue: value })
    }
  }
}
</script>

<style lang="scss" scoped>
.checkboxes-area {
  display: flex;
  flex-direction: column;
}
</style>
