<template>
  <c-box>
    <c-heading text-align="center">Welcome to Golden Truffles</c-heading>
  </c-box>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {CBox, CButton, CHeading, CLink, CText} from "@chakra-ui/vue";

@Component(
    {
      components: {
        CBox, CText, CHeading, CButton, CLink
      }
    })
export default class Home extends Vue {

  mounted() : void{
  console.log("home mounted")
    this.$root.$on("sign-out",()=>{
      console.log("sign-out")
      this.$toast({
        title: 'Deconnexion',
        description: "Vous avez bien été déconnecté",
        status: 'success',
        duration: 10000
      })
    })
  }
}
</script>

<style scoped>

</style>