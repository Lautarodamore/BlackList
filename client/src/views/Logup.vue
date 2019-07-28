<template>
<header :style="{ background: 'url(' + image + ')' }">
    <v-layout my-5 text-xs-center align-center justify-center>
     
      <v-flex xs12 md5>
        <v-card color="#f5f5f5" style="margin-right: 25px;margin-left: 15px;border-color: #ee44aa;border: 1px solid #ee44aa;" :elevation="24">
    
          <v-card-title style="background: #f5f5f5; margin-top: 7px;">
            <div class="avatar" style="text-align: center;  width:100%;">
		          <span style="color: rgb(238, 68, 170);" class="font-weight-light"><h1 style="font-weight: 100;">REGISTRATE</h1></span> 
	          </div>
          </v-card-title>

          <v-card-text>
             <v-form ref="form" v-model="valid" lazy-validation>
               <v-text-field v-model="username" :rules="usernameRules" label="Usuario" required ></v-text-field>
               <v-text-field v-model="email" :rules="emailRules" label="E-mail" required ></v-text-field>

               <v-text-field v-model="password" :rules="passwordRules" type="password" label="Contraseña" required></v-text-field>

            </v-form>
            <v-btn :disabled="!valid" @click="validate">submit</v-btn>
            <v-btn @click="reset">clear</v-btn>
          </v-card-text>
        </v-card>
  </v-flex>

      
    </v-layout>
    </header>
</template>

<script>
export default {
    data: () => ({
      image: require('@/assets/header-cover.jpg'),
      valid: true,
      username: '',
      usernameRules: [
        v => !!v || 'El usuario es requerido',
        v => (v && v.length <= 15) || 'El usuario debe ser menor a 10 caracteres'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail es requerido',
        v => /.+@.+/.test(v) || 'E-mail debe ser valido'
      ],
      password: '',
      passwordRules: [
        v => !!v || 'La contraseña es requerida',
        v => (v && v.length >= 4) || 'La contraseña debe ser mayor a 4 caracteres'
      ]
      
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

header {
  background-size: cover;
  height: 100vh;
  position: relative;
  overflow: hidden;
}

</style>
