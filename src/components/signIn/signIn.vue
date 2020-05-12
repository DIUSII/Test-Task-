<template>
    <div class="sign-in">
        <h1 class="sign-in__title">Вход</h1>
        <form action="" class="sign-in__form">
            <input type="text" class="sign-in__login sign-in__input" v-model="login">
            <input type="password" class="sign-in__password sign-in__input" v-model="password">
            <span v-show="errorNull" class="sign-in__error">Поля не могут быть пустыми</span>
            <span v-show="errorWarning" class="sign-in__error">Не правильный пароль или логин</span>
            <button class="sign-in__button" @click="clickButton">Вход</button>
        </form>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    // name:"sign-in",
    data(){
        return {
            login: '',
            password: '',
            user: [],
            errorNull: false,
            errorWarning: false,
        }
    },
    created(){
        axios
            .get('http://localhost:3000/user/1')
            .then(res => (this.user = res.data));
    },
    methods:{
        clickButton(){
            if(this.user.login == this.login && this.user.password == this.password){
                this.$router.push({path: './contact'});
                localStorage.signin = 'signin';
                localStorage.items = '[]';
                localStorage.id = '0';
            } else if(this.login === "" && this.password === ""){
                this.errorNull = true;
                this.errorWarning = false;
            } else {
                this.errorWarning = true;
                this.errorNull = false;
            }
        }
    }
}
</script>
<style lang="scss">
    .sign-in{
        font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
        max-width: 200px;
        margin: 0 auto;
        color: rgb(73, 71, 71);
        &__title{
            font-size: 30px;
        }
        &__form{ 
            text-align: center;
        }
        &__input{
            margin: 0 0 20px;
            display: block;
            max-width: 188px;
            width: 100%;
            border: 1px solid rgb(143, 125, 245);
            padding: 5px 0 5px 10px;
            border-radius: 5px;
            outline: none;
            color: rgb(73, 71, 71);

        }
        &__button {
            border: 1px solid rgb(143, 125, 245);
            background-color: #FFF;
            padding: 5px 20px;
            outline: none;
            color: rgb(73, 71, 71);
            border-radius: 5px;
        }
        &__error{
            display: block;
            margin-bottom: 20px;
            font-size: 12px;
            color: red;
        }
    }

</style>