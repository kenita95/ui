<template>
   <v-layout>
     <v-flex>
       <v-card>
         <v-card-title>
          CREATE PROJECT
         </v-card-title>
         <v-card-text>
           <v-layout row>
             <v-flex xs12 sm12 md6>
               <v-text-field label="ProjectTitle"></v-text-field>
             </v-flex>
             <v-flex xs12 sm12 md3>
               <v-select label="ProjectManager" :items="PMItems" item-text="text" item-value="value"></v-select>
             </v-flex>
               <v-flex xs12 sm12 md3>
               <v-select label="ProjectTeamLeader" :items="teamleaderItems" item-text="text" item-value="value"></v-select>
             </v-flex>
             <v-flex xs12 sm12 md12>
               <v-textarea label="Description" outlined></v-textarea>
               <v-file-input
    show-size
    counter
    multiple
    label="File input"
    outlined

    
  ></v-file-input>
             </v-flex>
                <v-flex xs12 sm12 md12>
            <v-layout row>
              <v-flex xs12 sm12 md12>
              <v-subheader>Project DeadLine </v-subheader>

              </v-flex>
              <v-flex xs12 sm12 md6>
               <p>
                 Start date
                 </p> 
          <v-date-picker
      v-model="date1"
      :show-current="false"
    >
    </v-date-picker>

              </v-flex>
              
    <v-flex xs12 sm12 md6>
      <p>
        End date
      </p>
    <v-date-picker
      v-model="date2"
      show-current="2013-07-13"
    ></v-date-picker>
 

    </v-flex>
              
            
            </v-layout>
             </v-flex>
      <v-flex xs12 sm12 md612> Any Bugs have  </v-flex>
               
          </v-layout>
            </v-card-text>
            <v-card-actions>
              <v-btn color="green">create</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
</template>

<script>
export default {
  data(){
    return{
      PMItems:[{text:"Pathum", value: 1},{text:"Chamara", value:2},{text:"Malith", value:3},{text:"Upsala",value:4},{text:"Hansi", value:5}],
      teamleaderItems:[{text:"T1-Nuwan",value:1},{text:"T2-Kumara",value:2},{text:"T3-Wimal",value:3}]
    }
  }
}
</script>
<script>
  export default {
    data () {
      return {
        date1: new Date().toISOString().substr(0, 10),
        date2: '2013-07-29',
      }
    },
  }
</script>