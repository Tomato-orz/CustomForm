export const allowDrop = (ev) => {
  ev.preventDefault();
}

export const drag = (ev) => {
  const status=Math.floor(Math.random()*9001+1000)
  ev.dataTransfer.setData("type", ev.target.getAttribute('type'));
  ev.dataTransfer.setData("title", ev.target.getAttribute('title'));
  ev.dataTransfer.setData("status", status);
  ev.dataTransfer.setData("id", ev.target.id);
}

export const drop = (ev,callback,state,setselect) => {
  ev.preventDefault();
  //如果是移动中间部分则直接返回
  const move=ev.dataTransfer.getData("move");
  if(move) return

  const type = ev.dataTransfer.getData("type");
  //用来选中
  const id=ev.dataTransfer.getData("id");
  const title=ev.dataTransfer.getData("title");
  const status=ev.dataTransfer.getData("status");
  const obj={
    label:title+status,
    required: true,
    type,
    name:title+status,
    optionlist:[
      {
        value:'1',
        name:'正确'
      },
      {
        value:'2',
        name:'错误'
      }
    ],
    setselect:()=>{
      setselect(obj)
    },
    id
  }

  callback([...state,obj])

}