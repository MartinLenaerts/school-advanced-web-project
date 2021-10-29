<template>
  <c-box>
    <c-heading text-align="center">Mes annonces</c-heading>
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
            <c-form-label>Nom :</c-form-label>
            <c-input v-model="newProduct.name"/>
          </c-form-control>

          <c-form-control class="container_field" is-required>
            <c-form-label>Description :</c-form-label>
            <c-textarea v-model="newProduct.description"/>
          </c-form-control>

          <c-form-control class="container_field" is-required>
            <c-form-label>Prix :</c-form-label>
            <c-number-input v-model="newProduct.price">
              <c-number-input-field/>
              <c-number-input-stepper>
                <c-numberIncrement-stepper/>
                <c-number-decrement-stepper/>
              </c-number-input-stepper>
            </c-number-input>
          </c-form-control>

          <c-form-control class="container_field" is-required>
            <c-form-label>Image :</c-form-label>
            <c-input v-model="newProduct.image_ref"/>
          </c-form-control>
        </c-alert-dialog-body>
        <c-alert-dialog-footer>
          <c-button ref="cancelRef" @click="closeDialog">
            Annuler
          </c-button>
          <c-button variantColor="green" @click="addAds" ml="3">
            Ajouter une nouvelle annonce
          </c-button>
        </c-alert-dialog-footer>
      </c-alert-dialog-content>
    </c-alert-dialog>
    <c-button @click="openDialog">
      Nouvelle annonce
    </c-button>
    <template v-for="product in products">
      <product-list-component :product="product" :key="product.id" class="product_element"/>
    </template>
  </c-box>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {Product, User} from "@/constants";
import {addDoc, collection, getDocs, getFirestore, query, where} from "firebase/firestore";
import {
  CAlert,
  CAlertDialog,
  CAlertDialogBody,
  CAlertDialogContent,
  CAlertDialogFooter,
  CAlertDialogHeader,
  CAlertDialogOverlay,
  CAlertIcon,
  CBox,
  CButton,
  CFormControl,
  CFormLabel,
  CHeading,
  CInput,
  CNumberDecrementStepper,
  CNumberIncrementStepper,
  CNumberInput,
  CNumberInputField,
  CNumberInputStepper,
  CTextarea
} from "@chakra-ui/vue";
import ProductListComponent from "@/components/Product/ProductListComponent.vue";
import ErrorComponent from "@/components/Error/ErrorComponent.vue";

@Component({
  components: {
    ErrorComponent,
    CBox,
    CHeading,
    CTextarea,
    CNumberInput,
    CNumberDecrementStepper,
    CNumberIncrementStepper,
    CNumberInputField,
    CNumberInputStepper,
    ProductListComponent,
    CButton,
    CAlertDialog,
    CAlertDialogOverlay,
    CAlertDialogFooter,
    CAlertDialogHeader,
    CAlertDialogBody,
    CAlertDialogContent,
    CAlertIcon,
    CAlert,
    CFormControl,
    CInput,
    CFormLabel
  }
})
export default class Ads extends Vue {
  products: Product[] = [];
  isOpen = false;
  newProduct: Product = {
    id: "",
    name: "",
    price: 0,
    seller: this.$store.state.user.uid,
    description: "",
    image_ref: "",
  }

  async mounted(): Promise<void> {
    const q = query(collection(getFirestore(), "products"), where("seller", "==", this.$store.state.user.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const product = doc.data();
      this.products.push({
        id: doc.id,
        name: product.name,
        price: product.price,
        seller: {} as User,
        description: product.description,
        image_ref: product.image_ref,
      })
    });
  }

  private closeDialog() {
    this.isOpen = false;
  }

  private openDialog() {
    this.isOpen = true;
  }

  private async addAds(): Promise<boolean> {
    if (this.newProduct.name == "") throw new Error("Veuillez entrer un nom pour cette annonce");
    if (this.newProduct.description == "") throw new Error("Veuillez entrer une description pour cette annonce");
    if (this.newProduct.price == 0) throw new Error("Veuillez entrer un prix pour cette annonce");
    if (this.newProduct.image_ref == "") throw new Error("Veuillez entrer une image pour cette annonce");
    await addDoc(collection(getFirestore(), "products"), this.newProduct);
    this.$toast({
      title: 'Nouvelle Annonce',
      description: "Votre annonce à bien été créée",
      status: 'success',
      duration: 10000
    })
    this.isOpen = false;
    this.$forceUpdate();
    return true;
  }
}
</script>

<style scoped>
.product_element {
  margin: 1rem 5rem 1rem 5rem;
}

.container_field {
  margin: 1rem;
}
</style>