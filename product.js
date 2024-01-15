import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.4.11/vue.esm-browser.min.js";

const app = createApp({
  data() {
    return {
      api: {
        url: "https://ec-course-api.hexschool.io/v2",
        path: "ttedd",
      },
      products: [],
      productDetail: {},
    };
  },
  methods: {
    checkProduct(product) {
      this.productDetail = { ...product };
    },
    checkLogin() {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)tedToken\s*\=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      axios.defaults.headers.common["Authorization"] = token;
      axios
        .post(`${this.api.url}/api/user/check`)
        .then((res) => {})
        .catch((err) => {
          window.alert("驗證錯誤，請重新登入");
          window.location = "login.html";
        });
    },
    productList() {
      axios
        .get(`${this.api.url}/api/${this.api.path}/products/all`)
        .then((res) => {
          this.products.push(...res.data.products);
        });
    },
  },
  mounted() {
    this.checkLogin();
    this.productList();
  },
});

app.mount("#app");
