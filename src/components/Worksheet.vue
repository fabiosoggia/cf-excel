<template>
  <div class="hello">
    <h1>{{ name }}</h1>
  </div>
  <table>
    <thead>
      <tr>
        <th class="col-label">
          <!-- First empty cell -->
        </th>
        <th class="col-label" v-for="(index, col) in cells[0]">
          {{ getColName(index) }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(index, row) in cells">
        <td class="row-label">{{ getRowName(index) }}</td>
        <td v-for="cell in row">
          <cell :worksheet="data" :cell="cell"></cell>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import Cell from './Cell'

export default {
  components: {
    Cell
  },
  props: ['data'],
  data () {
    // I dati della worksheet sono quelli passati a questo componente
    return this.data
  },
  created: function () {
    // Crea le celle
  },
  computed: {

  },
  methods: {
    getColName (index) {
      var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      return letters[index]
    },
    getRowName (index) {
      return (index + 1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
table {
  width: 100%;
  table-layout: fixed;
}

table td {
  position: relative;
  padding: 4px;
  font-size: 12px;
  vertical-align: middle;
}

.row-label,
.col-label {
  background-color: #efefef;
  color: #888;
  font-size: 12px;
  font-weight: normal;
}

.row-label {
  text-align: right;
}
</style>
