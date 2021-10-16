<template>
    <router-view />
</template>

<script>
import { Vue, Component } from "vue-property-decorator";
import Home from "@/views/Home";
@Component({
  components: {
    Home
  },
  methods:{
    test:Function
  }
})
export default class App extends Vue {

}
</script>
