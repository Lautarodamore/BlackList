<template>
<header :style="{ background: 'url(' + image + ')' }">
    <v-layout my-3 text-xs-center wrap>

      <v-flex xs12 md6>
        <div style="margin-top:190px">
        <h1>BlackList - Administramos a los morosos por vos.</h1>
        <p style="font">Que ninguna persona te vuelva a dormir porque olvidaste
          que te debian plata.
        </p>
         <v-btn class="ma-2" tile outlined color="white">
          <v-icon left>fas fa-money-check-alt</v-icon> Empezar
        </v-btn>
        </div>
       </v-flex>

       <v-flex md5>
         <v-img src="https://crypviz.io/wp-content/uploads/2018/04/CDP-money.png"></v-img>
       </v-flex>

    </v-layout>
    </header>
</template>

<script>
export default {
  data() {
    return {
      image: require('@/assets/header-cover.jpg')
    }
  },
}
</script>

<style scoped>
header {
  background-size: cover;
  height: 100vh;
  position: relative;
  overflow: hidden;
  color: white;
}

header::after{
  content: '';
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 275px;
  background: url('https://res.cloudinary.com/lautidamo/image/upload/v1564099858/wave-bottom_hfldot.svg');
  
}

.book {
	width: 350px;
	height: 350px;
	transform: translatey(0px);
	animation: float 6s ease-in-out infinite;
  margin-top: 100px;
}
</style>
