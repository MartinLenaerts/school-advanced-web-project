<template>
  <CBox>
    Test
  </CBox>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";
import { CBox } from "@chakra-ui/vue";

@Component({
  components: {
    CBox,
  },
})
export default class Connection extends Vue {}
</script>