let productModal = "";
let delProductModal = "";

const app = {
    data() {
        return {
            url: "https://vue3-course-api.hexschool.io/v2",
            path: "chingno2004",
            products: {},
            isNew: false,
            tempProduct: {
                imagesUrl: [],
            },
        }
    },
    methods: {
        checkAdmin() {
            axios.post(`${this.url}/api/user/check`)
                .then((res) => {
                    this.getProducts();
                })
                .catch((error) => {
                    alert("登入驗證失敗");
                    window.location = index.html;
                })
        },
        getProducts() {
            axios.get(`${this.url}/api/${this.path}/admin/products`)
                .then((res) => {
                    console.log(res);
                    this.products = res.data.products;
                })
                .catch((error) => {
                    console.log(error);
                })
        },
        openModal(status, item) {
            if (status == 'add') {
                this.tempProduct = {
                    imagesUrl: []
                };
                this.isNew = true;
                productModal.show();
            } else if (status === "edit") {
                this.tempProduct = { ...item };
                this.isNew = false;
                productModal.show();
            } else if (status === 'delete') {
                this.tempProduct = { ...item };
                delProductModal.show();
            }

        },
        updateProduct() {
            let api = `${this.url}/api/${this.path}/admin/product`;
            let httpMethod = 'post'
            if (!this.isNew) {
                api = `${this.url}/api/${this.path}/admin/product/${this.tempProduct.id}`;
                httpMethod = 'put';
            }
            axios[httpMethod](api, { data: this.tempProduct })
                .then((res) => {
                    this.getProducts();
                })
                .catch((error) => {
                    console.log(error);
                })
            productModal.hide();
        },
        deleteProduct() {
            delProductModal.hide();
            axios.delete(`${this.url}/api/${this.path}/admin/product/${this.tempProduct.id}`)
                .then((res) => {
                    this.getProducts();
                    alert("此產品已成功刪除");
                })
                .catch((error) => {
                    console.log(error);
                })
        },

    },
    mounted() {
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)myCookie\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        axios.defaults.headers.common['Authorization'] = token;
        this.checkAdmin();
        productModal = new bootstrap.Modal(document.querySelector("#productModal"), { Keyboard: false });
        delProductModal = new bootstrap.Modal(document.querySelector("#delProductModal"), { Keyboard: false });
    }
}
Vue.createApp(app).mount("#app");







