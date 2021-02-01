<template>
  <div class="resume-list-by-status">

    <div class="container-fluid">
        <div class="row">
            <div class="col-md-3">
              <p> Новые({{ newResume.length }}) </p>
                <draggable class="dragArea list-group w-full" :list="newResume" group="resume" @change="statusChange($event, 1)">
                    <div
                        class="list-group-item bg-gray-300 m-1 p-3 rounded-md text-center"
                        v-for="element in newResume"
                        :key="element.name"
                    >    
                        <router-link :to="{ name: 'ChangingResume', params: { id: element.id }}">
                        <img :src=element.photoUrl width="189" height="255" alt="Ошибка загрузки фото"> <br>
                        <p> Профессия : {{ element.profession }} </p>
                        <p> ФИО: {{ element.name }} </p>
                        <p> Возраст: {{ element.age }}({{ element.birthDate }})</p>
                        </router-link>
                    </div>
                </draggable>
            </div>
            <div class="col-md-3">
              <p> Назначено собеседование({{ interviewScheduledResumeList.length }}) </p>
                <draggable class="dragArea list-group w-full" :list="interviewScheduledResumeList" group="resume" @change="statusChange($event, 2)">
                    <div
                        class="list-group-item bg-gray-300 m-1 p-3 rounded-md text-center"
                        v-for="element in interviewScheduledResumeList"
                        :key="element.name"
                    >
                        <router-link :to="{ name: 'ChangingResume', params: { id: element.id }}">
                        <img :src=element.photoUrl width="189" height="255" alt="Ошибка загрузки фото"> <br>
                        <p> Профессия : {{ element.profession }} </p>
                        <p> ФИО: {{ element.name }} </p>
                        <p> Возраст: {{ element.age }}({{ element.birthDate }})</p>
                        </router-link>
                    </div>
                </draggable>
            </div>
            <div class="col-md-3">
              <p> Принят({{ acceptedResumeList.length }}) </p>
                <draggable class="dragArea list-group w-full" :list="acceptedResumeList" group="resume" @change="statusChange($event, 3)">
                    <div
                        class="list-group-item bg-gray-300 m-1 p-3 rounded-md text-center"
                        v-for="element in acceptedResumeList"
                        :key="element.name"
                    >
                        <router-link :to="{ name: 'ChangingResume', params: { id: element.id }}">
                        <img :src=element.photoUrl width="189" height="255" alt="Ошибка загрузки фото"> <br>
                        <p> Профессия : {{ element.profession }} </p>
                        <p> ФИО: {{ element.name }} </p>
                        <p> Возраст: {{ element.age }}({{ element.birthDate }})</p>
                        </router-link>
                    </div>
                </draggable>
            </div>
            <div class="col-md-3">
              <p> Отказ({{ deniedResumeList.length }}) </p>
                <draggable class="dragArea list-group w-full" :list="deniedResumeList" group="resume" @change="statusChange($event, 4)">
                    <div
                        class="list-group-item bg-gray-300 m-1 p-3 rounded-md text-center"
                        v-for="element in deniedResumeList"
                        :key="element.name"
                    >   <router-link :to="{ name: 'ChangingResume', params: { id: element.id }}">
                        <img :src=element.photoUrl width="189" height="255" alt="Ошибка загрузки фото"> <br>
                        <p> Профессия : {{ element.profession }} </p>
                        <p> ФИО: {{ element.name }} </p>
                        <p> Возраст: {{ element.age }}({{ element.birthDate }})</p>
                        </router-link>
                    </div>
                </draggable>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
  import { defineComponent } from 'vue'
  import { VueDraggableNext } from 'vue-draggable-next'
  import axios from 'axios'
  export default defineComponent({
    components: {
      draggable: VueDraggableNext,
    },
    data() {
      return {
        enabledResumeList: true,
        newResume: [],
        interviewScheduledResumeList : [],
        acceptedResumeList : [],
        deniedResumeList : [],
        dragging: true,
      }
    },
    mounted: function () {
      console.log('rendered!');

      axios
      .get('http://127.0.0.1:8000/api/cv')
      .then(response => {
        console.log(response);

        for (let i = 0; i < response.data.resumeList.length; i++) { 

          switch(response.data.resumeList[i][0].resumeStatus) { // TODO: refact this code
            case 'new':
              this.newResume.push({
                id : response.data.resumeList[i][0].id,
                photoUrl: response.data.resumeList[i][0].imageURL,
                profession: response.data.resumeList[i][0].profession,
                name: response.data.resumeList[i][0].fullname,
                birthDate: response.data.resumeList[i][0].dateBirth.date,
                age: this.getAge(response.data.resumeList[i][0].dateBirth.date),
              });
              break;
            case 'interview scheduled':
              this.interviewScheduledResumeList.push({
                id : response.data.resumeList[i][0].id,
                photoUrl: response.data.resumeList[i][0].imageURL,
                profession: response.data.resumeList[i][0].profession,
                name: response.data.resumeList[i][0].fullname,
                birthDate: response.data.resumeList[i][0].dateBirth.date,
                age: this.getAge(response.data.resumeList[i][0].dateBirth.date),
              });
              break;
            case 'hired':
              this.acceptedResumeList.push({
                id : response.data.resumeList[i][0].id,
                photoUrl: response.data.resumeList[i][0].imageURL,
                profession: response.data.resumeList[i][0].profession,
                name: response.data.resumeList[i][0].fullname,
                birthDate: response.data.resumeList[i][0].dateBirth.date,
                age: this.getAge(response.data.resumeList[i][0].dateBirth.date),
              });
              break;
            case 'refused':
              this.deniedResumeList.push({
                id : response.data.resumeList[i][0].id,
                photoUrl: response.data.resumeList[i][0].imageURL,
                profession: response.data.resumeList[i][0].profession,
                name: response.data.resumeList[i][0].fullname,
                birthDate: response.data.resumeList[i][0].dateBirth.date,
                age: this.getAge(response.data.resumeList[i][0].dateBirth.date),
              });
              break;
          }
        }
      });
    },
    methods: {
      statusChange(event, param) {
        console.log(event);

        if (event.added) {
          console.log(`added to ${param}`);
          console.log('added!');
          console.log(`Change status from resume who have ${event.added.element.id}!`);

          let status = '';

          switch(param) {
            case 1:
              status = 'new';
              break;
            case 2:
              status = 'interview scheduled';
              break;
            case 3:
              status = 'hired';
              break;
            case 4:
              status = 'refused';
              break;
          }

          const json = JSON.stringify({
            new_status: status,
          });

          axios.post(`http://127.0.0.1:8000/api/cv/${event.added.element.id}/status/update`, json)
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              console.log(error);
            });

        }
      },
      getAge(dateString) 
      {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
        {
            age--;
        }
        return age;
      },
    },
  })
</script>
