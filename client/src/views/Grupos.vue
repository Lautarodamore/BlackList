<template>
<v-layout wrap  justify-center class="area">
  <v-layout my-3 justify-center>
    <v-flex xs12 md5 >
        <v-card color="#f5f5f5" style="margin-right: 25px;margin-left: 15px;border-color: #ee44aa;border: 1px solid #ee44aa;" :elevation="24">
    
          <v-card-title style="background: #f5f5f5; margin-top: 7px;">
		          <span style="color: rgb(238, 68, 170);" class="font-weight-light"><h1 style="font-weight: 100;">Nuevo Grupo</h1></span> 
          </v-card-title>

          <v-card-text>
             <v-form ref="form" v-model="valid" lazy-validation>
               <v-text-field v-model="numero" :rules="numeroRules" label="Numero grupo" type="number" required ></v-text-field>
               <v-text-field v-model="name" :rules="nameRules" type="text" label="Nombre del grupo" required></v-text-field>
            </v-form>
            <v-btn :disabled="!valid" @click="validate">submit</v-btn>
            <v-btn @click="reset">clear</v-btn>
          </v-card-text>
        </v-card>
    </v-flex>
           </v-layout>
</v-layout>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      numero: 0,
      name: '',
      valid: true,
      numeroRules: [
        v => !!v || "El numero es requerido" 
      ],
      nameRules: [
        v => !!v || "El nombre es requerido"
      ]
    }
  },
  methods: {
    ...mapActions(['signIn', 'signOut', 'ocupado', 'handleSnack']),
    async validate() {
        if (this.$refs.form.validate()) {
          
          try {
            let nuevoGrupo = {numero: this.numero, name: this.name}
            this.ocupado(true);

            let response = await axios.post('http://localhost:3000/group/new', nuevoGrupo);

            this.handleSnack({modelSnack: true, colorSnack: "success", textoSnack: "Grupo creado correctamente!"});  
          } catch (error) {
            console.log(error);
            this.handleSnack({modelSnack: true, colorSnack: "error", textoSnack: "Hubo un error, intentelo mas tarde"});
          }  
          finally {
            this.ocupado(false);
          }

        }
      },
      reset() {
        this.$refs.form.reset()
      }
  },
}
</script>

<style scoped>
  .context {
    width: 100%;
    top:50vh;
    z-index: 2000;
}



.area{
    background: rgb(195, 0, 71);  
    width: 100%;
    height:100vh;
    
   
}

</style>