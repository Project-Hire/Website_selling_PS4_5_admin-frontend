import { Button, Form, Input, Select } from 'antd'
import React, { useState } from 'react'
import moment from 'moment'
import { useHistory, useLocation } from 'react-router-dom'
import PrivateLayout from '../../layout/PrivateLayout'
import '../../style/GameConsole.css'
import { API_CONSOLE_STORE } from '../../config/endpointAPi'
import { postAxios } from '../../Http'
import { useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { GAMECONSOLE } from '../../config/path'
import useTradeMarkQuery from '../../hooks/useTradeMarkQuery'
import QueryString from 'qs'
import { Option } from 'antd/lib/mentions'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const updateDefault = {
  previewVisible: false,
  previewImage: '',
  previewTitle: '',
  isFileValidFormat: true,
  fileList: [],
}

const CreateGameConsole = () => {
  const history = useHistory()
  const queryClient = useQueryClient()
  const location = useLocation()
  const id_trademark = location.pathname.split('/')[3]
  const searchUrl = QueryString.parse(location.search.substr(1))
  const [description, setDesCription] = useState('')
  const [limit] = useState(searchUrl?.limit || 10)
  const [keyword] = useState(searchUrl?.keyword || '')
  const [page] = useState(searchUrl?.page || 1)

  const { data: trademark } = useTradeMarkQuery([limit, keyword, page])
  const trademark_list = trademark?.data
  const onCreateGameConsole = (value) => {
    value.created_at = moment().format('YYYY-MM-DD HH:mm:ss')
    value.description = description

    postAxios(API_CONSOLE_STORE, value)
      .then((res) => {
        if (res.status === 1) {
          queryClient.invalidateQueries(['gameconsole'])
          toast.success(res?.message)
          setTimeout(() => {
            history.push(GAMECONSOLE)
          }, 1000)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <PrivateLayout>
      <div className="gameconsole-create">
        <div className="gameconsole-create__title">Create Game Console</div>
        <Form onFinish={onCreateGameConsole} layout="vertical" className="gameconsole-create__form">
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input name of Game Console!' }]}
          >
            <Input placeholder="Name of Game Console" />
          </Form.Item>
          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[{ required: true, message: 'Please input the number of product!' }]}
          >
            <Input placeholder="Number of product" />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: 'Please input the price of the product!' }]}
          >
            <Input placeholder="Price of product" />
          </Form.Item>
          <Form.Item
            label="Discount"
            name="discount"
            rules={[{ required: true, message: 'Please input the discount!' }]}
          >
            <Input placeholder="Discount of product" />
          </Form.Item>
          <Form.Item
            label="TradeMark"
            name="trademark_id"
            rules={[{ required: true, message: 'Please input the discount!' }]}
          >
            <Select placeholder="Please select trade mark">
              {trademark_list?.map((mark) => {
                return <Option value={mark?.id}>{mark?.name}</Option>
              })}
            </Select>
          </Form.Item>
          <Form.Item label="Image" name="image" rules={[{ required: true, message: 'Please input the image url!' }]}>
            <Input placeholder="Image URL" />
          </Form.Item>
          <Form.Item>
            <ReactQuill theme="snow" value={description} onChange={setDesCription} />
          </Form.Item>
          <Button htmlType="submit">Create</Button>
        </Form>
      </div>
    </PrivateLayout>
  )
}

export default CreateGameConsole
