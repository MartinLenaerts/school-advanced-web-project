<template>
  <CBox>
    <CText>Hello</CText>
  </CBox>
</template>

<script>
import {Component, Vue} from "vue-property-decorator";
import {CBox, CText} from "@chakra-ui/vue";

@Component(
    {
      components: {
        CBox, CText
      }
    })
export default class Home extends Vue {
}
</script>

<style scoped>

</style>