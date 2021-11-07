<template>
  <c-box>
    <c-heading ml="2rem">Mes Messages</c-heading>
    <c-divider m="4rem"/>
    <c-heading ml="2rem" size="lg">Messages recus</c-heading>
    <template v-for="message in receivedMessages">
      <message-component :key="message.id" :message="message" :is-sender="false"/>
    </template>
    <c-divider m="4rem"/>
    <c-heading ml="2rem" size="lg">Messages envoyés</c-heading>
    <template v-for="message in sendedMessages">
      <message-component :key="message.id" :message="message" :is-sender="true"/>
    </template>
  </c-box>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {collection, doc, getDoc, getDocs, getFirestore, query, where,QueryDocumentSnapshot} from "firebase/firestore";
import {Message, Product, User} from "@/constants";
import {CBox, CDivider, CHeading} from "@chakra-ui/vue";
import MessageComponent from "@/components/Messages/MessageComponent.vue";

@Component({
  components: {CBox, MessageComponent, CHeading, CDivider}
})
export default class Messages extends Vue {
  receivedMessages: Message[] = [];
  sendedMessages: Message[] = [];

  async created(): Promise<void> {
    const db = getFirestore();
    const q_receiver = query(collection(db, "messages"), where("receiver", "==", this.$store.state.user.uid));
    const querySnapshot_receiver = await getDocs(q_receiver);
    const q_sender = query(collection(db, "messages"), where("sender", "==", this.$store.state.user.uid));
    const querySnapshot_sender = await getDocs(q_sender);
    this.receivedMessages = await this.initMessages(querySnapshot_receiver.docs);
    this.sendedMessages = await this.initMessages(querySnapshot_sender.docs);
  }


  async initMessages(messages_docs : QueryDocumentSnapshot[]) : Promise<Message[]>{
    const messages : Message[] = [];
    const db = getFirestore();
    for (const document of messages_docs) {
      const message = document.data();
      const product = (await getDoc(doc(db, "products", message.product))).data() as Product
      const sender = (await getDoc(doc(db, "users", message.sender))).data() as User
      const receiver = (await getDoc(doc(db, "users", message.receiver))).data() as User
      sender.uid = message.sender;
      receiver.uid = message.receiver;
      product.id = message.product;
      messages.push({
        id: document.id,
        content: message.content,
        sender: sender,
        product: product,
        receiver: receiver,
        answeredTo: message.answeredTo,
        isAnswered: message.isAnswered
      })
    }
    return messages;
  }
}
</script>

<style scoped>

</style>