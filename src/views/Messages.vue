<template>
  <c-box>
    <c-heading ml="2rem">Mes Messages</c-heading>
    <c-divider m="4rem"/>
    <c-heading ml="2rem" size="lg">Messages recus</c-heading>
    <template v-for="message in received_messages">
      <received-message-component :key="message.id" :message="message"/>
    </template>
    <c-divider m="4rem" />
    <c-heading ml="2rem" size="lg">Messages envoyés</c-heading>
    <template v-for="message in sended_messages">
      <sended-message-component :key="message.id" :message="message"/>
    </template>
  </c-box>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {collection, doc, getDoc, getDocs, getFirestore, query, where} from "firebase/firestore";
import {Message} from "@/constants";
import {CBox, CHeading,CDivider} from "@chakra-ui/vue";
import SendedMessageComponent from "@/components/Messages/SendedMessageComponent.vue";
import ReceivedMessageComponent from "@/components/Messages/ReceivedMessageComponent.vue";

@Component({
  components: {CBox, SendedMessageComponent, ReceivedMessageComponent, CHeading,CDivider}
})
export default class Messages extends Vue {
  private received_messages: Message[] = [];
  private sended_messages: Message[] = [];

  async created(): Promise<void> {
    const db = getFirestore();
    const q_receiver = query(collection(db, "messages"), where("receiver", "==", this.$session.get("user").uid));
    const querySnapshot_receiver = await getDocs(q_receiver);
    querySnapshot_receiver.forEach(async (document) => {
      const message = document.data();
      const docProduct = await getDoc(doc(db, "products", message.product))
      const docUser = await getDoc(doc(db, "users", message.sender))
      const product = docProduct.data();
      const user = docUser.data();
      product.id = docProduct.id;
      user.uid = docUser.id;
      this.received_messages.push({
        id: document.id,
        content: message.content,
        sender: user,
        product: product,
        receiver: this.$session.get("user"),
        answeredTo: message.answeredTo
      })
    });

    const q_sender = query(collection(db, "messages"), where("sender", "==", this.$session.get("user").uid));
    const querySnapshot_sender = await getDocs(q_sender);
    querySnapshot_sender.forEach(async (document) => {
      const message = document.data();
      const docProduct = await getDoc(doc(db, "products", message.product))
      const docUser = await getDoc(doc(db, "users", message.sender))
      const product = docProduct.data();
      const user = docUser.data();
      product.id = docProduct.id;
      user.uid = docUser.id;
      this.sended_messages.push({
        id: document.id,
        content: message.content,
        sender: user,
        product: product,
        receiver: this.$session.get("user")
      })
    });
  }
}
</script>

<style scoped>

</style>