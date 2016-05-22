<template>
  <div v-on:click="onFocus" v-bind:style="[cellStyle]" class="text">{{ value }}</div>
  <input v-focus="focus" v-on:blur="onBlur" v-show="focus" v-el="input" type="text" v-model="cell.content">
</template>

<script>
import { focus } from 'vue-focus'
import { getValue, save, isFormula } from '../store'

export default {
  props: ['cell', 'worksheet'],
  data () {
    return {
      focus: false
    }
  },
  computed: {
    cellStyle () {
      return {
        textAlign: (isNaN(this.value)) ? 'left' : 'right',
        fontWeight: (isFormula(this.cell.content)) ? 'bold' : 'normal',
        color: (isFormula(this.cell.content)) ? '#000' : 'auto'
      }
    },
    value () {
      // console.log(this.worksheet)
      // return 1
      return getValue(this.worksheet, this.cell.row, this.cell.col)
    }
  },
  methods: {
    onFocus () {
      this.focus = true
      // console.log(this)
      // this.$$.input.focus()
    },
    onBlur () {
      this.focus = false
      save(this.cell)
      // compute(this.worksheet)
    }
  },
  directives: { focus: focus }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.text,
input {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border: 1px solid #fafafa;
  outline: none;
  font-size: 12px;
  line-height: 24px;
  z-index: 1;
  overflow: hidden;
}

.text:hover {
  background-color: #fafafa;
  cursor: text;
}

input {
  z-index: 999;
  border-color: #C0E8BB;
  background-color: #fafafa;
  padding-left: 4px;
}
</style>
