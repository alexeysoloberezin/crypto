// import { App } from "vue";
// import MockAdapter from "axios-mock-adapter";
//
//
//
// class MockService {
//   public static init(app: App<Element>) {
//     // this sets the mock adapter on the default instance
//     const mock = new MockAdapter(app.axios);
//
//     // mock login request
//     mock.onPost("apiUrl/login").reply((data) => {
//       const credential = JSON.parse(data.data);
//       const found = users.find((user) => {
//         return (
//           credential.login === user.login &&
//           credential.password === user.password
//         );
//       });
//       if (found) {
//         return [200, found];
//       }
//       return [404, { errors: ["The login detail is incorrect"] }];
//     });
//
//     // mock registration request
//     mock.onPost("apiUrl/registration").reply((data) => {
//       const newUser = JSON.parse(data.data);
//       if (
//         newUser.login &&
//         newUser.password
//       ) {
//         const found = users.find((user) => {
//           return newUser.login === user.login;
//         });
//         if (!found) {
//           newUser.token = Math.random().toString(36).substr(2, 9);
//           users.push(newUser);
//           return [200, newUser];
//         }
//         return [409, { errors: ["User with this login already exists."] }];
//       }
//       return [400, { errors: ["Please fill all needed fields to continue."] }];
//     });
//
//     // mock forgot password request
//     mock.onPost("/forgot_password").reply((data) => {
//       const { email } = JSON.parse(data.data);
//
//       if (email) {
//         const user = users.find(
//           (x) => x.login.toLowerCase() === email.toLowerCase()
//         );
//         if (user) {
//           return [200, user];
//         }
//         return [404, { errors: ["Users with this email is not found."] }];
//       }
//       return [400, { errors: ["Please fill all needed fields to continue."] }];
//     });
//   }
// }
//
// export default MockService;
