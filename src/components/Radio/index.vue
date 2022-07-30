<template>
  <div class="radio-buttons">
    <el-radio
      v-for="option in options"
      :label="option.value"
      :key="option.value"
      :value="value"
      size="medium"
      @change="$emit('input', option.value)"
    >
      {{ option.label }}
    </el-radio>
  </div>
</template>

<script>
export default {
  name: 'RadioButtons',
  props: {
    value: String,
    options: {
      type: Array,
      default: () => ([])
    }
  }
}
</script>

<style>
.radio-buttons {
  display: flex;
  flex-direction: column;
}
</style>
