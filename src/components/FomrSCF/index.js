const FormItemContent = ({ type, optionlist = [], render = () => '', onchange = () => { } }) => {
  let node = null
  switch (type) {
    case 'input': {
      node = '<Input />'
      break
    }
    case 'textarea': {
      node = '<TextArea />'
      break
    }
    case 'time': {
      node = ("<TimePicker style={{width: '100%'}} />")
      break
    }
    case 'date': {
      node = ("<DatePicker style={{width: '100%'}} />")
      break
    }
    case 'radio': {
      node = (
        `<Radio.Group >
          {optionlist.map(({ value, name }, index) =>
            <Radio
              value={value}
              key={index}
            >
              {name}
            </Radio>
          )}
        </Radio.Group>`
      )
      break
    }
    case 'select': {
      const { Option } = Select
      node = (
        `<Select
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
        </Select>`
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
const s=''
s.replace(/<>\/\\/,'')
const fn = (formlist) => {
  const str2 = formlist.map((i, idx) => {
    const { label, name, required = false, defaultVal, type, setselect = () => { } } = i
    return `
  <Form.Item
   key='${idx}'
   label='${label}'
   name='${name}'
   initialValue=${defaultVal}
   rules={[
     {
       required:${required},
       message: 请输入${label}
     },
   ]}
  >
    ${FormItemContent(i)}
  </Form.Item>
  `
  })

  return `<Form
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
  ${str2.join()}
</Form>`
}
export default fn