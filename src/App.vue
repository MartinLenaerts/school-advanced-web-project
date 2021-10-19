<template>
  <c-box>
    <nav-bar/>
    <router-view

    />
  </c-box>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import Home from "@/views/Home";
import NavBar from "@/components/NavBar";
import {CBox} from "@chakra-ui/vue";

@Component({
  components: {
    Home,NavBar,CBox
  }
})
export default class App extends Vue {

  mounted() : void{
    this.$root.$on("sign-out",()=>{
      if(this.$route.name != "Home")this.$router.push("/")
      this.$toast({
        title: 'Deconnexion',
        description: "Vous avez bien été déconnecté",
        status: 'success',
        duration: 10000
      })
    })

    this.$root.$on("sign-up",()=>{
      console.log("sign-up")
      this.$toast({
        title: 'Inscription',
        description: "Votre compte à bien été créé",
        status: 'success',
        duration: 10000
      })
    })
  }
}
</script>