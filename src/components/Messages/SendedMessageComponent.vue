<template>
  <c-box class="container_message" shadow="md" p="1rem" m="1rem">
    <c-box>
      <c-text class="sender">Message envoyé à : <span>{{ message.receiver.firstname }} {{ message.receiver.name }}</span></c-text>
      <c-text class="product">Produit concerné : <span>{{ message.product.name }}</span></c-text>
    </c-box>
    <c-box>
      <c-text class="label_content">Contenu du message :</c-text>
      <c-text class="content">{{ message.content }}</c-text>
    </c-box>
  </c-box>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {Message} from "@/constants";
import {CBox, CButton, CText} from "@chakra-ui/vue";

@Component({
  components: {
    CBox, CText, CButton
  }
})
export default class SendedMessageComponent extends Vue {
  @Prop() private message!: Message;
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