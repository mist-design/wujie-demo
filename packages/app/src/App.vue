<script setup lang="ts">
import { shallowRef } from 'vue';

const modelValue =shallowRef()
</script>

<template>
  <div>
    <el-button @click="modelValue = !modelValue">测试</el-button>
    <el-dialog  v-model="modelValue" style="height: 500px;">
      <el-date-picker teleported="#app"></el-date-picker>
    </el-dialog>
  </div>
</template>

<style scoped>

</style>
