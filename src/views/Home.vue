<template>
  <div class="resume-list-by-status">

    <div class="container-fluid">
        <div class="row">
            <div class="col-md-3">
              <p> Новые({{ newResume.length }}) </p>
                <draggable class="dragArea list-group w-full" :list="newResume" group="resume" @change="log">
                    <div
                        class="list-group-item bg-gray-300 m-1 p-3 rounded-md text-center"
                        v-for="element in newResume"
                        :key="element.name"
                    >
                        {{ element.name }}
                    </div>
                </draggable>
            </div>
            <div class="col-md-3">
              <p> Назначено собеседование({{ interviewScheduledResumeList.length }}) </p>
                <draggable class="dragArea list-group w-full" :list="interviewScheduledResumeList" group="resume" @change="log">
                    <div
                        class="list-group-item bg-gray-300 m-1 p-3 rounded-md text-center"
                        v-for="element in interviewScheduledResumeList"
                        :key="element.name"
                    >
                        {{ element.name }}
                    </div>
                </draggable>
            </div>
            <div class="col-md-3">
              <p> Принят({{ acceptedResumeList.length }}) </p>
                <draggable class="dragArea list-group w-full" :list="acceptedResumeList" group="resume" @change="log">
                    <div
                        class="list-group-item bg-gray-300 m-1 p-3 rounded-md text-center"
                        v-for="element in acceptedResumeList"
                        :key="element.name"
                    >
                        {{ element.name }}
                    </div>
                </draggable>
            </div>
            <div class="col-md-3">
              <p> Отказ({{ deniedResumeList.length }}) </p>
                <draggable class="dragArea list-group w-full" :list="deniedResumeList" group="resume" @change="log">
                    <div
                        class="list-group-item bg-gray-300 m-1 p-3 rounded-md text-center"
                        v-for="element in deniedResumeList"
                        :key="element.name"
                    >
                        {{ element.name }}
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
  export default defineComponent({
    components: {
      draggable: VueDraggableNext,
    },
    data() {
      return {
        enabledResumeList: true,
        newResume: [
          { name: 'John1', id: 1 },
          { name: 'Joao2', id: 2 },
          { name: 'Jean3', id: 3 },
          { name: 'Gerard4', id: 4 }
        ],
        interviewScheduledResumeList : [
          { name: 'John5', id: 5 },
          { name: 'Joao6', id: 6 },
          { name: 'Jean7', id: 7 },
          { name: 'Gerard8', id: 8 },
        ],
        acceptedResumeList : [
          { name: 'John9', id: 9 },
          { name: 'Joao10', id: 10 },
          { name: 'Jean11', id: 11 },
          { name: 'Gerard12', id: 12 },
        ],
        deniedResumeList : [
          { name: 'John13', id: 13 },
          { name: 'Joao14', id: 14 },
          { name: 'Jean15', id: 15 },
          { name: 'Gerard16', id: 16 },
        ],
        dragging: true,
      }
    },
    methods: {
      log(event) {
        console.log(event)

        if (event.added) {
          console.log('added!');
          console.log(`Change status from resume who have ${event.added.element.id}`);
        }
      },
    },
  })
</script>
