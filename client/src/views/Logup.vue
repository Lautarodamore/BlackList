<template>
    <v-layout my-3 text-xs-center wrap justify-center>

      <v-flex xs12 md8>
        <v-card style="margin-right: 25px;margin-left: 15px;border-color: #ee44aa;border: 1px solid #ee44aa;" >
    
          <v-card-title style="background: #f5f5f5">
            Deudores y Deudas
            <v-spacer></v-spacer>
            <v-text-field v-model="search" append-icon="fa fa-search" label="Buscar" single-line hide-details></v-text-field>
          </v-card-title>
          
          <v-data-table style="background: #f5f5f5!important" :headers="headers" :items="list" :search="search">
            
            <template style="background: #f5f5f5" v-slot:items="props">
              <td style="background: #f5f5f5" >{{ props.item._id }}</td>
              <td style="background: #f5f5f5" class="px-0">{{ props.item.description }}</td>
              <td style="background: #f5f5f5" class="px-0">{{ props.item.userDef.username }}</td>
              <td style="background: #f5f5f5" class="px-0">{{ props.item.default }}</td>
              <td class="px-0" style="background: #f5f5f5">
          <v-icon small style="color: rgb(238, 68, 170)" class="mr-2" @click="editItem(props.item._id)" >
            fas fa-pen
          </v-icon>
          <v-icon small style="color: rgb(238, 68, 170)">
            fas fa-trash
          </v-icon>
          </td>
            </template>


          </v-data-table>
        </v-card>
  </v-flex>

      
    </v-layout>
</template>

<script>
import axios from 'axios';
  export default {
    data () {
      return {
        list: [],
        deudores: [],
        search: '',
        headers: [
          { text: 'id', align: 'left', value: '_id' },
          { text: 'Descripcion', value: 'description', sortable: false },
          { text: 'Deudor', value: 'userDef', sortable: false },
          { text: 'Deuda', value: 'default' },
          {text: 'Acciones'}
        ], 
      }
    },
    methods: {
      editItem(_id){
        console.log(_id);
        
      }
    },
    async created() {
      await axios.get('http://localhost:3000/list/all/5cf5d426bac1932e50292fa6').then(listDatabase => {
        this.list = listDatabase.data;
        this.deudores = listDatabase.data.userDef;
        console.log(listDatabase.data);
        
      });
    },
  }
</script>

<style>
.v-datatable{
  background: #f5f5f5;
  
}

.formulario{
  margin-right: 5px;margin-left: 4px;border: 1px solid rgb(238, 68, 170); padding-right: 5px;padding-left: 17px;padding-bottom: 46px;
}
</style>
