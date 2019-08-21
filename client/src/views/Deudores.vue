<template>
    <v-layout my-3 text-xs-center wrap justify-center>

      <v-flex xs12 md8>
        <v-card style="margin-right: 25px;margin-left: 15px;border-color: #ee44aa;border: 1px solid #ee44aa;" >
    
          <v-card-title style="background: #f5f5f5">
            Deudores y Deudas
            <v-spacer></v-spacer>
            <v-text-field v-model="search" append-icon="fa fa-search" label="Buscar" single-line hide-details></v-text-field>
          </v-card-title>
          
          <v-data-table style="background: #f5f5f5!important" :headers="headers" :items="deudores" :search="search">
            <template style="background: #f5f5f5" v-slot:items="props">
              <td style="background: #f5f5f5" class="px-0">{{ props.item.fecha }}</td>
              <td style="background: #f5f5f5" class="px-0">{{ props.item.description }}</td>
              <td style="background: #f5f5f5" class="px-0">{{ props.item.userDef.username }}</td>
              <td style="background: #f5f5f5" class="px-0">{{ props.item.default }}</td>
              <td class="px-0" style="background: #f5f5f5">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-icon v-on="on" small style="color: rgb(238, 68, 170)" class="mr-2" @click="editItem(props.item)" >
                      fas fa-pen
                    </v-icon>
                  </template>
                  <span>Editar deuda</span>
                 </v-tooltip>
                
                 <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-icon v-on="on" @click="deleteItem(props.item)" small style="color: rgb(238, 68, 170)">
                      fas fa-money-bill-wave
                    </v-icon>
                  </template>
                  <span>Cobrar deuda</span>
                 </v-tooltip>
              </td>
            </template>
          </v-data-table>
        </v-card>
  </v-flex>

  <v-dialog v-model="editDialog" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">Editar deuda</span>
      </v-card-title>

      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
              <v-flex xs12>
                <v-text-field v-model="editedItem.description" label="Descripcion"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="editedItem.default" label="Deuda"></v-text-field>
              </v-flex>
          </v-layout>
              </v-container>
          </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="editDialog = false">Cancel</v-btn>
              <v-btn color="primary" @click="saveEditItem">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="deleteDialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">Cobrar deuda</span>
            </v-card-title>
                <v-card-text>
                  Estas seguro que deseas cobrar la deuda y eliminarla?
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="deleteDialog = false">Cancel</v-btn>
                  <v-btn color="primary" @click="cobrar">Aceptar</v-btn>
              </v-card-actions>
          </v-card>
        </v-dialog>
    </v-layout>

    
</template>

<script>
import { mapActions, mapState} from 'vuex';

import axios from 'axios';

export default {
    data () {
      return {
        editDialog: false,
        deleteDialog: false,
        deudores: [],
        search: '',
        headers: [
          { text: 'Fecha', value: 'fecha', sortable: false },
          { text: 'Descripcion', value: 'description', sortable: false },
          { text: 'Deudor', value: 'userDef', sortable: false },
          { text: 'Deuda', value: 'default' },
          {text: 'Acciones'}
        ],
        editIndex: -1,
        editedItem: {
          _id: '',
          description: '',
          default: 0,
        },
        deleteId: '',
        deleteIndex: -1
      }
    },
    async created() {
      await this.cargarTabla();
    },
    methods: {
      ...mapActions(['ocupado', 'handleSnack']),
      async editItem(item){
          this.editDialog = true;
          this.editedItem._id = item._id;
          this.editedItem.description = item.description;
          this.editedItem.default = item.default;
          this.editIndex = this.deudores.indexOf(item);
      },
      async saveEditItem(){
        this.ocupado(true);

        try {

          let responseEditado = await axios.put(`/list/update/${this.editedItem._id}`, this.editedItem);
          Object.assign(this.deudores[this.editIndex], responseEditado.data.list);
          
          this.handleSnack({modelSnack: true, colorSnack: "success", textoSnack: "La deuda se guardo correctamente!"});
        } catch (error) {
          console.log(error);
          this.handleSnack({modelSnack: true, colorSnack: "error", textoSnack: "Hubo un error al guardar el deudor, intentlo mas tarde"});         
        }
        finally{
          this.editDialog = false;
          this.ocupado(false);
        }

      },
      deleteItem(item) {
        console.log(item);
        this.deleteId = item._id;
        this.deleteDialog = true;
        this.deleteIndex = this.deudores.indexOf(item);
      },
      async cobrar() {
        try {
          let responseDelete = await axios.delete(`/list/delete/${this.deleteId}`);
          this.deudores.splice(this.deleteIndex, 1);
          this.handleSnack({modelSnack: true, colorSnack: "success", textoSnack: "Deuda cobrada correctamente!"});
        } catch (error) {
          console.log(error);
          this.handleSnack({modelSnack: true, colorSnack: "error", textoSnack: "Hubo un error al cobrar la deuda, intentlo mas tarde"});
        }
        finally{
          this.editDialog = false;
        }

      },
      async cargarTabla() {
        this.ocupado(true);
        console.log(this.user);
        
        let responseDeudores = await axios.get(`/list/all/${this.user.usuario._id}`);
        let arrayDeudores = responseDeudores.data;
        console.log(responseDeudores.data);
        arrayDeudores.forEach(deudor => {
          let fechaDeudor = deudor.fecha;
          deudor.fecha = fechaDeudor.slice(0,10);
        });
        console.log(arrayDeudores);
        this.deudores = arrayDeudores;
        this.ocupado(false);
      }
    },
    computed: {
      ...mapState(['user'])
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
