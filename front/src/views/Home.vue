<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col
        xs="12"
        lg="10"
        xl="8"
      >
        <Table />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Table from '@/components/Table.vue'

export default {
  name: 'home',
  components: {
    Table
  }
}
</script>
