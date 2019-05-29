var vm = new Vue({
  el: '#app',
  data: {
    newTodo: '',
    visibility: 'all',
    cacheTodo: {},
    cacheTitle: '',
    taskNum: 0,
    taskNow: '',
    todos:[{
      id: '123',
      title: '第一筆',
      completed: false,
  }]
  },
  methods: {
    addTodo(){
      var value = this.newTodo.trim();
      var createId = Math.floor(Date.now());
      //沒有輸入input就return
      if(!value){
        return
      }
      this.todos.push({
        id: createId,
        title: value,
        completed: false
      })
      //清空input value
      this.newTodo = "";
    },
    removeTodo(todo) {
      var vm = this;
      //findIndex找到第一個符合
      var nowIndex=vm.todos.findIndex(item=>{
        return item.id === todo.id;
      });
      this.todos.splice(nowIndex, 1)
    },
    removeAll() {
      this.todos=[];
    },
    //雙擊切換input
    editTodo(item) {
      this.cacheTodo=item;
      this.cacheTitle=item.title;
      // console.log(item)
    },
    cancleEdit() {
      this.cacheTodo= {};
    },
    saveEdit(item) {
      item.title= this.cacheTitle;
      this.cacheTitle= '';
      this.cacheTodo= {};
    }
  },
  computed: {
    //製作頁籤分類的功能
    filterTodo(){
      if(this.visibility=='all'){
        this.taskNum=this.todos.length;
        this.taskNow = "全部清單";
        return this.todos
        //進行中
      }else if(this.visibility=='active'){
        var newTodos=[];
        this.taskNow = "進行中";
        this.todos.forEach(item=>{
          if(!item.completed){
            newTodos.push(item)
            this.taskNum=newTodos.length;
          }
        });
        return newTodos
        //已完成
      }else if(this.visibility=='complete'){
        var newTodos=[];
        this.taskNow = "已完成";
        this.todos.forEach(item=>{
          if(item.completed){
            newTodos.push(item)
            this.taskNum=newTodos.length;
          }
        });
        return newTodos
      }
    }
  }
})