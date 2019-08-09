<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-side-icon v-if="user != null" @click="drawer = !drawer"></v-toolbar-side-icon>
      <router-link style="text-decoration: none; color: black;" :to="{ path: '/' }">
        <v-toolbar-title class="headline text-uppercase">
        <span>BLACK</span>
        <span style="color: rgb(238, 68, 170);" class="font-weight-light">LIST</span>
      </v-toolbar-title>      
      </router-link>
      <v-spacer></v-spacer>
      <v-btn v-if="user == null" :to="{ path: '/signin' }" depressed style="font-size: 17px" ><span class="font-weight-light" style="color: rgb(238, 68, 170);">SIGNIN</span></v-btn>
      <v-btn v-if="user == null" depressed :to="{ path: '/signup' }" style="font-size: 17px" ><span class="font-weight-light" style="color: rgb(238, 68, 170);">SIGNUP</span></v-btn>
      <v-btn v-if="user != null" depressed :to="{ path: '/' }" @click="signOut" style="font-size: 17px" ><span class="font-weight-light" style="color: rgb(238, 68, 170);">SIGNOUT</span></v-btn>
    </v-toolbar>

     <v-navigation-drawer v-model="drawer" absolute temporary app>
      <v-list class="pa-1" style="background-color: #C30047">

        <v-list-tile avatar tag="div">

          <v-list-tile-content>
            <router-link style="text-decoration: none; color: black;" :to="{ path: '/' }">
            <v-list-tile-title> <h1>BLACKLIST</h1> </v-list-tile-title>
            </router-link>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-btn icon>
              <v-icon>fas fa-money-check-alt</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>

      <v-list class="pt-0" dense>
        <v-divider light></v-divider>

        <v-list-tile :to="{ path: '/dashboard' }">
          <v-list-tile-action>
            <v-icon>fas fa-chart-bar</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>Dashboard</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile :to="{ path: '/ndeudor' }">
          <v-list-tile-action>
            <v-icon>fas fa-user-tie</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>Nueva deudor</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile :to="{ path: '/deudores' }">
          <v-list-tile-action>
            <v-icon>fas fa-hand-holding-usd</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>Deudores</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        
        
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <v-slide-y-transition mode="out-in">
        <router-view/>
      </v-slide-y-transition>
    </v-content>

    <v-dialog v-model="dialog" max-width="400" persistent>
      <v-card>
        <v-toolbar color="#C30047" dark card>
          <v-toolbar-title>
            Espere un momento
          </v-toolbar-title>
        </v-toolbar>
        <v-card-text class="subheading">
          Estamos consultando nuestros registros...
        </v-card-text>
        <v-card-text>
          <v-progress-linear :indeterminate="true" color="#C30047"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    
    <v-snackbar :color="colorSnack" v-model="modelSnack">
       <span v-if="textoSnack"> {{ textoSnack }} </span>
      <v-btn flat @click="cerrarSnack">
        Cerrar
      </v-btn>
    </v-snackbar>

  </v-app>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';

export default {
  name: 'App',
  data () {
    return {
      drawer: false
    }
  },
  computed: {
    ...mapGetters(['user', 'dialog', 'modelSnack', 'colorSnack', 'textoSnack'])
  },
  methods: {
    ...mapActions(['signOut', 'handleSnack']),
    cerrarSnack() {
      this.handleSnack({modelSnack: false, colorSnack: "", textoSnack: ""})
    },
    esAdmin() {
      if (this.user.usuario == "ADMIN") {
        return true;
      }
      return false;
    }
  },

}
</script>
