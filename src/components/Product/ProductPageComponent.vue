<template>
  <c-box>
    <c-heading class="name">{{ product.name }}</c-heading>
    <c-box class="product_container">
      <c-box class="image_container">
        <c-image :src="product.image_ref"/>
      </c-box>
      <c-box class="content_container">
        <c-text class="seller" v-if="product.seller != null">Vendu par : <span class="seller_name">{{ product.seller.firstname }} {{ product.seller.name }}</span></c-text>
        <c-text class="description">{{ product.description }}</c-text>
        <c-badge class="price" variant-color="green">{{ product.price }} €</c-badge>
      </c-box>
    </c-box>
  </c-box>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {Product} from "@/constants";
import {CBadge, CBox, CHeading, CImage, CText} from "@chakra-ui/vue";

@Component({
  components: {CBox, CText, CImage, CHeading, CBadge}
})
export default class ProductPageComponent extends Vue {
  @Prop() private product: Product | undefined;
}
</script>

<style scoped>
.product_container {
  display: flex;
  flex-direction: row;
}

.image_container{
  width:50%;
}

.seller_name{
  font-weight: bold;
}

.name{
  text-align: center;
  margin-bottom: 2rem;
}

.content_container{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.price{
  font-size: 1rem;
  width: min-content;
  padding: 1rem;
}
</style>