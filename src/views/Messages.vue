<template>
  <c-box>
    <c-heading ml="2rem">Mes Messages</c-heading>
    <c-divider m="4rem"/>
    <c-heading ml="2rem" size="lg">Messages recus</c-heading>
    <template v-for="message in received_messages">
      <received-message-component :key="message.id" :message="message"/>
    </template>
    <c-divider m="4rem"/>
    <c-heading ml="2rem" size="lg">Messages envoyés</c-heading>
    <template v-for="message in sended_messages">
      <sended-message-component :key="message.id" :message="message"/>
    </template>
  </c-box>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {collection, doc, getDoc, getDocs, getFirestore, query, where} from "firebase/firestore";
import {Message, Product, User} from "@/constants";
import {CBox, CDivider, CHeading} from "@chakra-ui/vue";
import SendedMessageComponent from "@/components/Messages/SendedMessageComponent.vue";
import ReceivedMessageComponent from "@/components/Messages/ReceivedMessageComponent.vue";

@Component({
  components: {CBox, SendedMessageComponent, ReceivedMessageComponent, CHeading, CDivider}
})
export default class Messages extends Vue {
  received_messages: Message[] = [];
  sended_messages: Message[] = [];

  async created(): Promise<void> {
    const db = getFirestore();
    const q_receiver = query(collection(db, "messages"), where("receiver", "==", this.$store.state.user.uid));
    const querySnapshot_receiver = await getDocs(q_receiver);
    for (const document of querySnapshot_receiver.docs) {
      const message = document.data();
      const docProduct = await getDoc(doc(db, "products", message.product))
      const docUser = await getDoc(doc(db, "users", message.sender))
      const product = docProduct.data() as Product;
      const user = docUser.data() as User;
      product.id = docProduct.id;
      user.uid = docUser.id;
      this.received_messages.push({
        id: document.id,
        content: message.content,
        sender: user,
        product: product,
        receiver: this.$store.state.user,
        answeredTo: message.answeredTo,
        isAnswered: message.isAnswered
      })
    }

    const q_sender = query(collection(db, "messages"), where("sender", "==", this.$store.state.user.uid));
    const querySnapshot_sender = await getDocs(q_sender);
    for (const document of querySnapshot_sender.docs) {
      const message = document.data();
      const docProduct = await getDoc(doc(db, "products", message.product))
      const docUser = await getDoc(doc(db, "users", message.receiver))
      const product = docProduct.data() as Product;
      const user = docUser.data() as User;
      product.id = docProduct.id;
      user.uid = docUser.id;
      this.sended_messages.push({
        id: document.id,
        content: message.content,
        sender: this.$store.state.user,
        product: product,
        receiver: user,
        answeredTo: message.answeredTo,
        isAnswered: message.isAnswered
      })
    }
  }
}
</script>

<style scoped>

</style>