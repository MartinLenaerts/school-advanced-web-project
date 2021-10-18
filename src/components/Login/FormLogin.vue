<template>
  <c-box>
    <c-alert status="error" v-show="error.show" mb="1rem">
      <c-alert-icon/>
      {{ error.message }}
    </c-alert>
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
import {Component, Emit, Vue} from "vue-property-decorator";
import {CAlert, CAlertIcon, CBox, CButton, CFormControl, CFormLabel, CInput, CText} from "@chakra-ui/vue";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {getDoc, doc, getFirestore} from "firebase/firestore";
import {FirebaseError} from "@firebase/app";
import {Error, getError} from "@/constants";
import NavBar from "@/components/NavBar.vue";

@Component({
  components: {
    CFormControl, CFormLabel, CInput, CButton, CBox, CText, CAlert, CAlertIcon
  }
})
export default class FormLogin extends Vue {
  private email = "";
  private password = "";
  private error: Error = {
    show: false,
    message: "no error"
  };

  @Emit()
  async signIn() : Promise<void> {
    if (this.email != "" && this.password != "") {
      try {
        const firebaseAuth = getAuth();
        const db = getFirestore();
        const userCredential = await signInWithEmailAndPassword(firebaseAuth, this.email, this.password);
        const docRef = doc(db, "users", userCredential.user.uid);
        const docSnap = await getDoc(docRef);
        this.$session.start();
        this.$session.set("user",{...userCredential.user,...docSnap.data()});
        this.$root.$emit("sign-in","sign-in");
        await this.$router.push('/');
      } catch (error: FirebaseError) {
        console.log(error);
        this.error = getError(error);
      }
    } else {
      this.error = {
        show: true,
        message: "Veuillez entrer un email et un mot de passe "
      }
      }
  }
}
</script>

<style scoped>
</style>