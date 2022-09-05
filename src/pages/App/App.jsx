import { useState, useRef } from 'react'
import { Button, Row, Col, Card, Form, Space, Input, message } from 'antd'
import { FormRender, exportSFC } from '@/components'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import './App.css'
import Sfc from './sfc'
import { useNavigate, useLocation } from 'react-router-dom'
function App() {
  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  const [formlist, setformlist] = useState([])
  const [select, setselect] = useState('')
  const [selectmid, setselectmid] = useState('')
  const [ableSFC, setableSFC] = useState(false)
  const [sfc, setsfc] = useState('')
  const reset = () => {
    form1.resetFields()
    message.success('重置成功')
  }
  const add = () => {
    form1.validateFields().then(async val => {
      const obj = form1.getFieldsValue()
      obj.id = Math.random()
      obj.setselect = () => {
        setselectmid(obj.id)
      }
      const res = await getoptionlist()
      setformlist([...formlist, obj])
      form1.resetFields()
    })
  }
  const getoptionlist = async (keyword) => {

    return []
  }
  const addSFC = () => {
    if (!formlist[0]) message.success({
      content: '先点击添加按钮'
    })
    const str = exportSFC(formlist)
    setsfc(str)
  }
  const exportjson = () => {
    if (!formlist[0]) {
      message.error('先点击添加按钮')
      return
    }
    const json = JSON.stringify(formlist)
    const blob = new Blob([json])
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'setting.json'
    a.click()
  }
  const del = () => {
    const list = formlist.filter(i => i.id != selectmid)
    setformlist(list)
    setselectmid('')
  }
  const navigate = useNavigate()
  return (
    <div className="App">
      <Row >
        <Col span={8}>
          <Card>
            <FormRender
              uesform={form1}
              formlist={[
                {
                  label: '表单类型',
                  name: 'type',
                  required: true,
                  type: 'select',
                  onchange: setselect,
                  optionlist: [
                    {
                      value: 'input',
                      name: '输入框'
                    },
                    {
                      value: 'radio',
                      name: '单选'
                    },
                    {
                      value: 'select',
                      name: '下拉单选'
                    },
                    {
                      value: 'textarea',
                      name: '文本框'
                    },
                    {
                      value: 'time',
                      name: '时间'
                    },
                    {
                      value: 'date',
                      name: '日期'
                    },
                  ]
                },
                {
                  label: 'code值',
                  required: true,
                  type: 'input',
                  name: 'name'
                },
                {
                  label: '标签名',
                  type: 'input',
                  name: 'label'
                },
                {
                  label: '是否必填',
                  type: 'radio',
                  name: 'required',
                  hidden: true,
                  defaultVal: false,
                  optionlist: [
                    {
                      value: true,
                      name: '必填'
                    },
                    {
                      value: false,
                      name: '非必填'
                    }
                  ]
                },
                {
                  label: '默认值',
                  type: 'input',
                  name: 'defaultVal'
                },
                {
                  label: '选项接口',
                  type: 'input',
                  hidden: !['select', 'switch', 'radio'].includes(select),
                  name: 'port',
                },
                // {
                //   label: '选项',
                //   type: 'custom',
                //   render: () => (
                //     ['select', 'switch', 'radio'].includes(select) ? <Form.List
                //       initialValue={[{
                //         value: '',
                //         name: ''
                //       }]}
                //       key={'optionlist'}
                //       name="optionlist">
                //       {(fields, { add, remove }) => (
                //         <>
                //           {fields.map(({ key, name, ...restField }) => (
                //             <Space
                //               key={key}
                //               style={{
                //                 display: 'flex',
                //                 marginBottom: 8,
                //               }}
                //               align="baseline"
                //             >
                //               <Form.Item
                //                 label={'code'}
                //                 {...restField}
                //                 name={[name, 'value']}
                //                 rules={[
                //                   {
                //                     required: true,
                //                     message: '请输入选项值',
                //                   },
                //                 ]}
                //               >
                //                 <Input placeholder="选项值" />
                //               </Form.Item>
                //               <Form.Item
                //                 label={'name'}
                //                 {...restField}
                //                 name={[name, 'name']}
                //                 rules={[
                //                   {
                //                     required: true,
                //                     message: '请输入选项名',
                //                   },
                //                 ]}
                //               >
                //                 <Input placeholder="选项名" />
                //               </Form.Item>
                //               <MinusCircleOutlined onClick={() => remove(name)} />
                //             </Space>
                //           ))}
                //           <Form.Item>
                //             <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                //               新增选项
                //             </Button>
                //           </Form.Item>
                //         </>
                //       )}
                //     </Form.List> : ''
                //   )
                // }
              ]}
            />

            <Button
              onClick={del}
              type='primary'
              danger
              style={{
                width: '100%',
                marginBottom: 10
              }}
              disabled={!selectmid}
            >删除</Button>
            <Button
              style={{
                width: '100%',
                marginBottom: 10
              }}
              type='primary'
              onClick={reset}
            >
              重置
            </Button>
            <Button
              onClick={exportjson}
              type='primary'
              style={{
                width: '100%',
                marginBottom: 10
              }}
            >导出json</Button>
            <Button
              style={{
                width: '100%',
                marginBottom: 10
              }}
              type='primary'
              onClick={add}
            >
              添加
            </Button>
            {/* <Button
              style={{
                width: '100%',
              }}
              type='primary'
              onClick={addSFC}
            >
              导出SFC
            </Button> */}
            <Button
              style={{
                width: '100%',
                marginBottom: 10
              }}
              type='primary'
              onClick={() => navigate('/drag')}>
              拖拽配置
            </Button>
          </Card>
        </Col>
        <Col span={16}>
          <Card className={'form'}>
            <FormRender
              uesform={form}
              formlist={formlist}
            />
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default App
