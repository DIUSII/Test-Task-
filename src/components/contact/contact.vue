<template>
    <div class="body">
        <div class="contact">
            <div class="flex-container">
                <ul class="contact__items">
                    <!-- Отображение контактов -->
                    <li class="contact__item" v-for="(item,index) in items" :key="item.id">
                        <!-- Имя контакта -->
                        <div class="contact__name-box">
                            <span 
                            class="contact__name" 
                            @click="editName(index)" 
                            v-if='item.editBoolionName == true'
                            >{{item.name}}</span>
                            <!-- Инпут для изменения имени -->
                            <input 
                                v-focus 
                                class="contact__name contact__name_input" 
                                type="text" 
                                maxlength="20" 
                                @keyup.enter="closeEditName(index)" 
                                v-model="inputName" 
                                @value="item.name"
                                @blur="closeEditName(index)"
                                v-else
                            >
                            <span 
                                v-if="item.name.length === 0" 
                                class="contact__error-phone"
                            >Поле пустое</span>
                        </div>
                        <!-- Номер телефона -->
                        <div class="contact__box-phone">
                            <p 
                                @click="editPhone(index)"
                                class="contact__phone"
                                v-if="item.editBoolionPhone == true"
                            >{{item.phone}}</p>
                            <!-- Инпут для изменения телефона -->
                            <input 
                                v-focus 
                                type="text" 
                                class="contact__phone contact__phone_input"
                                @keyup.enter="closeEditPhone(index)" 
                                @blur="closeEditPhone(index)"
                                v-mask="'7 (###) ###-##-##'" 
                                v-model="inputPhone" 
                                @value="item.phone"
                                v-else
                            >
                            <span 
                                v-if="item.phone.length !== 17" 
                                class="contact__error-phone"
                            >Это не полный номер</span>
                        </div>
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
                editBoolionName: true,
                editBoolionPhone: true,
                inputName: "",
                inputPhone: "",
            }
        },
        directives:{
            focus:{
                inserted: function(el){
                    el.focus()
                }
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
            modalWindowAddItem(user) {// Добавляет элемент в items
                if(user.name === "" || user.phone === "" || user.phone.length != 17){
                    this.showModal = true;
                } else {
                    console.log(this.id);
                    this.id++;
                    this.showModal = false;
                    this.items.push({
                        id:this.id,
                        name: user.name,
                        phone: user.phone,
                        deleteMOdal: this.deleteMOdal,
                        editBoolionName: this.editBoolionName,
                        editBoolionPhone: this.editBoolionPhone,
                    });
                    if(user.name.length > 7){
                        this.editLenghtModalDeleteItem = true;
                    } else {
                        this.editLenghtModalDeleteItem = false;
                    }
                    console.log(this.id);
                }
                localStorage.id = JSON.stringify(this.id++);
                localStorage.items = JSON.stringify(this.items);
                user.name = ""; user.phone = "";
            },
            clickBackModal(){// Клик по замнению модального окна
                this.showModal = false;
            },
            editName(index){//редактирование имени контакта
                this.inputName = this.items[index].name;
                this.items[index].editBoolionName = false;
            },
            closeEditName(index){// внесение изменение имени в localestorage 
                if(this.items[index].name.length === 0){
                    this.items[index].editBoolionName = false;
                } else {
                    this.items[index].editBoolionName = true;
                }
                this.items[index].name = this.inputName;
                localStorage.items = JSON.stringify(this.items);

                if(this.items[index].name.length > 5){
                    this.editLenghtModalDeleteItem = true;
                } else {
                    this.editLenghtModalDeleteItem = false;
                }
            },
            editPhone(index){//редактирование телефона
                this.inputPhone = this.items[index].phone;
                this.items[index].editBoolionPhone = false;
            },
            closeEditPhone(index){ // изменяет телефон в localStorage
                if(this.inputPhone.length != 17){
                    this.items[index].editBoolionPhone = false;
                } else {
                    this.items[index].editBoolionPhone = true;
                }

                this.items[index].phone = this.inputPhone;
                localStorage.items = JSON.stringify(this.items);
            }

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
            max-width: 160px;
            &_input{
                color:rgb(73, 71, 71);
                border: none;
                outline: none;
                font-size: 16px;
                padding: 0;
            }
        }
        &__phone{
            margin: 0;
            margin-top: 10px;
            word-wrap: break-word;
            max-width: 130px;
            &_input{
                color:rgb(73, 71, 71);
                border: none;
                outline: none;
                font-size: 16px;
                padding: 0;
            }
        }
        &__error-phone{
            font-size: 12px;
            color: red;
            margin-left: 10px;
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
    .contact{ // Внешни  вид  Кнопки добавления
        &__button{
            width: 160px;
            border: 1px solid rgb(143, 125, 245);
            color: rgb(143, 125, 245);
            border-radius: 5px;
            background-color: #FFF;
            padding: 5px 0;
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