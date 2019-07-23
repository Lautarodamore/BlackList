<template>
    <v-layout my-3 text-xs-center wrap justify-center>

      <v-flex xs12 md5>
        <v-card color="#f5f5f5" style="margin-right: 25px;margin-left: 15px;border-color: #ee44aa;border: 1px solid #ee44aa;" >
    
          <v-card-title style="background: #f5f5f5; margin-top: 7px;">
            <div class="avatar" style="text-align: center;  width:100%;">
		          <span style="color: rgb(238, 68, 170);" class="font-weight-light"><h1 style="font-weight: 100;">INICIAR SESION</h1></span> 
	          </div>
          </v-card-title>

          <v-card-text>
             <v-form ref="form" v-model="valid" lazy-validation>
               <v-text-field v-model="email" :rules="emailRules" label="E-mail" required ></v-text-field>
               <v-text-field v-model="password" :rules="passwordRules" label="Password" required></v-text-field>
            </v-form>
            <v-btn :disabled="!valid" @click="validate">submit</v-btn>
            <v-btn @click="reset">clear</v-btn>
          </v-card-text>
        </v-card>
  </v-flex>

      
    </v-layout>
</template>

<script>
export default {
    data: () => ({
      valid: true,
      password: '',
      passwordRules: [
        v => !!v || 'La password es requerida',
        v => (v && v.length >= 4) || 'La password debe ser mayor a 4 caracteres'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail es requerido',
        v => /.+@.+/.test(v) || 'E-mail debe ser valido'
      ],
    }),
    methods: {
      validate () {
        if (this.$refs.form.validate()) {
          this.snackbar = true
        }
      },
      reset() {
        this.$refs.form.reset()
      }
    }
  }
</script>

<style>
.avatar {
	box-sizing: border-box;
	transform: translatey(0px);
	animation: float 6s ease-in-out infinite;
	background-color: #f5f5f5; 
}

.avatar img { width: 100%; height: auto; }

@keyframes float {
	0% {
		transform: translatey(0px);
	}
	50% {
		transform: translatey(-20px);
	}
	100% {
		transform: translatey(0px);
	}
}
</style>
