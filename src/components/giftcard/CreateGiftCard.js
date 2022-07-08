import { Button, Form, Input, Select } from 'antd'
import React, { useState } from 'react'
import moment from 'moment'
import { useHistory, useLocation } from 'react-router-dom'
import PrivateLayout from '../../layout/PrivateLayout'
import '../../style/GiftCard.css'
import { API_GIFTCARD_STORE } from '../../config/endpointAPi'
import { postAxios } from '../../Http'
import { useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { GIFTCARD } from '../../config/path'
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

const CreateGiftCard = () => {
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

  const { data: trademark } = useTradeMarkQuery([limit, keyword, page])
  const trademark_list = trademark?.data
  console.log(trademark_list)
  const onCreateGiftCard = (value) => {
    value.created_at = moment().format('YYYY-MM-DD HH:mm:ss')

    postAxios(API_GIFTCARD_STORE, value)
      .then((res) => {
        if (res.status === 1) {
          queryClient.invalidateQueries(['giftcard'])
          toast.success(res?.message)
          setTimeout(() => {
            history.push(GIFTCARD)
          }, 1000)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <PrivateLayout>
      <div className="giftcard-create">
        <div className="giftcard-create__title">Create Gift Card</div>
        <Form onFinish={onCreateGiftCard} layout="vertical" className="giftcard-create__form">
          <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input name of Gift Card!' }]}>
            <Input placeholder="Name of Gift Card" />
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
            rules={[{ required: true, message: 'Please input the trademark!' }]}
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

export default CreateGiftCard
