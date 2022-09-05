import React, { useState, useEffect } from 'react';
import { allowDrop, drag, drop } from '@/utils'
import { Button, Row, Col, Card, Form, Space, Input, message } from 'antd'
import { FormItem } from './component/FormItem.jsx'
import { FormRender, } from '@/components'
import { useNavigate } from 'react-router-dom'
import css from './index.module.less'
export const Drag = () => {
  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  const [formlist, setformlist] = useState([])
  const navigate = useNavigate()  
  const [select, setselect] = useState({})
  useEffect(() => {
    if (form1) {
      form1.resetFields()
      form1.setFieldsValue(select)
    }
  }, [select])
  const hchangeValue = () => {
    Object.assign(select, form1.getFieldsValue())
    setformlist([...formlist])
  }
  const del = () => {
    if(!select.id){
      message.success({
        content:'未选中组件'
      })
      return
    }
    const arr = formlist.filter(i => i.id != select.id)
    setformlist(arr)
  }
  return (
    <>
      <Row >
        <Col span={4}>
          <Card>
            <div
              style={{
                display: 'flex',
                border: '1px solid #f0f0f0',
                backgroundColor: '#f0f0f0',
                flexWrap: 'wrap'
              }}
            >
              <FormItem onDragStart={drag} title={'输入框'} id={'input' + Math.random()} type={'input'} />
              <FormItem onDragStart={drag} title={'文本框'} id={'textarea' + Math.random()} type={'textarea'} />
              <FormItem onDragStart={drag} title={'单选'} id={'radio' + Math.random()} type={'radio'} />
              <FormItem onDragStart={drag} title={'下拉单选'} id={'select' + Math.random()} type={'select'} />
              <FormItem onDragStart={drag} title={'时间'} id={'time' + Math.random()} type={'time'} />
              <FormItem onDragStart={drag} title={'日期'} id={'date' + Math.random()} type={'date'} />
            </div>
            <div
              style={{
                marginTop: '10px'
              }}
            >
              <Button className={css.btn} onClick={() => navigate('/')} type='primary'>
                前往选择配置
              </Button>
              <Button className={css.btn}
                type='primary'
                danger onClick={del}>
                删除
              </Button>
            </div>
          </Card>
        </Col>
        <Col span={16}>
          <Card>
            <div
              className={css.form}
              id={'drag'}
              onDrop={(e) => drop(e, setformlist, formlist, setselect)}
              onDragOver={allowDrop}
              style={{
                height: '100%'
              }}>
              <FormRender
                drag={{
                  draggable: true
                }}
                setformlist={setformlist}
                uesform={form}
                formlist={formlist}
              />
            </div>
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <FormRender
              onValuesChange={hchangeValue}
              uesform={form1}
              formlist={[
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
                  // hidden: true,
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
                  hidden: !['select', 'switch', 'radio'].includes(select?.type),
                  name: 'port',
                },

              ]}
            />
          </Card>
        </Col>
      </Row>


      {/* <div
        id={'text'}
        draggable="true"
        onDragStart={drag}

        onDrop={drop} onDragOver={allowDrop}
        style={{
          backgroundColor: 'skyblue',

        }}>1111</div>
      <div
        id={'text1'}
        draggable="true"
        onDrop={drop} onDragOver={allowDrop}

        onDragStart={drag}
        style={{
          backgroundColor: 'green',
          width: 200,

        }}>2222</div>

      <div
        id={'drag'}
        onDrop={drop} onDragOver={allowDrop}
        style={{
          // border: '1px solid #f0f0f0',
          border: '1px solid skyblue',
          height: 300,
          width: 500,
          padding: 10
        }}>
      </div> */}
    </>
  )
}