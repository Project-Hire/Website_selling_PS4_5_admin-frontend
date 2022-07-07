import { Button, Form, Input, Select } from 'antd'
import React, { useState } from 'react'
import moment from 'moment'
import { useHistory, useLocation } from 'react-router-dom'
import PrivateLayout from '../../layout/PrivateLayout'
import '../../style/Advertisement.css'
import { API_CDGAME_STORE } from '../../config/endpointAPi'
import { postAxios } from '../../Http'
import { useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { CDGAME } from '../../config/path'
import { API_UPLOAD, UPLOAD_PRESET } from '../../config/const'
import axios from 'axios'
import useCDGameCreate from '../../hooks/useCDGameCreate'
import useCDGameDetailQuery from '../../hooks/useCDGameDetailQuery'
import useTradeMarkQuery from '../../hooks/useTradeMarkQuery'
import QueryString from 'qs'
import { Option } from 'antd/lib/mentions'

const updateDefault = {
  previewVisible: false,
  previewImage: '',
  previewTitle: '',
  isFileValidFormat: true,
  fileList: [],
}

const CreateCDGame = () => {
  const history = useHistory()
  const queryClient = useQueryClient()
  const location = useLocation()
  const id_trademark = location.pathname.split('/')[3]
  console.log(location.pathname)
  const searchUrl = QueryString.parse(location.search.substr(1))

  console.log(id_trademark)
  const [limit] = useState(searchUrl?.limit || 10)
  const [keyword] = useState(searchUrl?.keyword || '')
  const [page] = useState(searchUrl?.page || 1)

  const { data: trademark} = useTradeMarkQuery([limit, keyword, page])
  console.log(trademark?.data)
  const trademark_list = trademark?.data
  const onCreateCDGame = (value) => {
    value.created_at = moment().format('YYYY-MM-DD HH:mm:ss')

    postAxios(API_CDGAME_STORE, value)
      .then((res) => {
        if (res.status === 1) {
          queryClient.invalidateQueries(['cdgame'])
          toast.success(res?.message)
          setTimeout(() => {
            history.push(CDGAME)
          }, 1000)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <PrivateLayout>
      <div className="cdgame-create">
        <div className="cdgame-create__title">Create CD_Game</div>
        <Form onFinish={onCreateCDGame} layout="vertical" className="cdgame-create__form">
          <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input name of CD_Games!' }]}>
            <Input placeholder="Name of CD_Games" />
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

          <Button htmlType="submit">Create</Button>
        </Form>
      </div>
    </PrivateLayout>
  )
}

export default CreateCDGame
