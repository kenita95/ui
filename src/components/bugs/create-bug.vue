<template>
    <v-layout>
   <v-flex xs12 sm12 md12>
     <v-layout row>
       <v-flex xs12 sm12 md6>
               <v-select label="Bug prority" :items="prorityItem" item-text="text" item-value="value"></v-select>

       </v-flex>
       <v-flex xs12 sm12 md6>
               <v-select label="Assigned by" :items="assigendBy" item-text="text" item-value="value"></v-select>

       </v-flex>
       <v-flex xs12 sm12 md6>
               <v-select label="Severity" :items="items" item-text="text" item-value="text"></v-select>

       </v-flex>
        <v-flex xs12 sm12 md6>
               <v-select label="Assigned To" :items="assigendBy" item-text="text" item-value="value"></v-select>

       </v-flex>
       <v-flex xs12 sm12 md6>
               <v-select label="Environment" :items="envs" item-text="text" item-value="text"></v-select>

       </v-flex>
       <v-flex xs12 sm12 md6>
               <v-select label="Labels" :items="assigendBy" item-text="text" item-value="value"></v-select>

       </v-flex>
     <v-flex xs12 sm12 md6>
               <v-select label="Project" :items="assigendBy" item-text="text" item-value="value"></v-select>

       </v-flex>
       <v-flex xs12 sm12 md6>
               <v-select label="Resolution" :items="resolutions" item-text="text" item-value="value"></v-select>

       </v-flex>

     </v-layout>
         <v-text-field
            label="Version"
            placeholder="Text hear"
          ></v-text-field>
           <v-text-field
                label="Estimation Time"
               placeholder="Text hear"
          > </v-text-field>
     
        
 
        
     
        
      
        
       
       
       
         
       

 <v-textarea
      background-color="amber lighten-4"
      color="orange orange-darken-4"
      label="Text here"
    ></v-textarea>
    
<v-textarea
      background-color="grey lighten-2"
      color="cyan"
      label="Comment here"
    ></v-textarea>
    

 
  <v-row justify="center">
    <v-date-picker v-model="picker" full-width></v-date-picker>
  </v-row>
  


<v-file-input
    show-size
    counter
    multiple
    label="File input"

    
  ></v-file-input>

  <v-file-input
    :rules="rules"
    accept="image/png, image/jpeg, image/bmp"
    placeholder="Pick an avatar"
    prepend-icon="mdi-camera"
    label="Avatar"
  ></v-file-input>
  <v-btn
      rounded
      color="primary"
      dark
    >
     Create
    </v-btn>
      <v-btn
      rounded
      color="red"
      dark
    >
     Reset 
    </v-btn>
         
   </v-flex>
   </v-layout>
</template>

<script>
  export default {
    data: () => ({
      items: [
        { text: 'S1' },
        { text: 'S2' },
        { text: 'S3' },
        { text: 'S4' },
      ],
      prorityItem:[
        { text: 'High',value:"High" },
        { text: 'Medium',value:"Medium" },
        { text: 'Low',value:"low" },
        
      ],
      assigendBy:[],
       envs:[
        { text: 'Production',value:"Production" },
        { text: 'Staging',value:"Staging" },
        { text: 'QA',value:"QA" },
        
      ],
       resolutions:[
          { text: 'R1',value:"r1" },
        { text: 'R2',value:"r2" },
        { text: 'R3',value:"r3" },
        
      ],
    }),
  }
</script>

