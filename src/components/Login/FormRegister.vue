<template>
  <c-box>

    <c-alert status="error" v-show="error.show" mb="1rem">
      <c-alert-icon/>
      {{error.message}}
    </c-alert>

    <c-form-control class="container_field" is-required>
      <c-form-label>Nom :</c-form-label>
      <c-input v-model="name"/>
    </c-form-control>

    <c-form-control class="container_field" is-required>
      <c-form-label>Email :</c-form-label>
      <c-input v-model="email"/>
    </c-form-control>

    <c-form-control class="container_field" is-required>
      <c-form-label>Password :</c-form-label>
      <c-input v-model="password" type="password"/>
    </c-form-control>

    <c-form-control class="container_field" is-required>
      <c-form-label>Type d'utilisateur :</c-form-label>
      <c-radio-group v-model="type" :default-value="type">
        <c-radio value="acheteur" >Acheteur</c-radio>
        <c-radio value="vendeur">Vendeur</c-radio>
      </c-radio-group>
    </c-form-control>

    <c-box display="flex" mt="1rem" class="container_field">
      <c-button @click="register" margin="auto">
        Inscription
      </c-button>
    </c-box>

    <c-box >
      <c-text>Vous avez pas deja un compte ? <router-link to="/sign-in" color="grey">Connectez vous</router-link></c-text>
    </c-box>
  </c-box>
</template>

<script lang="ts">
import {Component, Emit,  Vue} from "vue-property-decorator";
import {CBox, CButton, CFormControl, CFormLabel, CInput, CRadio, CRadioGroup,CText, CAlert,CAlertIcon} from "@chakra-ui/vue";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import {FirebaseError} from "@firebase/app";
import {getError} from "@/constants";

@Component({
  components: {
    CFormControl, CFormLabel, CInput, CButton, CBox, CRadio, CRadioGroup, CText , CAlert,CAlertIcon
  }
})
export default class FormRegister extends Vue {
  private email = "";
  private password = "";
  private name = "";
  private error : Error = {
    show : false,
    message : ""
  }
  private type = "acheteur";
  @Emit()
  async register() {
    if (this.email != "" && this.password != "") {
      try {
        const firebaseAuth = getAuth();
        const userCredential = await createUserWithEmailAndPassword(firebaseAuth, this.email, this.password)
        const user = userCredential.user
        console.log(user);
      } catch (error : FirebaseError) {
        console.log(error);
        this.error = getError(error)
        console.log(this.error);
      }
    } else {
    this.error = {
        show : true,
        message : "Veuillez entrer un email et un mot de passe "
      }
    }
  }


}
</script>

<style scoped>
.container_field{
  margin-bottom: 1rem;
}
</style>