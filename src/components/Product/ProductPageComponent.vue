<template>
  <c-box class="product_page_container" pl="5rem" pr="5rem">
    <c-heading class="name">{{ product.name }}</c-heading>
    <c-box class="product_container">
      <c-box class="image_container">
        <c-image class="image" :src="product.image_ref" :key="product.image_ref"/>
      </c-box>
      <c-box class="content_container">
        <template v-if="product.seller != null">
          <c-text class="seller">Vendu par : <span class="seller_name">{{ product.seller.firstname }} {{ product.seller.name }}</span></c-text>
        </template>
        <c-text class="description">{{ product.description }}</c-text>
        <c-badge class="price" variant-color="green">{{ product.price }} €</c-badge>
        <template v-if="getUser() && !getUser().seller">
          <c-alert-dialog
              :is-open="isOpen"
              :least-destructive-ref="$refs.cancelRef"
              :on-close="closeDialog"
          >
            <c-alert-dialog-overlay/>
            <c-alert-dialog-content>
              <c-alert-dialog-header font-size="lg" font-weight="bold">
                Nouvelle Annonce
              </c-alert-dialog-header>
              <c-alert-dialog-body>
                <error-component/>
                <c-form-control class="container_field" is-required>
                  <c-form-label>Votre message :</c-form-label>
                  <c-textarea v-model="message"/>
                </c-form-control>
              </c-alert-dialog-body>
              <c-alert-dialog-footer>
                <c-button ref="cancelRef" @click="closeDialog">
                  Annuler
                </c-button>
                <c-button variantColor="green" @click="buy" ml="3">
                  Envoyer le message
                </c-button>
              </c-alert-dialog-footer>
            </c-alert-dialog-content>
          </c-alert-dialog>
          <c-button @click="openDialog" width="min-content">
            Acheter
          </c-button>
        </template>
      </c-box>
    </c-box>
  </c-box>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {Product, User} from "@/constants";
import {CAlert, CAlertDialog, CAlertDialogBody, CAlertDialogContent, CAlertDialogFooter, CAlertDialogHeader, CAlertDialogOverlay, CAlertIcon, CBadge, CBox, CButton, CFormControl, CFormLabel, CHeading, CImage, CText, CTextarea} from "@chakra-ui/vue";
import {addDoc, collection, getFirestore} from "firebase/firestore";
import ErrorComponent from "@/components/Error/ErrorComponent.vue";

@Component({
  components: {
    ErrorComponent,
    CBox, CText, CImage, CHeading, CBadge, CButton,
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
export default class ProductPageComponent extends Vue {
  @Prop() private product!: Product;
  message = "";
  isOpen = false;

  getUser(): User | null {
    return this.$store.state.user;
  }

  private closeDialog() {
    this.isOpen = false;
  }

  private openDialog() {
    this.isOpen = true;
  }

  private async buy(): Promise<boolean> {
    if (this.message == "") throw new Error("Veuillez entrer un message");
    const db = getFirestore();
    await addDoc(collection(db, "messages"), {content: this.message, receiver: this.product?.seller.uid, sender: this.$store.state.user.uid, product: this.product?.id, isAnswered: false});
    this.$toast({
      title: 'Message envoyé',
      description: "Votre message à bien été envoyé",
      status: 'success',
      duration: 10000
    })
    this.isOpen = false;
    return true;
  }
}
</script>

<style scoped>
.product_container {
  display: flex;
  flex-direction: row;
}

.image_container {
  flex-grow: 1;
}

.image {
  width: 90%;
}


.seller_name {
  font-weight: bold;
}

.name {
  text-align: center;
  margin-bottom: 2rem;
}

.content_container {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex: 50%;
}

.price {
  font-size: 1rem;
  width: min-content;
  padding: 1rem;
}

.description {
  line-height: 2;
}
</style>