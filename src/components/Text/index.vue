<template>
  <div>
    <el-input
      type="textarea"
      :value="value.value"
      :rows="2"
      :disabled="value.checked"
      @input="value => $emit('input', { value })"
      />
    <el-checkbox
      :value="value.checked"
      @change="handleChangeChecked"
    >
      I do not want to answer
    </el-checkbox>
  </div>
</template>

<script>
export default {
  name: 'TextArea',
  props: {
    value: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    handleChangeChecked (checked) {
      const { value } = this.value
      this.$emit('input', { checked, value: !checked ? value : '' })
    }
  }
}
</script>
