<template>
  <c-alert status="error" v-if="getError()" v-show="getError()" mb="1rem">
    <c-alert-icon/>
    {{ getError().message }}
  </c-alert>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {CAlert, CAlertIcon, CBox} from "@chakra-ui/vue";

@Component({
  components: {CAlert, CAlertIcon, CBox}
})
export default class ErrorComponent extends Vue {

  created(): void {
    this.$store.commit("setError", null);
  }

  getError(): Error {
    return this.$store.state.error
  }
}
</script>

<style scoped>

</style>