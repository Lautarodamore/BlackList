<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <router-link style="text-decoration: none; color: black;" :to="{ path: '/' }">
        <v-toolbar-title class="headline text-uppercase">
        <span>BLACK</span>
        <span style="color: rgb(238, 68, 170);" class="font-weight-light">LIST</span>
      </v-toolbar-title>      
      </router-link>
      <v-spacer></v-spacer>
      <v-btn :to="{ path: '/login' }" depressed style="font-size: 17px" ><span class="font-weight-light" style="color: rgb(238, 68, 170);">SIGNIN</span></v-btn>
      <v-btn depressed style="font-size: 17px" ><span class="font-weight-light" style="color: rgb(238, 68, 170);">SIGNUP</span></v-btn>
    </v-toolbar>

     <v-navigation-drawer v-model="drawer" absolute temporary app>
      <v-list class="pa-1" style="background-color: #29B6F6">

        <v-list-tile avatar tag="div">

          <v-list-tile-content>
            <v-list-tile-title> <h1>BlackList</h1> </v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-btn icon>
              <v-icon>fas fa-money-check-alt</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>

      <v-list class="pt-0" dense >
        <v-divider light></v-divider>

        <v-list-tile :to="{ path: '/' }">
          <v-list-tile-action>
            <v-icon>fas fa-chart-bar</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>Inicio</v-list-tile-title>
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
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      drawer: false
    }
  }
}
</script>
