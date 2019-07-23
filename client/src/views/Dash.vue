<template>
    <v-layout my-3 text-xs-center wrap>

      <v-flex xs12 md6>
        <v-card style="margin-right: 25px;margin-left: 15px;border-color: #ee44aa;border: 1px solid #ee44aa; margin-bottom: 22px;" >
    
          <v-card-title style="background: #f5f5f5">
            Carta numero uno
          </v-card-title>

        </v-card>
      </v-flex>

      <v-flex xs12 md6>
        <v-card style="margin-right: 25px;margin-left: 15px;border-color: #ee44aa;border: 1px solid #ee44aa; margin-bottom: 22px;" >
    
          <v-card-title style="background: #f5f5f5">
            Carta numero dos
          </v-card-title>
          
        </v-card>
      </v-flex>

      <v-flex xs12 md6>
        <v-card color="#f5f5f5" style="margin-right: 25px;margin-left: 15px;border-color: #ee44aa;border: 1px solid #ee44aa;" >
    
          <v-card-title style="background: #f5f5f5">
            Carta numero tres
          </v-card-title>
          <v-card-content>
             <chartjs-doughnut :labels="labels" :datasets="datasets" :option="option"></chartjs-doughnut>
          </v-card-content>
        </v-card>
      </v-flex>

      <v-flex xs12 md6>
        <v-card color="#f5f5f5" style="margin-right: 25px;margin-left: 15px;border-color: #ee44aa;border: 1px solid #ee44aa;" >
    
          <v-card-title style="background: #f5f5f5">
            Carta numero cuatro
          </v-card-title>
          <v-card-content>
            <chartjs-line :datalabel="mylabel" :labels="mylabels" :data="mydata" :width="mywidth"></chartjs-line>
          </v-card-content>
        </v-card>
      </v-flex>

    </v-layout>
</template>

<script>

export default {
  data() {
    return {
      mywidth : 300,
      mylabel : 'TestDataLabel',
      mylabels : ['happy', 'myhappy', 'hello'],
      mydata : [0, 20, 50],
      labels: ["Apples", "Bananas", "Grapes"],
      datasets: [
        {
          data: [20,30,50],
          backgroundColor: ["Red", "#ee44aa", "Purple"]
        }
      ],
      option: {
            title: {
              display: true,
              position: "bottom",
              text: "Fruits"
            }
          }
    }
  }
}
</script>