<template>
  <v-layout my-3 justify-center>
    <v-flex xs12 md6>
         <v-form  v-model="isFormValid" lazy-validation ref="form" class="formulario elevation-4" >
            <h2 style="text-align: left; padding-top: 10px;"><span style="color: rgb(238, 68, 170);" class="font-weight-light" >Nuevo deudor</span></h2>
          <v-text-field v-model="description" :rules="descriptionRules" label="Descripcion" required></v-text-field>

          <v-select v-model="deudor" :rules="deudorRules" label="Deudor" required></v-select>

          <v-text-field v-model="deuda" :rules="deudaRules" label="Deuda" required type="number"></v-text-field>
          <v-layout justify-center>
            <v-flex style="text-align:center">
          <v-btn :disabled="!isFormValid">submit</v-btn>
          <v-btn @click="clear">clear</v-btn>
          </v-flex>
          </v-layout>
        </v-form>
      </v-flex>
  </v-layout>
</template>


<script>
import { mapActions, mapState} from 'vuex';
export default {
  data() {
    return {
        isFormvalid: true,
        description: '',
        deudor: '',
        deuda: '',
        descriptionRules: [
        // Check if description in input
        description => !!description || "La descripcion es requerida",
        // Make sure description is less than 10 characters
        description =>
          description.length < 70 || "Descripcion debe ser menor a 70 caracteres"
      ],
      deudorRules: [
        // Check if deudor in input
        deudor => !!deudor || "El deudor es requido"
      ],
      deudaRules: [
        // Check if deuda in input
        deuda => !!deuda || "La deuda es requida"
      ]
    }
  },
  methods: { 
    ...mapActions(['signOut']),
      clear() {
        this.$refs.form.reset()
      },
  },
  created() {
    if (this.user == null) {
      this.signOut();
      this.$router.push("/signin");
    }
  },
  computed: {
    ...mapState(['user'])
  },
}
</script>