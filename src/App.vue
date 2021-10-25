<template>
  <c-box>
    <nav-bar/>
    <router-view />
  </c-box>
</template>

<script lang="ts">
import {Component, ProvideReactive, Vue, Watch} from "vue-property-decorator";
import Home from "@/views/Home.vue";
import NavBar from "@/components/NavBar.vue";
import {CBox} from "@chakra-ui/vue";
import {User} from "@/constants";

@Component({
  components: {
    Home,NavBar,CBox
  }
})
export default class App extends Vue {
  @ProvideReactive("error") message: string | null = null;



  mounted() : void{
    console.log(this.$store.state);
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