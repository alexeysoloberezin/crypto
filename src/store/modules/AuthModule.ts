import ApiService from "@//core/services/ApiService";
import JwtService from "@//core/services/JwtService";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";
import SpotifyToken from "@/core/services/SpotifyToken";
import { useRouter } from "vue-router";


export interface UserAuthInfo {
  error: string;
  isAuthenticated: boolean;
  userCreated: string;
}

@Module
export default class AuthModule extends VuexModule implements UserAuthInfo {
  error = "";
  userCreated = ""
  isAuthenticated = !!JwtService.getToken();
  /**
   * Get current user object
   * @returns User
   */
  get currentUser() {
    let user = localStorage.getItem("user");
    if (user) {
      console.log('get user')
      user = JSON.parse(user);
      return user;
    }
    return null;
  }

  get getError(): string {
    return this.error;
  }

  get getUserCreated(): string {
    return this.userCreated;
  }


  @Mutation
  [Mutations.SET_ERROR](error) {
    this.error = error;
  }

  @Mutation
  [Mutations.SET_USER_CREATED](login) {
    this.userCreated = login;
  }

  @Mutation
  [Mutations.SET_AUTH](user) {
    this.isAuthenticated = true;
    this.error = "";
    JwtService.saveToken(user.token);
    localStorage.setItem("user", JSON.stringify(user));
  }

  @Mutation
  [Mutations.SET_USER](user) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  @Mutation
  [Mutations.PURGE_AUTH]() {
    this.isAuthenticated = false;
    this.error = "";
    JwtService.destroyToken();
    localStorage.removeItem("user");
  }

  @Action
  [Actions.LOGIN](credentials) {
    return new Promise<void>((resolve, reject) => {
      ApiService.post(
          process.env.VUE_APP_ROUTEROOT + "/login",
        credentials
      )
        .then((res) => {
          this.context.commit(Mutations.SET_AUTH, res.data);
          resolve();
        })
        .catch(({ response }) => {
          this.context.commit(Mutations.SET_ERROR, response.data.errors[0]);
          reject();
        });
    });
  }

  @Action
  [Actions.LOGOUT]() {
    this.context.commit(Mutations.PURGE_AUTH);
  }

  @Action
  [Actions.REGISTER](credentials) {
    return new Promise<void>((resolve, reject) => {
      ApiService.post(
          process.env.VUE_APP_ROUTEROOT + "/registration",
        credentials
      )
        .then((res) => {
          this.context.commit(Mutations.SET_USER_CREATED, res.data.login)
          resolve();
        })
        .catch(({ response }) => {
          this.context.commit(Mutations.SET_ERROR, response.data.errors[0])
          reject();
        });
    });
  }

  @Action
  [Actions.FORGOT_PASSWORD](payload) {
    return new Promise<void>((resolve, reject) => {
      ApiService.post("forgot_password", payload)
        .then(({ data }) => {
          this.context.commit(Mutations.SET_AUTH, data);
          resolve();
        })
        .catch(({ response }) => {
          this.context.commit(Mutations.SET_ERROR, response.data.errors);
          reject();
        });
    });
  }
}
