<template>
  <c-box>
    <c-heading text-align="center">Welcome to Golden Truffles</c-heading>
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