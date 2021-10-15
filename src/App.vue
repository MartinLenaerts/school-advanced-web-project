<template>
  <Home />
</template>

<script>
import { Vue, Component } from "vue-property-decorator";
import Connection from "../../truffle/src/views/Connection.vue";
import Home from "@/views/Home";
@Component({
  components: {
    Home,
    Connection,
  },
  methods:{
    test:Function
  }
})
export default class App extends Vue {

}
</script>
