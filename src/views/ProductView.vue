<template>
  <product-page-component :product="product"/>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import ProductPageComponent from "@/components/Product/ProductPageComponent.vue";
import {doc, getDoc, getFirestore} from "firebase/firestore";
import {User} from "@/constants";

@Component({
  components: {ProductPageComponent}
})
export default class ProductView extends Vue {
  @Prop() private id!: string;
  private product = {
    id: "",
    name: "",
    price: 0,
    seller: {} as User,
    description: "",
    image_ref: "",
  }

  async created(): Promise<void> {
    const db = getFirestore();
    const docSnap = await getDoc(doc(db, "products", this.id));
    if (docSnap.exists()) {
      const product = docSnap.data();
      const docRef = doc(db, "users", product.seller);
      const docUser = await getDoc(docRef);
      const seller = docUser.data() as User;
      seller.uid = docUser.id;
      this.product = {
        id: docSnap.id,
        name: product.name,
        price: product.price,
        seller: seller,
        description: product.description,
        image_ref: product.image_ref,
      }
    }
  }
}
</script>

<style scoped>

</style>