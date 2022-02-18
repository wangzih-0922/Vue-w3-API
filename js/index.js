const app = {
    data() {
        return {
            url: "https://vue3-course-api.hexschool.io/v2",
            path: "chingno2004",
            user: {
                username: "",
                password: ""
            }

        }
    },
    methods: {
        login() {
            axios.post(`${this.url}/admin/signin`, this.user)
                .then((res) => {
                    console.log(res);
                    const { expired, token } = res.data;
                    document.cookie = `myCookie=${token}; expires= ${new Date(expired)};`
                    window.location = "product.html";

                })
                .catch((error) => {
                    console.log(error);
                    alert("登入失敗")
                })
        }


    },
}
Vue.createApp(app).mount("#app");