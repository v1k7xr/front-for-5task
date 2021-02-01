<template>
  <div class="container-i">
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-3">
            </div>
            <div class="col-md-6">
                    <select v-model="vModelStatus">
                    <option value=1>Новый</option>
                    <option value=2>Назначено собеседование</option>
                    <option value=3>Принят</option>
                    <option value=4>Отказ</option>
                    </select>

                    <input class="form-control" type="text" v-model="vModelProfession" placeholder="профессия">
                    

                    <input type="form-control" placeholder="Город" v-model="vModelCity" list="cities" />

                    <datalist id="cities">
                        <option v-for="item in cities" :key="item" :value="item" />
                    </datalist>

                    <input class="form-control" type="text" v-model="vModelPhotoURL" placeholder="Ссылка на картинку">
                    <input class="form-control" type="text" v-model="vModelFullname" placeholder="ФИО">
                    <input class="form-control" type="text" v-model="vModelPhone" placeholder="Телефон">
                    <input class="form-control" type="email" v-model="vModelEmail" placeholder="Email">
                    <input class="form-control" type="text" v-model="vModelBirthdayData" placeholder="Дата рождения">
                    
                    <select v-model="selected" @change="emitChange">
                    <option disabled value="">Уровень образования</option>
                    <option value=1 >Среднее</option>
                    <option value=2>Среднее специальное</option>
                    <option value=3>Неоконченное высшее</option>
                    <option value=4>Высшее</option>
                    </select>

                    <div v-show="isVisible">

                    <div class="education-institution">
                        <hr size='3px'>
                        <div class="form-row-loop" v-for="(educationdata, index) in vModelEducationList" :key="index">
                        <div class="form-group">
                            <input list="eductList" placeholder="Учебное заведени" v-model="educationdata.educInstit"  />

                            <datalist id="eductList">
                            <option v-for="item in eductList" :key="item" :value="item" />
                            </datalist>
                        </div>
                        <div class="form-group">
                            <label>Факультет</label>
                            <input v-model="educationdata.faculty" :name="`vModelEducationList[${index}][faculty]`" type="text" class="form-control" placeholder="Факультет">
                        </div>
                        <div class="form-group">
                            <label>Специализация</label>
                            <input v-model="educationdata.specialization" :name="`vModelEducationList[${index}][specialization]`" type="text" class="form-control" placeholder="Специализация">
                        </div>
                        <div class="form-group">
                            <label>Год окончания</label>
                            <input v-model="educationdata.endingYear" :name="`vModelEducationList[${index}][endingYear]`" type="text" class="form-control" placeholder="Год окончания">
                        </div>
                        <button type="button" class="btn btn-default btn-sm" @click="deleteItem(index)">
                            <span class="glyphicon glyphicon-remove"></span> Удалить
                        </button>
                        </div>
                        <br>
                    </div>
                    <div class="form-group">
                        <button @click="addEducationalInstitution" type="button" class="btn btn-secondary">Добавить образование</button>
                    </div>
                    </div>

                    <input class="form-control" type="text" v-model="vModelSalary" placeholder="Зарплата">
                    <input class="form-control" type="text" v-model="vModelKeySkils" placeholder="Скилы">
                    <label for="form-control">О себе</label>
                    <textarea class="form-control" v-model="vModelAbout" id="textareaid" rows="5"></textarea>
                    <div id="button">
                    <button v-on:click="editResume">Принять изменения</button>
                    </div>

            </div>
            <div class="col-md-3">
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { api_key } from '../store/tokens';
import axios from 'axios';
export default {
  name: 'InputComponent',
  props: {

  },
  data: function () {
    return {

      resume_id: this.$route.params.id,
      vModelProfession: '',
      vModelCity: '',
      vModelPhotoURL: '',
      vModelFullname: '',
      vModelPhone: '',
      vModelEmail: '',
      vModelBirthdayData: '',
      vModelEducation: '',
      vModelEducationList: [],
      vModelSalary: '',
      vModelKeySkils: '',
      vModelAbout: '',
      vModelStatus: '',
      cities: [],
      eductList: [],
      cityName: '',
      id : 0,
      listEducationalInstitution : '',
      faculty : '',
      specialization : '',
      endingYear : '',
      selected: '',
      isVisible : false,
      regEmail : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
      regPhone : /^[\d]{6,10}$/,
    }
  },
  methods: {
    editResume: function (event) {
      if(!this.checkCorrectEmail()) {
        alert('Incorrect email');
        return;
      }
      if (!this.checkCorrectPhone()) {
        alert('Incorrect phone');
        return;
      }
      console.log(api_key);

      var education_type = '';
      var resume_status = '';

      console.log(this.selected);

      console.log(this.vModelStatus);
      switch(+this.selected) {
        case 1:
            education_type = 'secondary education';
            break;
        case 2:
            education_type = 'secondary special education';
            break;
        case 3:
            education_type = 'incomplete higher education';
            break;
        case 4:
            education_type = 'higher education';
            break;
      }

      switch(+this.vModelStatus) {
        case 1:
            resume_status = 'new';
            break;
        case 2:
            resume_status = 'interview scheduled';
            break;
        case 3:
            resume_status = 'hired';
            break;
        case 4:
            resume_status = 'refused';
            break;
        default:
            resume_status = 'ad';
            break;
      }

      var json = JSON.stringify({
          id: this.resume_id,
          status: resume_status,
          profession: this.vModelProfession,
          city: this.vModelCity,
          photoURL: this.vModelPhotoURL,
          name: this.vModelFullname,
          phoneNumber: this.vModelPhone,
          email: this.vModelEmail,
          birthday: this.vModelBirthdayData,
          educationType: education_type,
          educationList: this.vModelEducationList,
          salary: this.vModelSalary,
          skills: this.vModelKeySkils,
          about: this.vModelAbout,
      });

    

        axios.post(`http://127.0.0.1:8000/api/cv/${this.resume_id}/edit`, json)
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });

      console.log(json);

    },
    checkCorrectEmail : function() {
      if (!this.vModelEmail) {
        return false;
      } else if (!this.regEmail.test(this.vModelEmail)) {
        return false;
      }
      return true;
    },
    checkCorrectPhone: function() {
      if (this.vModelPhone == null || this.vModelPhone == '') {
        return false;
      } else if(!this.regPhone.test(this.vModelPhone)) {
        return false;
      }
      return true;
    },
    emitChange(e) {
      if (this.selected == 1) {
        this.isVisible = false;
        this.vModelEducationList = [];
      } else {
        this.isVisible = true;
      }
    },
    addEducationalInstitution() {
      if (this.vModelCity != this.cityName) {
        this.cityName = this.vModelCity;
        this.eductList = [];
        var value = this.vModelCity;
        // var urlGet = `https://api.vk.com/method/database.getUniversities?country_id=1&need_all=0&count=100&v=5.59&q=${value}&access_token=${api_key}`;
        // axios
        // .get(urlGet)
        // .then(response => {
        //   for (let i = 0; i < response.data.response.items.length; i++) {
        //     this.eductList.push(response.data.response.items[i]['title']);
        //   }
        // })
      }
      
      this.vModelEducationList.push({
        educInstit: '',
        faculty: '',
        specialization: '',
        endingYear: '',
      })
      console.log(this.vModelEducationList);
    },
    deleteItem(index) {
      this.vModelEducationList.splice(index, 1);
    },
    init() {
      console.log(this.resume_id);
      
      axios.get(`http://127.0.0.1:8000/api/cv/${this.resume_id}`)
      .then((response) => {
        console.log(response);

        this.vModelFullname = response.data.resume.fullname;
        this.vModelCity = response.data.resume.city;
        this.vModelPhotoURL = response.data.resume.imageURL;
        this.vModelPhone = response.data.resume.phoneNumber;
        this.vModelEmail = response.data.resume.email;
        this.vModelBirthdayData = response.data.resume.dateBirth.date.split(' ')[0];
        this.vModelProfession = response.data.resume.profession;
        this.vModelAbout = response.data.resume.about;
        this.vModelKeySkils = response.data.resume.skills;
        this.vModelSalary = response.data.resume.salary;

        switch(response.data.resume.educationType) {
            case 'secondary education':
                this.selected = 1;
                break;
            case 'secondary special education':
                this.selected = 2;
                this.isVisible = true;
                break;
            case 'incomplete higher education':
                this.selected = 3;
                this.isVisible = true;
                break;
            case 'higher education':
                this.isVisible = true;
                this.selected = 4;
                break;
        }

        switch(response.data.resume.resumeStatus) {
            case 'new':
                this.vModelStatus = 1;
                break;
            case 'interview scheduled':
                this.vModelStatus = 2;
                break;
            case 'hired':
                this.vModelStatus = 3;
                break;
            case 'refused':
                this.vModelStatus = 4;
                break;
        }

        response.data.resume.educationList.forEach(element => {
            this.vModelEducationList.push({
                faculty: element.faculty,
                specialization: element.specialization,
                endingYear: element.year_ending || element.endingYear,
                educInstit: element.educational_institution || element.educInstit,
            })
        });

        
        
      })
      .catch((error) => {
        console.log(error);
      });

    }
  },
  watch: {
    vModelCity(value) { // while tests 
    //   this.cities = [];
    //   var urlGet = `https://api.vk.com/method/database.getCities?country_id=1&need_all=0&count=10&v=5.59&q=${value}&access_token=${api_key}`;
    //   axios
    //   .get(urlGet)
    //   .then(response => {
    //     let tempStrAddress = '';
    //     for (let i = 0; i < response.data.response.items.length; i++) {
    //       tempStrAddress = response.data.response.items[i]['title'];
    //       if (response.data.response.items[i]['area'] != null)
    //         tempStrAddress += ' ' + response.data.response.items[i]['area'];
    //       if (response.data.response.items[i]['region'] != null)
    //         tempStrAddress += ' ' + response.data.response.items[i]['region'];
    //       this.cities.push(tempStrAddress);
    //     }
    //   })
    }
  },
  mounted() {
    this.init();
  },
}
</script>

<style>
.form-row-loop {
    border: 4px double black; /* Параметры границы */
    background: rgb(8, 202, 228); /* Цвет фона */
    padding: 10px; /* Поля вокруг текста */
   }
</style>