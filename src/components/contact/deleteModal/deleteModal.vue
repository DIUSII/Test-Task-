<template>
    <div class="deleteModal" :class="{editHeightDelete: editLenghtModalDeleteItem}">
        <p class="deleteModal__text" >Вы хотите удалить {{nameContact}} из контактов</p>
        <form  class="deleteModal__group">
            <button class="deleteModal__button deleteModal__button_yes" @click="$emit('clickButtonYes')">Да</button>
            <button class="deleteModal__button deleteModal__button_no" @click="$emit('clickButtonNo')">Нет</button>
        </form>
    </div>
</template>
<script>
export default {
    props: {
        'nameContact': String,
        'editLenghtModalDeleteItem': Boolean
    }
}
</script>
<style lang="scss">
    .editHeightDelete{
        height: 80px !important;
    }
    .deleteModal{
        background-color: rgb(143, 125, 245);
        width: 300px;
        height: 60px;
        border: none;
        border-radius: 5px;
        padding: 10px 20px;
        font-family: Arial, Helvetica, sans-serif;
        text-align: center;
        &__text{
            color: #fff;
            margin-top: 0px;
        }
        &__button{
            width: 80px;
            border: none;
            border-radius: 5px;
            padding: 5px 0;
            background-color: #FFF;
            outline: none;
            &_yes{
                color: red;
            }
            &_no{
                color:rgb(143, 125, 245);
                margin-left: 10px;
            }
        }
    }
</style>