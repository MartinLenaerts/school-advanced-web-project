<template>
  <c-box>
    <c-heading text-align="center" padding-bottom="1rem">Sign out</c-heading>
    <c-box id="container_login">
      <c-box id="container_form_login" shadow="md">
        <form-register />
      </c-box>
    </c-box>
  </c-box>
</template>

<script>
import {Component, Vue} from "vue-property-decorator";
import {CBox, CHeading} from "@chakra-ui/vue";
import FormRegister from "@/components/Login/FormRegister";

@Component({
  components: {
    FormRegister,
    CBox,
    CHeading
  }
})
export default class Register extends Vue {
}
</script>

<style scoped>
#container_form_login {
  margin: auto;
  border: 1px solid lightgrey;
  padding: 2rem;
}

#container_login {
  display: flex;
}
</style>