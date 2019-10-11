export default {
   data () {
       return {
           name: 'minix',
           minixName: 'minixObj',
           flag: false,
           obj: {
           	class: 'classtest',
           	id: 'idtest'
           }
       }
   },
   mounted() {
       console.log('minixMounted');
   },
   methods: {
       speak() {
           console.log('this is minix');
       },
       getData() {
           return '100';
       }
   }
}