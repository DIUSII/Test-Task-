<template>
    <div class="modalWindowAddItem" :class="{'editHeight': error}">
        <h2 class="modalWindowAddItem__title">Добавление контакта</h2>
        <input type="text" 
            class="modalWindowAddItem__input modalWindowAddItem__name" 
            v-model="user.name" placeholder="Введите Имя и Фамилию" 
            maxlength="20"
        >
        <input 
            type="text" 
            class="modalWindowAddItem__input modalWindowAddItem__phone" 
            v-mask="'7 (###) ###-##-##'" 
            v-model="user.phone" 
            placeholder="Номер телефона"
        >
        <p class="modalWindowAddItem__error" v-show="error">Поля не должны быть пустыми</p>
        <form action="" class="modalWindowAddItem__form">
            <button class="modalWindowAddItem__button" @click="$emit('addItemInItems', addItemInItems())">Добавить</button>
        </form>
    </div>
</template>
<script>
export default {
    data(){
        return {
            user: {
                name: "",
                phone: "",
            },
            error: false,
        }
    },
    methods: {
        addItemInItems(){
            if(this.user.name === "" || this.user.phone === "" || this.user.phone.length != 17){
                this.error = true;
            } else {
                this.error = false;
            }
            return this.user
        }
    }
}
</script>
<style lang="scss">
    .editHeight{
        height: 175px !important;
    }
    .modalWindowAddItem{
        background-color: rgb(143, 125, 245);
        border: none;
        border-radius: 5px;
        max-width: 240px;
        padding: 10px 20px;
        height: 150px;
        font-family: Arial, Helvetica, sans-serif;
        &__title{
            margin-top: 0;
            color: #FFF;
            font-size: 20px;
        }
        &__input{
            display:block;
            width: 100%;
            margin-bottom: 15px;
            border: none;
            border-radius: 5px;
            padding: 5px 0 5px 15px;
            max-width: 225px;
            outline: none;
            color:rgb(73, 71, 71);
        }
        &__form{
            text-align: center;
        }
        &__button{
            color: rgb(143, 125, 245);
            border-radius: 5px;
            border: none;
            outline: none;
            padding: 5px 40px;
            background-color: #FFF;
        }
        &__error{
            text-align: center;
            color:#FFF;
            font-size: 12px;
        }
    }
</style>