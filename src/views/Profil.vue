<template>
  <c-box class="container">
    <c-box m="auto">

      <c-heading text-align="center" mb="2rem">Profil</c-heading>
      <c-box class="container_field">
        <c-text class="label">Nom :</c-text>
        <c-text class="value"> {{ this.$session.get("user").name }}</c-text>
      </c-box>
      <c-box class="container_field">
        <c-text class="label">Prenom :</c-text>
        <c-text class="value"> {{ this.$session.get("user").firstname }}</c-text>
      </c-box>
      <c-box class="container_field">
        <c-text class="label">Email :</c-text>
        <c-text class="value"> {{ this.$session.get("user").email }}</c-text>
      </c-box>
      <c-box class="container_field">
        <c-text class="label">Rôle :</c-text>
        <c-text class="value"> {{ this.$session.get("user").seller ? "Vendeur" : "Acheteur" }}</c-text>
      </c-box>
    </c-box>
  </c-box>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {CBox, CText,CHeading} from "@chakra-ui/vue";

@Component({
  components: {
    CText, CBox,CHeading
  }
})
export default class Profil extends Vue {

  mounted(): void {
    this.$root.$on("sign-out", () => {
      this.$router.push("/");
    })
  }
}
</script>

<style scoped>
.label {
  font-weight: bold;
  margin-right: 1rem;
}

.container_field > * {
  display: inline-block;
}

.container {
  display: flex;
}
</style>