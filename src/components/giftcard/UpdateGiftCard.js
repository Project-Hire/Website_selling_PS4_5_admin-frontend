import { Button, Form, Input, Select } from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'
import { useHistory, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { GIFTCARD } from '../../config/path'
import useGiftCardDetailQuery from '../../hooks/useGiftCardDetailQuery'
import useUpdateGiftCard from '../../hooks/useGiftCardUpdate'
import useTradeMarkQuery from '../../hooks/useTradeMarkQuery'
import QueryString from 'qs'
import PrivateLayout from '../../layout/PrivateLayout'
import { Option } from 'antd/lib/mentions'

const UpdateGiftCard = () => {
  const [form] = Form.useForm()
  const history = useHistory()
  const location = useLocation()
  const id_giftcard = location.pathname.split('/')[3]
  const queryClient = useQueryClient()
  const { data: giftcard } = useGiftCardDetailQuery(id_giftcard)
  const updateGiftCard = useUpdateGiftCard()
  const searchUrl = QueryString.parse(location.search.substr(1))
  const [limit] = useState(searchUrl?.limit || 10)
  const [keyword] = useState(searchUrl?.keyword || '')
  const [page] = useState(searchUrl?.page || 1)
  const { data: trademark } = useTradeMarkQuery([limit, keyword, page])
  const trademark_list = trademark?.data

  useEffect(() => {
    form.setFieldsValue({
      name: giftcard?.name,
      quantity: giftcard?.quantity,
      discount: giftcard?.discount,
      price: giftcard?.price,
      image: giftcard?.image,
      trademark_id: giftcard?.trademark_id,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [giftcard])

  const onCreateGiftCard = (value) => {
    value.updated_at = moment().format('YYYY-MM-DD HH:mm:ss')
    value.id = id_giftcard

    updateGiftCard.mutate(value, {
      onSuccess: (data) => {
        if (data.status === 1) {
          queryClient.invalidateQueries(['giftcard', 'giftcard_detail'])
          toast.success(data?.message)
          setTimeout(() => {
            history.push(GIFTCARD)
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
      <div className="giftcard-create">
        <div className="giftcard-create__title">Update Gift Card</div>
        <Form form={form} onFinish={onCreateGiftCard} layout="vertical" className="giftcard-create__form">
          <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input name of giftcard!' }]}>
            <Input placeholder="Name of giftcard" />
          </Form.Item>
          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[{ required: true, message: 'Please input the quantity of giftcard!' }]}
          >
            <Input placeholder="Quantity of giftcard" />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: 'Please input price of giftcard!' }]}
          >
            <Input placeholder="Price of giftcard" />
          </Form.Item>
          <Form.Item
            label="Discount"
            name="discount"
            rules={[{ required: true, message: 'Please input discount of giftcard!' }]}
          >
            <Input placeholder="Discount of giftcard" />
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

          <Form.Item label="Image" name="image" rules={[{ required: true, message: 'Please input image!' }]}>
            <Input placeholder="Image url" />
          </Form.Item>
          <Button htmlType="submit">Update</Button>
        </Form>
      </div>
    </PrivateLayout>
  )
}

export default UpdateGiftCard
