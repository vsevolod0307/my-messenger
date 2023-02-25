const { getAuth } = require("firebase/auth")

const authMixin = {
    data() {
        return {
            auth: getAuth()
        }
    }
}

export default authMixin.data();