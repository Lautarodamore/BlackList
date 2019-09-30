<template>
    <v-layout my-3 text-xs-center wrap>

      <v-flex xs12 md6>
        <v-card style="margin-right: 25px;margin-left: 15px;border-color: #ee44aa;border: 1px solid #ee44aa; margin-bottom: 22px;" >
    
          <v-card-title style="background: #f5f5f5; text-align:center;">
           <span style="color: rgb(238, 68, 170); width:100%;" class="font-weight-light"><h2 style="font-weight: 300; text-align:center;">Top 3 mas deudores</h2></span> 
          </v-card-title>

        </v-card>
      </v-flex>

      <v-flex xs12 md6>
        <v-card style="margin-right: 25px;margin-left: 15px;border-color: #ee44aa;border: 1px solid #ee44aa; margin-bottom: 22px;" >
    
          <v-card-title style="background: #f5f5f5; text-align:center;">
            <span style="color: rgb(238, 68, 170); width:100%;" class="font-weight-light"><h2 style="font-weight: 300; text-align:center;">Total deudores</h2></span>
          </v-card-title>
          
        </v-card>
      </v-flex>

      <v-flex xs12 md6>
        <v-card color="#f5f5f5" style="margin-right: 25px;margin-left: 15px;border-color: #ee44aa;border: 1px solid #ee44aa;" >
          <v-card-text>
             <canvas id="myChart" ></canvas>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs12 md6>
        <v-card color="#f5f5f5" style="margin-right: 25px;margin-left: 15px;border-color: #ee44aa;border: 1px solid #ee44aa;" >
    
          <v-card-text>
            <canvas id="myChart2" ></canvas>
          </v-card-text>
        </v-card>
      </v-flex>

    </v-layout>
</template>

<script>
import axios from 'axios';
import { mapActions, mapState} from 'vuex';

// Any of the following formats may be used


export default {
  data() {
    return {
      nombresTorta: [],
      deudasTorta: [],
      nombresBarra: [],
      deudasBarra: []
    }
  },
  methods: {
    ...mapActions(['signOut'])
  },
  computed: {
    ...mapState(['user'])
  },
  mounted() {
    
},
  async beforeMount() {
    try {
      this.ocupado(true);
      let response = await axios.get(`/list/most/${this.user.usuario._id}`);
      let lista = response.data;
      console.log(lista);
      let response2 = await axios.get(`/list/mosted/${this.user.usuario._id}`);
      let lista2 = response2.data;
      console.log(lista2);
      lista.forEach(deudor => {
        this.nombresTorta.push(deudor.username);
        this.deudasTorta.push(deudor.deudaFinal);
      });
      console.log(this.deudasTorta);
      this.iniciarDatosTorta(this.nombresTorta, this.deudasTorta);

      lista2.forEach(deudor => {
        this.nombresBarra.push(deudor.username);
        this.deudasBarra.push(deudor.deudaFinal);
      });

      this.iniciarDatosBarras(this.nombresBarra, this.deudasBarra);
    } catch (error) {
      console.log(error);
    }
    finally{
      this.ocupado(false);
    }
  },
  destroyed() {
    this.nombresTorta = [];
    this.deudasTorta = [];
  },
  
  methods: {
    ...mapActions(['ocupado']),
    iniciarDatosBarras(listaNombres, listaDeudas){
    var ctx = document.getElementById('myChart');
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: listaNombres,
          datasets: [{
              label: 'Deuda',
              data: listaDeudas,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
      }
  });
    },
    iniciarDatosTorta(listaNombres, listaDeudas){
      var ctx2 = document.getElementById('myChart2');
      var myChart2 = new Chart(ctx2, {
      type: 'pie',
      data: {
          labels: listaNombres,
          datasets: [{
              label: '# of Votes',
              data: listaDeudas,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
              ],
              borderWidth: 1
          }]
      }
  });
      
    }
  },
}
</script>