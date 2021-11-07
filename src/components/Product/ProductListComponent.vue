<template>
  <c-box class="product_container" shadow="md" @click="()=>{this.$router.push('/product/'+product.id+'')}">
    <c-box class="image_container">
      <c-image :src="product.image_ref"/>
    </c-box>
    <c-box class="content_container">
      <c-heading class="name">{{ product.name }}</c-heading>
      <c-text class="seller" v-if="product.seller">Vendu par : <span class="seller_name">{{ product.seller.firstname }} {{ product.seller.name }}</span></c-text>
      <c-text class="description">{{ product.description }}</c-text>
      <c-badge class="price" variant-color="green">{{ product.price }} €</c-badge>
    </c-box>
  </c-box>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {Product} from "@/constants";
import {CBadge, CBox, CHeading, CImage, CText} from "@chakra-ui/vue";

@Component({
  components: {CBox, CText, CHeading, CImage, CBadge}
})
export default class ProductListComponent extends Vue {
  @Prop() private product!: Product;

}
</script>

<style scoped>
.product_container {
  display: flex;
  flex-direction: row;
  cursor: pointer;
}

.product_container:hover {
  background: rgb(240, 240, 240);
}

.image_container {
  width: 200px;
  flex: 0 0 auto;
  align-self: center;
  padding: 1rem;
}

.content_container {
  display: flex;
  flex-direction: column;
}

.description {
  margin: 1rem 0 1rem 0;
  color: dimgrey;
}

.price {
  width: min-content;
  padding: 0 1rem 0 1rem;
  margin-bottom: 1rem;
}

.seller_name {
  font-weight: bold;
}

</style>