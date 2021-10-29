<template>
  <c-box>

    <error-component/>

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
        <c-radio value="buyer">Acheteur</c-radio>
        <c-radio value="seller">Vendeur</c-radio>
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
import {User} from "@/constants";
import ErrorComponent from "@/components/Error/ErrorComponent.vue";

@Component({
  components: {
    ErrorComponent,
    CFormControl, CFormLabel, CInput, CButton, CBox, CRadio, CRadioGroup, CText, CAlert, CAlertIcon
  }
})
export default class FormRegister extends Vue {
  user: User = {
    email: "",
    password: "",
    name: "",
    firstname: "",
    seller: false,
    uid: ""
  }
  type = "buyer";

  async register(): Promise<void> {
    if (this.user.email == "" || this.user.password == "" || this.user.name == "" || this.user.firstname == "") throw new Error("Veuillez remplir tous les champs du formulaire");
    const {user} = await createUserWithEmailAndPassword(getAuth(), this.user.email, this.user.password)
    await setDoc(doc(getFirestore(), "users", user.uid), {
      firstname: this.user.firstname,
      name: this.user.name,
      seller: this.type == "vendeur",
    });
    this.$toast({
      title: 'Inscription',
      description: "Votre compte à bien été créé",
      status: 'success',
      duration: 10000
    })
    await this.$router.push("/");
  }
}
</script>

<style scoped>
.container_field {
  margin-bottom: 1rem;
}
</style>