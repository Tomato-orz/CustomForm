import { Form, Input, Select, Radio, TimePicker, DatePicker } from 'antd'
const { TextArea } = Input
export const FormRender = (props) => {
  const { formlist, uesform, onValuesChange = () => { }, drag = {},setformlist } = props
  //拖拽
  const { draggable = false } = drag
  const onDragOver = e => {
    e.preventDefault();
  }
  let onDragStart = () => { }
  let onDrop = () => { }
  if (draggable) {
    onDragStart = (e, obj) => {
      const json=JSON.stringify(obj)
      e.dataTransfer.setData("obj", json);
      e.dataTransfer.setData("move", true);
    }
    onDrop = (e, obj) => {
      e.preventDefault()
      const obj1 = JSON.parse(e.dataTransfer.getData("obj"));
      const obj2 = obj
      const idx1=formlist.findIndex(i=>i.id==obj1.id)
      const idx2=formlist.findIndex(i=>i.id==obj2.id)
      formlist[idx1]=obj2
      formlist[idx2]=obj1
      setformlist([...formlist])
    }
  }
  const creatFormItem = (Itemobj, idx) => {
    const { label, name, required = false, defaultVal, type, setselect = () => { }, hidden = false, id } = Itemobj
    if (type == 'custom') {
      return FormItemContent(Itemobj)
    }
    return (
      <Form.Item
        {...{
          draggable,
          onDragOver,
          onDragStart: (e) => onDragStart(e, Itemobj),
          onDrop: e => onDrop(e, Itemobj)
        }}
        hidden={hidden}
        onClick={(e) => {
          const domlist = document.querySelectorAll('.select')
          domlist.forEach(i => i.classList.remove('select'))
          e.currentTarget.classList.add('select')
          setselect()
        }}
        key={idx}
        label={label}
        name={name}
        initialValue={defaultVal}
        rules={[
          {
            required,
            message: `请输入`+label,
          },
        ]}
      >
        {FormItemContent(Itemobj)}
      </Form.Item>
    )
  }
  const FormItemContent = ({ type, optionlist = [], render = () => '', onchange = () => { }, }) => {
    let node = null
    switch (type) {
      case 'input': {
        node = <Input />
        break
      }
      case 'textarea': {
        node = <TextArea />
        break
      }
      case 'time': {
        node = (
          <TimePicker style={{
            width: '100%'
          }} />)
        break
      }
      case 'date': {
        node = (
          <DatePicker style={{
            width: '100%'
          }} />)
        break
      }
      case 'radio': {
        node = (
          <Radio.Group
          >
            {optionlist.map(({ value, name }, index) =>
              <Radio
                value={value}
                key={index}
              >
                {name}
              </Radio>
            )}
          </Radio.Group>
        )
        break
      }
      case 'select': {
        const { Option } = Select
        node = (
          <Select
            onChange={onchange}
          >
            {
              optionlist.map((item, idx) => (
                <Option
                  key={idx}
                  value={item.value}  {...item}>
                  {item.name}
                </Option>
              )
              )
            }
          </Select>
        )
        break
      }
      case 'custom': {
        node = render()
        break
      }

    }
    return node
  }



  return (
    <Form
      onValuesChange={onValuesChange}
      form={uesform}
      name="basic"
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 18,
      }}
      initialValues={{
        remember: true,
      }}
      labelAlign='left'
      autoComplete="off"
    >
      {formlist.map(creatFormItem)}
    </Form>
  )
}

