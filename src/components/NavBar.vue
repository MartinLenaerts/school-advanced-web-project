<template>
  <c-box id="navbar">
    <c-box class="container_link">
      <c-image :src="require('@/assets/icon.png')" id="logo"/>
    </c-box>
    <c-box class="container_link">
      <router-link to="/">Home</router-link>
    </c-box>
    <template v-if="getUser()">
      <template v-if="getUser().seller">
        <c-box class="container_link">
          <router-link to="/ads" class="text_after_icon">Mes annonces</router-link>
        </c-box>
      </template>
      <c-box class="container_link" id="None"></c-box>
      <c-box class="container_link">
        <c-icon name="message"/>
        <router-link to="/messages" class="text_after_icon">Messages</router-link>
      </c-box>
      <c-box class="container_link">
        <c-icon name="user"/>
        <router-link to="/profil" class="text_after_icon">Profil</router-link>
      </c-box>
      <c-box class="container_link">
        <c-icon name="logout" color="green.300"/>
        <c-pseudo-box as="button" @click="signOut" class="text_after_icon">Sign Out</c-pseudo-box>
      </c-box>
    </template>
    <template v-else>
      <c-box class="container_link" id="None"></c-box>
      <c-box class="container_link">
        <c-icon name="login" color="green.300"/>
        <router-link to="/sign-in" class="text_after_icon">Sign In</router-link>
      </c-box>
    </template>
  </c-box>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {CBox, CIcon, CImage, CPseudoBox, CText} from "@chakra-ui/vue";
import {User} from "@/constants";

@Component({
  components: {
    CBox, CImage, CIcon, CText, CPseudoBox
  }
})
export default class NavBar extends Vue {

  getUser(): User | null {
    console.log(this.$store.state);
    return this.$store.state.user;
  }

  async signOut(): Promise<void> {
    this.$store.commit("setUser", null)
    if (this.$route.path != "/") this.$router.push("/")
    this.$toast({
      title: 'Deconnexion',
      description: "Vous avez bien été déconnecté",
      status: 'success',
      duration: 10000
    })
  }

}
</script>

<style scoped>
.container_link {
  margin: 1rem;
  display: flex;
}

.container_link > * {
  margin: auto;
}

#logo {
  max-height: 50px;
}

#navbar {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  background: rgba(220, 220, 220, .5);
  margin-bottom: 1rem;
}

#None {
  flex-grow: 1;
}

.text_after_icon {
  margin-left: .5rem;
}

#button_menu {
  background: transparent;
}
</style>