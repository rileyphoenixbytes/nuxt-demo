<template>
  <div>{{  phrase }}
  </div>
</template>
<script setup>
import {
  generatePhrase,
  validatePhrase,
  encryptToKeyStore,
  decryptFromKeystore,
} from '@xchainjs/xchain-crypto'
const phrase=ref('')
onMounted(() => {
  console.log('Welcome to Nuxt!')
  phrase.value = generatePhrase()
  console.log(phrase)
})</script>