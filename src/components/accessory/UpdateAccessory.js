import { Button, Form, Input, Select } from 'antd'
import { Option } from 'antd/lib/mentions'
import moment from 'moment'
import React, { useEffect } from 'react'
import { useQueryClient } from 'react-query'
import { useHistory, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ACCESSORY } from '../../config/path'
import useAccessoryDetailQuery from '../../hooks/useAccessoryDetailQuery'
import useAccessoryUpdate from '../../hooks/useAccessoryUpdate'
import useTradeMarkQuery from '../../hooks/useTradeMarkQuery'
import QueryString from 'qs'
import PrivateLayout from '../../layout/PrivateLayout'
import { useState } from 'react'

const UpdateAccessory = () => {
  const [form] = Form.useForm()
  const history = useHistory()
  const location = useLocation()
  const id_accessory = location.pathname.split('/')[3]
  const queryClient = useQueryClient()
  const { data: accessory } = useAccessoryDetailQuery(id_accessory)
  const updateAccessory = useAccessoryUpdate()
  const searchUrl = QueryString.parse(location.search.substr(1))
  const [limit] = useState(searchUrl?.limit || 10)
  const [keyword] = useState(searchUrl?.keyword || '')
  const [page] = useState(searchUrl?.page || 1)
  const { data: trademark } = useTradeMarkQuery([limit, keyword, page])
  console.log(trademark)
  const trademark_list = trademark?.data

  useEffect(() => {
    form.setFieldsValue({
      name: accessory?.name,
      quantity: accessory?.quantity,
      discount: accessory?.discount,
      price: accessory?.price,
      image: accessory?.image,
      trademark_id: accessory?.trademark_id,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessory])

  const onUpdateAccessory = (value) => {
    value.updated_at = moment().format('YYYY-MM-DD HH:mm:ss')
    value.id = Number(id_accessory)

    updateAccessory.mutate(value, {
      onSuccess: (data) => {
        if (data.status === 1) {
          queryClient.invalidateQueries(['accessory', 'accessory_detail'])
          toast.success(data?.message)
          setTimeout(() => {
            history.push(ACCESSORY)
          }, 1000)
        }
      },
      onError: (error) => {
        toast.success(error?.message)
      },
    })
  }

  return (
    <PrivateLayout>
      <div className="accessory-create">
        <div className="accessory-create__title">Update Accessory</div>
        <Form form={form} onFinish={onUpdateAccessory} layout="vertical" className="accessory-create__form">
          <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input name of cd game!' }]}>
            <Input placeholder="Name of Accessory" />
          </Form.Item>
          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[{ required: true, message: 'Please input name of quantity!' }]}
          >
            <Input placeholder="Quantity of Accessory" />
          </Form.Item>
          <Form.Item
            label="Discount"
            name="discount"
            rules={[{ required: true, message: 'Please input discount of Accessory!' }]}
          >
            <Input placeholder="Discount of Accessory" />
          </Form.Item>
          <Form.Item label="Price" name="price" rules={[{ required: true, message: 'Please input price of Accessory!' }]}>
            <Input placeholder="Price of Accessory" />
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

          <Form.Item label="Image URL" name="image" rules={[{ required: true, message: 'Please input image!' }]}>
            <Input placeholder="Image url" />
          </Form.Item>
          <Button htmlType="submit">Update</Button>
        </Form>
      </div>
    </PrivateLayout>
  )
}

export default UpdateAccessory
