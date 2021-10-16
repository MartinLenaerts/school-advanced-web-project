<template>
  <c-box>
    <c-heading>Welcome to Golden Truffles</c-heading>
    <c-link as="router-link" to="/sign-in">
      <c-button variant-color="blue" variant="outline">Connection</c-button>
    </c-link>
  </c-box>
</template>

<script>
import {Component, Vue} from "vue-property-decorator";
import {CBox, CHeading, CText,CButton,CLink} from "@chakra-ui/vue";

@Component(
    {
      components: {
        CBox, CText, CHeading,CButton,CLink
      }
    })
export default class Home extends Vue {
}
</script>

<style scoped>

</style>