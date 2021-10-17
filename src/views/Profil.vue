<template>
  <div>Hello {{this.$session.get("email")}} !</div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component
export default class Profil extends Vue {

  mounted() : void{
    this.$root.$on("sign-out",()=>{
      this.$router.push("/");
    })
  }
}
</script>

<style scoped>

</style>