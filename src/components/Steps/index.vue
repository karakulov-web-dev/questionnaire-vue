<template>
  <el-steps :active="current">
    <el-step :key="n" v-for="n in count" />
  </el-steps>
</template>

<script>
export default {
  name: 'StepsComponent',
  props: {
    count: Number,
    current: Number
  }
}
</script>
