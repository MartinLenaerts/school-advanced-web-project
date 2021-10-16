<template>
  <c-box>
    <nav-bar/>
    <router-view/>
  </c-box>
</template>

<script>
import {Component, Vue} from "vue-property-decorator";
import Home from "@/views/Home";
import NavBar from "@/components/NavBar";
import {CBox} from "@chakra-ui/vue";
@Component({
  components: {
    Home,NavBar,CBox
  }
})
export default class App extends Vue {

}
</script>