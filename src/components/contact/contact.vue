<template>
    <div class="body">
        <div class="contact">
            <div class="flex-container">
                <ul class="contact__items">
                    <!-- Отображение контактов -->
                    <li class="contact__item" v-for="(item,index) in items" :key="item.id">
                        <span class="contact__name">{{item.name}}</span>
                        <p class="contact__phone">{{item.phone}}</p>
                        <span class="contact__cross" @click="deleteItemOfItems(index)"></span>
                        <!-- Модальное окно удаление задачи -->
                        <modal-delete-item v-show="item.deleteMOdal"
                            class="contact__modal-delete-item"
                            @clickButtonNo="clickButtonNo(index)"
                            @clickButtonYes="clickButtonYes(index)"
                            :nameContact="items[index].name"
                            :editLenghtModalDeleteItem="editLenghtModalDeleteItem"
                        ></modal-delete-item>
                    </li>
                </ul>
                <!-- Добавление контакта -->
                <form action="" class='contact__form'>
                    <input type="search" class='contact__search'>
                    <button class="contact__button" @click="addItemInItems">Добавить контакт</button>
                </form>
            </div>
            <!-- Модальное окно добавление задачи -->
            <modal-add-item 
                class="contact__modal-add-item" 
                @addItemInItems='modalWindowAddItem($event)' 
                v-show="showModal" 
            ></modal-add-item> 
        </div>
        <!-- Затемнение модального окна  -->
        <div 
            class="contact__back-modal" 
            v-show="showModal" 
            @click="clickBackModal"
        ></div>
    </div>
</template>
<script >
    import modalWindowAddItem from './addItemModal/addItemModal'
    import modalDeleteItem from './deleteModal/deleteModal'
    export default {
        name: "contact",
        data(){
            return {
                items: JSON.parse(localStorage.items),
                id: JSON.parse(localStorage.id),
                name: '',
                phone: '',
                showModal: false,
                deleteMOdal: false,
                editLenghtModalDeleteItem: false,
            }
        },
        components: {
            'modal-add-item': modalWindowAddItem,
            'modal-delete-item': modalDeleteItem
        },
        methods: {
            addItemInItems(){// Делает видимое модальное окно
                this.showModal = true;
            },
            deleteItemOfItems(index) {// Вызов модального окна по удалению
                // this.items.splice(index, 1);
                this.items[index].deleteMOdal = true;
                localStorage.items = JSON.stringify(this.items);
            },
            clickButtonNo(index){// Отключает модальное окно удаление при нажатие на кнопу "Нет"
                this.items[index].deleteMOdal = false;
                localStorage.items = JSON.stringify(this.items);
            },
            clickButtonYes(index){// Удаление Контакта
                this.items.splice(index, 1);
                localStorage.items = JSON.stringify(this.items);
            },
            modalWindowAddItem(user) {// Добавляет элемент в items, после каждого клика обноваляет input'ы
                if(user.name === "" || user.phone === "" || user.phone.length != 17){
                    this.showModal = true;
                } else {
                    this.showModal = false;
                    this.items.push({
                        id:this.id,
                        name: user.name,
                        phone: user.phone,
                        deleteMOdal: this.deleteMOdal
                    });
                    if(user.name.length > 10){
                        this.editLenghtModalDeleteItem = true;
                    } else {
                        this.editLenghtModalDeleteItem = false;
                    }
                }
                localStorage.items = JSON.stringify(this.items);
                localStorage.id = this.id++; user.name = ""; user.phone = "";
            },
            clickBackModal(){// Клик по замнению модального окна
                this.showModal = false;
            },

        }
    }
</script>
<style lang='scss'>
    .flex-container{
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
    }
    .contact{ // внешний вид Контактов
        max-width: 600px;
        width: 100%;
        margin: 20px auto 0;
        font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
        // position: relative;
        &__items{
            list-style: none;
            margin:0;
            padding: 10px 10px 0;
            max-width: 400px;
            width: 100%;
            border: 1px solid rgb(143, 125, 245);
            margin-right: 15px;
            border-radius: 5px;
            min-height: 500px;
        }
        &__item{
            position: relative;
            border: 1px solid rgb(143, 125, 245);
            margin-bottom: 10px;
            padding: 5px 0 5px 15px;
            border-radius: 5px;
            color:rgb(73, 71, 71);
        }
        &__name{
            word-wrap: break-word;
            display: block;
            max-width: 250px;
        }
        &__phone{
            margin: 0;
            margin-top: 10px;
            word-wrap: break-word;
        }
        &__cross{
            position: absolute;
            background: url('./images/shapes-and-symbols.svg') no-repeat 50% 50%;
            background-size: 100%;
            width: 10px;
            height: 10px;
            margin: auto;
            top: 0;
            bottom: 0;
            right: 20px;

        }
    }
    .contact{
        &__button{
            width: 100%;
            border: 1px solid rgb(143, 125, 245);
            color: rgb(143, 125, 245);
            border-radius: 5px;
            background-color: #FFF;
            padding: 5px 0;
            margin-top: 10px;
            outline: none;
        }
    }
    .contact{ // Расположение модальных окон
        &__modal-add-item, &__modal-delete-item{
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            margin: auto;
            z-index: 1000;
        }
        &__back-modal{
            z-index: 800;
            width: 100%;
            height: 100%;
            position:absolute;
            background-color: rgb(73, 71, 71);
            opacity: 0.5;
            top: 0;
            left: 0;
        }   

    }
</style>