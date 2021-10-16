<template>
  <c-box>
    <c-heading>Sign in</c-heading>
    <form-login/>
  </c-box>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";
import { CBox , CHeading } from "@chakra-ui/vue";
import FormLogin from "@/components/Login/FormLogin";

@Component({
  components: {
    FormLogin,
    CBox,
    CHeading
  },
})
export default class Connection extends Vue {}
</script>