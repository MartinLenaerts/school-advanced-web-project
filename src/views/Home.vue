<template>
  <c-box p="1">
    <c-heading text-align="center">Welcome to Golden Truffles</c-heading>
    <c-box p="2rem">
      <c-text>
        Golden Truffles est une plateforme de consommation collaborative qui met en relation des particuliers souhaitant vendre ou acheter des truffes.
        Notre modèle économique repose sur la gratuité de notre service pour les particuliers, et la localisation géographique de l'offre et la demande.
      </c-text>
    </c-box>
    <c-divider/>
    <c-heading ml="2rem">Nouvelles annonces</c-heading>
    <c-box p="1rem" m="1rem">
      <template v-for="product in products">
        <product-list-component :product="product" :key="product.id" class="product_element"/>
      </template>
    </c-box>
  </c-box>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {CBox, CButton, CDivider, CHeading, CLink, CText} from "@chakra-ui/vue";
import {Product, User} from "@/constants";
import ProductListComponent from "@/components/Product/ProductListComponent.vue";
import {collection, doc, getDoc, getDocs, getFirestore} from "firebase/firestore";

@Component(
    {
      components: {
        CBox, CText, CHeading, CButton, CLink, ProductListComponent, CDivider
      }
    })
export default class Home extends Vue {
  products: Product[] = [];

  async created(): Promise<void> {
    const collectionSnap = await getDocs(collection(getFirestore(), "products"));

    for (const document of collectionSnap.docs) {
      const product = document.data();
      const docSnap = await getDoc(doc(getFirestore(), "users", product.seller));
      const seller: User = docSnap.exists() ? docSnap.data() as User : {} as User;
      seller.uid = docSnap.id;
      this.products.push({
        id: document.id,
        name: product.name,
        price: product.price,
        seller: seller,
        description: product.description,
        image_ref: product.image_ref,
      })
    }
  }
}
</script>

<style scoped>
.product_element {
  margin: 1rem 5rem 1rem 5rem;
}
</style>