<template>
    <div class="sign-in">
        <h1 class="sign-in__title">Вход</h1>
        <form action="" class="sign-in__form">
            <input type="text" class="sign-in__login sign-in__input" v-model="login">
            <input type="password" class="sign-in__password sign-in__input" v-model="password">
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
            user: []
        }
    },
    created(){
        axios
            .get('http://localhost:3000/user/1')
            .then(res => (this.user = res.data));
    },
    methods:{
        clickButton(){
            console.log(this.user.login);
            if(this.user.login == this.login && this.user.password == this.password){
                this.$router.push({path: './contact'});
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
        color: rgb(49, 49, 49);
        &__title{
            font-size: 30px;
        }
        &__form{ 
            text-align: center;
        }
        &__input{
            margin: 0 0 20px;
            display: block;
            max-width: 200px;
            width: 100%;
            border: 1px solid #ccc;
            padding: 5px 0 5px 10px;
            border-radius: 5px;
            outline: none;

        }
        &__button {
            border: 1px solid #ccc;
            background-color: #FFF;
            padding: 5px 20px;
            // color: rgb(49, 49, 49);
        }
    }

</style>