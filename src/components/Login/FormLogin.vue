<template>
  <c-box>
    <error-component/>
    <c-form-control class="container_field" is-required>
      <c-form-label>Email :</c-form-label>
      <c-input v-model="email"/>
    </c-form-control>

    <c-form-control class="container_field" is-required>
      <c-form-label>Password :</c-form-label>
      <c-input v-model="password" type="password"/>
    </c-form-control>

    <c-box display="flex" mt="1rem" mb="1rem">
      <c-button @click="signIn" margin="auto">
        Connection
      </c-button>
    </c-box>

    <c-box class="container_field">
      <c-text>Vous n'avez pas de compte ?
        <router-link to="/register" color="grey">Inscrivez vous</router-link>
      </c-text>
    </c-box>
  </c-box>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {CAlert, CAlertIcon, CBox, CButton, CFormControl, CFormLabel, CInput, CText} from "@chakra-ui/vue";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {doc, getDoc, getFirestore} from "firebase/firestore";
import ErrorComponent from "@/components/Error/ErrorComponent.vue";

@Component({
  components: {
    ErrorComponent,
    CFormControl, CFormLabel, CInput, CButton, CBox, CText, CAlert, CAlertIcon
  }
})
export default class FormLogin extends Vue {
  email = "";
  password = "";

  async signIn(): Promise<void> {
    if (this.email == "" && this.password == "") throw new Error("Veuillez entrer un email et un mot de passe");
    const {user} = await signInWithEmailAndPassword(getAuth(), this.email, this.password);
    const docRef = doc(getFirestore(), "users", user.uid);
    const docSnap = await getDoc(docRef);
    this.$store.commit("setUser", {...user, ...docSnap.data()})
    await this.$router.push('/');
  }
}
</script>

<style scoped>
</style>