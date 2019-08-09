<template>
    <v-layout my-5 text-xs-center align-center justify-center>
     
      <v-flex xs12 md5>
        <v-card color="#f5f5f5" style="margin-right: 25px;margin-left: 15px;border-color: #ee44aa;border: 1px solid #ee44aa;" :elevation="24">
    
          <v-card-title style="background: #f5f5f5; margin-top: 7px;">
            <div >
		          <span style="color: rgb(238, 68, 170);" class="font-weight-light"><h1 style="font-weight: 100;">Nuevo deudor</h1></span> 
	          </div>
          </v-card-title>

          <v-card-text>
             <v-form ref="form" v-model="valid" lazy-validation>
                <v-textarea v-model="description" :rules="descriptionRules" counter label="Descripcion" required></v-textarea>

               <v-select v-model="deudor" :items="deudores" :rules="[v => !!v || 'El deudor es requerido']" label="Deudor" required></v-select>
               
               <v-text-field v-model="deuda" :rules="deudaRules" type="number" label="Monto de la deuda" required></v-text-field>
            </v-form>
            <v-btn :disabled="!valid" @click="validate">submit</v-btn>
            <v-btn @click="reset">clear</v-btn>
          </v-card-text>
        </v-card>
  </v-flex>

      
    </v-layout>
</template>

<script>
import axios from 'axios';
import { mapActions, mapState} from 'vuex';

export default {
    data: () => ({
      valid: true,
      deudor: null,
      deuda: '',
      deudaRules: [
        v => !!v || 'La deuda es requerida',
      ],
      description: '',
      descriptionRules: [
        v => !!v || 'La descripcion es requerida es requerido'
      ],
      deudores: []
    }),
    methods: {
      ...mapActions(['ocupado', 'handleSnack']),
      async cargarDatos() {
        try {
        let response = await axios.post('http://localhost:3000/users/group', this.user.usuario);
        response.data.forEach(deudor => {
          console.log(deudor);
          console.log(deudor.username);
          this.deudores.push(deudor.username);
        });
      } catch (error) {
        console.log(error);
      }
      },
      async validate() {
        if (this.$refs.form.validate()) {
          this.ocupado(true);
          let response = await axios.post('http://localhost:3000/users/username', {username: this.deudor});
          console.log(response);
          console.log(this.user);
          try {
            
              let lista = {
                description: this.description,
                userDef: response.data._id,
                createdBy: this.user.usuario._id,
                default: this.deuda
              };
              console.log(lista);
              let response2 = await axios.post('http://localhost:3000/list/new', lista);
              console.log(response2);
              this.handleSnack({modelSnack: true, colorSnack: "success", textoSnack: "Deudor agregado con exito!"});
          } catch (error) {
              console.log(error);
              this.handleSnack({modelSnack: true, colorSnack: "error", textoSnack: "Ocurrio un error."});
          }  
          finally {
            this.ocupado(false);
            this.$refs.form.reset()
          }
          
        }
      },
      reset() {
        this.$refs.form.reset()
      }
    },
    computed: {
      ...mapState(['user']),
    },
    async mounted() {
      await this.cargarDatos();      
    }
  }
</script>
