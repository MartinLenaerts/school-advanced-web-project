<template>
  <c-box class="container">
    <c-box m="auto">

      <c-heading text-align="center" mb="2rem">Profil</c-heading>
      <c-box class="container_field">
        <c-text class="label">Nom :</c-text>
        <c-text class="value"> {{ getUser().name }}</c-text>
      </c-box>
      <c-box class="container_field">
        <c-text class="label">Prenom :</c-text>
        <c-text class="value"> {{ getUser().firstname }}</c-text>
      </c-box>
      <c-box class="container_field">
        <c-text class="label">Email :</c-text>
        <c-text class="value"> {{ getUser().email }}</c-text>
      </c-box>
      <c-box class="container_field">
        <c-text class="label">Rôle :</c-text>
        <c-text class="value"> {{ getUser().seller ? "seller" : "buyer" }}</c-text>
      </c-box>
    </c-box>
  </c-box>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {CBox, CHeading, CText} from "@chakra-ui/vue";
import {User} from "@/constants";

@Component({
  components: {
    CText, CBox, CHeading
  }
})
export default class Profil extends Vue {

  mounted(): void {
    this.$root.$on("sign-out", () => {
      this.$router.push("/");
    })
  }

  getUser(): User | null {
    return this.$store.state.user;
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