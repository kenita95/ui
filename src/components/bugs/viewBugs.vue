<template>
<v-layout>
  <v-flex>
    <v-card>
      <v-card-title>
    VIEW BUGS
      </v-card-title>
      <v-card-text>
  <v-data-table
    :headers="headers"
    :items="desserts"
    :items-per-page="5"
    class="elevation-1"
  ></v-data-table>

      </v-card-text>
    </v-card>
  </v-flex>
</v-layout>
</template>

<script>
  export default {
    data () {
      return {
        headers: [
          {
            text: 'Bug id',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Priority', value: 'priority' },
          { text: 'Assignfrom', value: 'Assign from' },
          { text: 'AssignTo', value: 'Assign To' },
          { text: 'Project', value: 'Project' },
          { text: 'status', value: 'status' },
          { text: 'version', value: 'version' },
          { text: 'DetectedDate', value: 'Detected date' },
        ],
        bugId: [
          {
            Priority: '',
            Assignfrom: 159,
           AssignTo : 6.0,
            Project: 24,
            status: 4.0,
            version: '',
            DetectedDate:'',
          },
          
         
          
         
          
          
        ],
      }
    },
  }
</script>