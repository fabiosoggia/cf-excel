<template>
  <div id="app">
    <h1>CF Excel</h1>
    <p>This is a test excel-like app. Supported formulas:</p>
    <ul>
      <li>= <span class="function-name">SUM</span><span class="function-arguments">(X1:Y9)</span></li>
      <li>= <span class="function-name">MIN</span><span class="function-arguments">(X1:Y9)</span></li>
      <li>= <span class="function-name">MAX</span><span class="function-arguments">(X1:Y9)</span></li>
      <li>= <span class="function-name">AVERAGE</span><span class="function-arguments">(X1:Y9)</span></li>
    </ul>
    <worksheet :data="data"></worksheet>
  </div>
</template>

<script>
import Worksheet from './components/Worksheet'
import Store from './store'

export default {
  data () {
    return {
      data: Store
    }
  },
  components: {
    Worksheet
  }
}
</script>

<style>
html {
  font-family: 'Lato';
  max-width: 1024px;
  margin: 10px auto;
  color: #999;
}

h1 {
  font-size: 32px;
  color: #555;
  font-weight: normal;
  margin: 1.5em 0 .5em;
}

ul {
  padding: 0;
  line-height: 1.5em;
  font-family: 'Inconsolata';
  letter-spacing: 1px;
}

.logo {
  width: 100px;
  height: 100px
}
</style>
<style scoped>
.function-name {
    color: #555;
}

.function-arguments {
    color: #aaa;
}
</style>
