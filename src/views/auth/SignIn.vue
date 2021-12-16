<template>
  <div class="form-auth" >
    <h3>Sign-in</h3>
    <p class="all-users" @click="defaultModal = true">View all users</p>
    <it-divider />
    <span v-if="v$.login.$error" class="input-error">
      {{ v$.login.$errors[0].$message }}
    </span>
    <it-input  v-model="form.login" placeholder="Your login" />
    <span v-if="v$.password.$error" class="input-error">
      {{ v$.password.$errors[0].$message }}
    </span>
    <it-input  v-model="form.password" placeholder="Password" type="password"/>
    <it-divider />
    <it-button type="success" :disabled="btnLoad" :loading="btnLoad" block @click.prevent="send">Sign-in</it-button>
    <router-link
        class="form-forgot"
        to="/forgot_password"
    >Forgot password ?</router-link>


    <it-modal v-model="defaultModal">
      <h1 style="font-size: 20px">All users</h1>
      <it-divider />
      <ul class="users">
        <li v-for="user in fakeUsers" :key="user.login">
          <div class="d-flex aic">
            <it-avatar color="#131313" class="ava"/>
            <div>
              <h3>Login: {{ user.login }}</h3>
              <h3>Password: {{ user.password }}</h3>
            </div>
          </div>
          <it-divider />
        </li>
      </ul>
    </it-modal>
  </div>
</template>

<script>
import { ref,reactive } from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {Actions} from "../../store/enums/StoreEnums";
import { createToast } from 'mosha-vue-toastify';
import useVuelidate from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'
import { users } from "../../store/modules/AuthModule"

export default {
  name: "Sing-in",
  setup() {
    const store = useStore()
    const router = useRouter()

    const defaultModal = ref(false)
    const btnLoad = ref(false)
    const form = reactive({
      login: '',
      password: '',
    })

    const fakeUsers = ref(users)

    const rules = {
      login: { required, minLength: minLength(4) }, // Matches state.firstName
      password: { required, minLength: minLength(4) }, // Matches state.lastName
    }
    const v$ = useVuelidate(rules, form)

    const send = () => {
      v$.value.$validate()

      if (!v$.value.$error) {
        btnLoad.value = true

        setTimeout(() => {
          store.dispatch(Actions.LOGIN, {
            login: form.login,
            password: form.password,
          }).then(() => {
            createToast(`Welcome ${store.getters.currentUser.login}`,
                {
                  position: 'bottom-left',
                  type: 'success',
                  transition: 'bounce',
                  showIcon: 'true',
                })
            btnLoad.value = false
            router.push({ path: "/" })
          }).catch(() => {
            createToast(store.getters.getError,
                {
                  position: 'bottom-left',
                  type: 'danger',
                  transition: 'bounce',
                  showIcon: 'true',
                })
            btnLoad.value = false
          })
        }, 700)
      }
    }

    return {
      form,
      btnLoad,
      send,
      fakeUsers,
      rules,
      v$,
      defaultModal
    }
  }

}
</script>

<style scoped>
.users{
  flex-direction: column;
  display: flex;
}
.ava{
  margin-right: 15px;
}
.all-users{
  text-align: center;
  margin: 10px 0;
  cursor: pointer;
  font-size: 15px;
  text-decoration: underline;
}
</style>