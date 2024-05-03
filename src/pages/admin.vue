<template>
    <q-page class="bg-grey-3 column">
    
  
  
   <div class="q-pa-md q-gutter-md">
      <q-list bordered separator class="bg-white rounded-borders">
        <q-item-label header>Current Waiting Queue</q-item-label>
  
        <q-item v-for="user in ActiveUsernames" :key="user.id" clickable v-ripple>
          <q-item-section avatar>
            <q-avatar>
              <img src="~assets/generic_avatar.png">
            </q-avatar>
          </q-item-section>
  
          <q-item-section>
            <q-item-label lines="1">{{ user.name }}</q-item-label>
            <q-item-label caption lines="2"> Reason</q-item-label>
          </q-item-section>
  
          <q-item-section middle>
            <DateDiff :date="new Date(user.timestamp)" />
          </q-item-section>
          <q-item-section right>
            
            <q-btn class="glossy" @click="checkIn(user.id)" rounded square style="background: #FF0080;" size="10px" label="Check In" />
          </q-item-section>
        </q-item>
  
      </q-list>
  </div>
  
    </q-page>
  </template>
  
  <script>
  import DateDiff from 'components/DateDiff.vue'
  import { date } from 'quasar'
  import db from 'boot/firebase'
  export default {
    components: {
      DateDiff
    },
   data() {
    return{
        username: '',
        usernames: [],
    }
  },
  methods: {
  async initialize()
  {
  await db.collection('waiting_details').orderBy("timestamp", "asc").onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
              if (change.type === 'added') {
              //ADD
          const source = change.doc.metadata.hasPendingWrites ? 'Local' : 'Server'
  
              if (source === 'Server') {
                  let user = change.doc.data();
                  user.id = change.doc.id;
                  this.usernames.push(user);
                }
          }
  
          if (change.type === 'modified') {
                //UPDATE
        const index = this.usernames.findIndex(item => item.id == change.doc.id)
                  let user = change.doc.data();
                  user.id = change.doc.id;
                      this.usernames.splice(index, 1, user)
              }
  
          if (change.type === 'removed') {
                //REMOVE
        const index = this.usernames.findIndex(item => item.id == change.doc.id)
        if (index >= 0) {
           this.usernames.splice(index, 1)
               }
      }
  
            })
          })
  },
  async checkIn(id) {
    db.collection('waiting_details').doc(id).update({ active: false });
  },
  computeTimeDiff(date1) {
    let date2 = Date.now()
     return date.getDateDiff(date2, date1, 'minutes')
    },
  },
  computed: {
    ActiveUsernames: function () {
        return this.usernames.filter(status => status.active == true)
    }
  },
  created() {
  this.initialize();
  },
  }
  </script>
  