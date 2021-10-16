<template>
  <c-box id="navbar">
    <c-box class="container_link">
      <c-image :src="require('@/assets/icon.png')" id="logo"/>
    </c-box>
    <c-box class="container_link">
      <router-link to="/">Home</router-link>
    </c-box>
    <c-box class="container_link" id="None">
    </c-box>
    <c-box class="container_link">

      <c-icon name="login" color="green.300" />
      <router-link to="/sign-in" id="sign_in_link">Sign In</router-link>
    </c-box>
  </c-box>
</template>

<script>
import {Component, Vue} from "vue-property-decorator";
import {CBox,CImage,CIcon} from "@chakra-ui/vue";

@Component({
  components:{
    CBox,CImage,CIcon
  }
})
export default class NavBar extends Vue{}
</script>

<style scoped>
.container_link{
  margin:1rem;
  display: flex;
}
.container_link > *{
  margin: auto;
}

#logo{
  max-height: 50px;
}

#navbar{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  background: rgba(220,220,220,.5);
  margin-bottom: 1rem ;

}

#None{
  flex-grow:1 ;
}

#sign_in_link{
  margin-left: .5rem;
}
</style>