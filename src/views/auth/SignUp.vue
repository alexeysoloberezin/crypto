<template>
  <div class="form-auth" >
    <h3>Sign-up</h3>
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
    <it-button type="success" :disabled="btnLoad" :loading="btnLoad" block @click.prevent="send">Sign-up</it-button>
    <router-link
        class="form-forgot"
        to="/forgot_password"
    >Forgot password ?</router-link>
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

export default {
  name: "Register",
  setup() {
    const store = useStore()
    const router = useRouter()

    const btnLoad = ref(false)

    const form = reactive({
      login: '',
      password: '',
    })

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
          store.dispatch(Actions.REGISTER, {
            login: form.login,
            password: form.password,
          }).then(() => {
            createToast(`Account ${store.getters.getUserCreated} was created`,
                {
                  position: 'bottom-left',
                  type: 'success',
                  transition: 'bounce',
                  showIcon: 'true',
                })
            btnLoad.value = false
            router.push({path: "sign-in"})
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
      rules,
      v$
    }
  }

}
</script>

<style scoped>

</style>