<template>
  <c-box>

    <c-alert status="error" v-show="error.show" mb="1rem">
      <c-alert-icon/>
      {{ error.message }}
    </c-alert>

    <c-form-control class="container_field" is-required>
      <c-form-label>Nom :</c-form-label>
      <c-input v-model="user.name"/>
    </c-form-control>

    <c-form-control class="container_field" is-required>
      <c-form-label>Prenom :</c-form-label>
      <c-input v-model="user.firstname"/>
    </c-form-control>

    <c-form-control class="container_field" is-required>
      <c-form-label>Email :</c-form-label>
      <c-input v-model="user.email"/>
    </c-form-control>

    <c-form-control class="container_field" is-required>
      <c-form-label>Password :</c-form-label>
      <c-input v-model="user.password" type="password"/>
    </c-form-control>

    <c-form-control class="container_field" is-required>
      <c-form-label>Type d'utilisateur :</c-form-label>
      <c-radio-group v-model="type" :default-value="type">
        <c-radio value="acheteur">Acheteur</c-radio>
        <c-radio value="vendeur">Vendeur</c-radio>
      </c-radio-group>
    </c-form-control>

    <c-box display="flex" mt="1rem" class="container_field">
      <c-button @click="register" margin="auto">
        Inscription
      </c-button>
    </c-box>

    <c-box>
      <c-text>Vous avez pas deja un compte ?
        <router-link to="/sign-in" color="grey">Connectez vous</router-link>
      </c-text>
    </c-box>
  </c-box>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {CAlert, CAlertIcon, CBox, CButton, CFormControl, CFormLabel, CInput, CRadio, CRadioGroup, CText} from "@chakra-ui/vue";
import {createUserWithEmailAndPassword, getAuth} from "firebase/auth";
import {doc, getFirestore, setDoc} from "firebase/firestore";
import {FirebaseError} from "@firebase/app";
import {Error, getError, User} from "@/constants";

@Component({
  components: {
    CFormControl, CFormLabel, CInput, CButton, CBox, CRadio, CRadioGroup, CText, CAlert, CAlertIcon
  }
})
export default class FormRegister extends Vue {
  private user: User = {
    email: "",
    password: "",
    name: "",
    firstname: "",
    seller : false
  }
  private error: Error = {
    show: false,
    message: " "
  }
  private type  = "acheteur";

  async register(): Promise<void> {
    this.error = {
      show: false,
      message: " "
    }
    if (this.user.email != "" && this.user.password != "" && this.user.name != "" && this.user.firstname != "") {
      try {
        const firebaseAuth = getAuth();
        const userCredential = await createUserWithEmailAndPassword(firebaseAuth, this.user.email, this.user.password)
        const user = userCredential.user;

        const db = getFirestore();
        try {
          const docRef = await setDoc(doc(db, "users", user.uid), {
            firstname: this.user.firstname,
            name: this.user.name,
            seller: this.type == "vendeur",
          });
          this.$root.$emit("sign-up", "sign-up")
          await this.$router.push("/");
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      } catch (error: FirebaseError) {
        console.log(error);
        this.error = getError(error)
        console.log(this.error);
      }
    } else {
      this.error = {
        show: true,
        message: "Veuillez remplir tous les champs du formulaire"
      }
    }
  }


}
</script>

<style scoped>
.container_field {
  margin-bottom: 1rem;
}
</style>