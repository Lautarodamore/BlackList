<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-flex xs12 md4>
        
      </v-flex>

      <v-flex xs12 md8>
         <v-data-table
    :headers="headers"
    :items="desserts"
    class="elevation-1"
  >
    <template v-slot:items="props">
      <td>{{ props.item.id }}</td>
      <td class="text-xs-right">{{ props.item.description }}</td>
      <td class="text-xs-right">{{ props.item.deudor }}</td>
      <td class="text-xs-right">{{ props.item.deuda }}</td>
      <td class="text-xs-right">{{ props.item.acciones }}</td>
    </template>
  </v-data-table>
      </v-flex>

      
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        headers: [
          {
            text: 'id',
            align: 'left',
            value: 'id'
          },
          { text: 'Descripcion', value: 'description', sortable: false },
          { text: 'Deudor', value: 'deudor', sortable: false, },
          { text: 'Deuda', value: 'deuda' },
          { text: 'Acciones', value: 'acciones', sortable: false }
        ],
        desserts: [
          {
            id: 1,
            description: 'Deuda moto',
            deudor: 'Mati',
            deuda: 87,
            acciones: 6.5
          },
          {
            id: 2,
            description: 'Deuda droga',
            deudor: 'Pato',
            deuda: 51,
            acciones: 4.9
          },
          {
            id: 3,
            description: 'Deuda Ibo',
            deudor: 'Juanma',
            deuda: 65,
            acciones: 7
          }
        ]
      }
    }
  }
</script>