<template>
  <div class="app">Vue version {{ bookList }}</div>
</template>

<script>
import { getBooksQuery } from '../queries'

export default {
  apollo: {
    bookList: getBooksQuery,
  },
  mounted() {
    console.log(this.$apollo.queries.bookList)
  },
}
</script>

<style>
html,
body {
  padding: 0;
  margin: 0;
  min-height: 100vh;
  font-size: 16px;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}
</style>
