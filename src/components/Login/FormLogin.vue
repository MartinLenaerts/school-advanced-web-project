<template>
  <c-form-control>
    <c-form-label>Email :</c-form-label>
    <c-input/>
    <c-form-label>Password :</c-form-label>
    <c-input/>
  </c-form-control>
</template>

<script>
import {Component, Vue} from "vue-property-decorator";
import {CFormControl, CFormLabel, CInput} from "@chakra-ui/vue";

@Component({
  components: {
    CFormControl, CFormLabel, CInput
  }
})
export default class FormLogin extends Vue {
}
</script>

<style scoped>

</style>