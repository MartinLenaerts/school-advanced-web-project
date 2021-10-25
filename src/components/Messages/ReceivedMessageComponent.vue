<template>
  <c-box class="container_message" shadow="md" p="1rem" m="1rem">
    <c-box>
      <c-text class="sender">Message de : <span>{{ message.sender.firstname }} {{ message.sender.name }}</span></c-text>
      <c-text class="product">Produit concerné : <span>{{ message.product.name }}</span></c-text>
    </c-box>
    <c-box>
      <c-text class="label_content">Contenu du message :</c-text>
      <c-text class="content">{{ message.content }}</c-text>
    </c-box>
    <c-box>
      <template v-if="message.isAnswered">
        <c-button class="button_to_answer" disabled>Répondu</c-button>
      </template>
      <template v-else>
        <c-alert-dialog
            :is-open="isOpen"
            :least-destructive-ref="$refs.cancelRef"
            :on-close="closeDialog"
        >
          <c-alert-dialog-overlay/>
          <c-alert-dialog-content>
            <c-alert-dialog-header font-size="lg" font-weight="bold">
              Répondre au message
            </c-alert-dialog-header>
            <c-alert-dialog-body>
              <c-alert status="error" v-show="error.show" mb="1rem">
                <c-alert-icon/>
                {{ error.message }}
              </c-alert>

              <c-box mb="1rem">
                <c-text>Message :</c-text>
                <c-text color="grey">{{ message.content }}</c-text>
              </c-box>
              <c-form-control class="container_field" is-required>
                <c-form-label>Votre reponse :</c-form-label>
                <c-textarea v-model="answer"/>
              </c-form-control>
            </c-alert-dialog-body>
            <c-alert-dialog-footer>
              <c-button ref="cancelRef" @click="closeDialog">
                Annuler
              </c-button>
              <c-button variantColor="green" @click="to_answer" ml="3">
                Envoyer le message
              </c-button>
            </c-alert-dialog-footer>
          </c-alert-dialog-content>
        </c-alert-dialog>
        <c-button class="button_to_answer" @click="openDialog">Répondre</c-button>
      </template>
    </c-box>
  </c-box>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {Error, Message} from "@/constants";
import {CAlert, CAlertDialog, CAlertDialogBody, CAlertDialogContent, CAlertDialogFooter, CAlertDialogHeader, CAlertDialogOverlay, CAlertIcon, CBox, CButton, CFormControl, CFormLabel, CText, CTextarea} from "@chakra-ui/vue";
import {addDoc, collection, doc, getFirestore, setDoc} from "firebase/firestore";

@Component({
  components: {
    CBox, CText, CButton,
    CAlertDialog,
    CAlertDialogOverlay,
    CAlertDialogFooter,
    CAlertDialogHeader,
    CAlertDialogBody,
    CAlertDialogContent,
    CAlertIcon,
    CAlert,
    CFormControl,
    CFormLabel,
    CTextarea
  }
})
export default class ReceivedMessageComponent extends Vue {
  @Prop() private message!: Message;

  private answer = "";
  private error: Error = {
    message: "",
    show: false
  }
  private isOpen = false;

  private closeDialog() {
    this.isOpen = false;
  }

  private openDialog() {
    this.isOpen = true;
  }

  private async to_answer(): Promise<boolean> {
    this.error = {
      show: false,
      message: ""
    }
    if (this.answer == "") {
      this.error = {show: true, message: "Veuillez entrer un message"};
      return false;
    }

    try {
      const db = getFirestore();
      const docRef = await addDoc(collection(db, "messages"), {content: this.answer, receiver: this.message.sender.uid, sender: this.$store.state.user.uid, product: this.message.product.id, answeredTo: this.message.id, isAnswered: false});
      const docRes = await setDoc(doc(db, "messages", this.message.id), {isAnswered: true}, {merge: true});
      this.$toast({
        title: 'Reponse envoyée',
        description: "Votre reponse à bien été envoyée",
        status: 'success',
        duration: 10000
      })
      this.isOpen = false;
      return true
    } catch (e) {
      console.error("Error adding document: ", e);
      return false;
    }
  }

}
</script>

<style scoped>
.container_message {
  display: flex;
  flex-direction: row;

  justify-content: space-around;
}

.sender span, .product span {
  font-weight: bold;
}
</style>