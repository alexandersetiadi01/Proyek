const { useState } = require("react")

function User(){
    const [isLogin, setIsLogin] = useState(false);
    return(
        isLogin
    )
}