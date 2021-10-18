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
}
</script>

<style scoped>

</style>