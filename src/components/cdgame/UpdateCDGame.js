import { Button, Form, Input, Select } from 'antd'
import { Option } from 'antd/lib/mentions'
import moment from 'moment'
import React, { useEffect } from 'react'
import { useQueryClient } from 'react-query'
import { useHistory, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { CDGAME } from '../../config/path'
import useCDGameDetailQuery from '../../hooks/useCDGameDetailQuery'
import useCDGameUpdate from '../../hooks/useCDGameUpdate'
import useTradeMarkQuery from '../../hooks/useTradeMarkQuery'
import QueryString from 'qs'
import PrivateLayout from '../../layout/PrivateLayout'
import { useState } from 'react'

const UpdateCDGame = () => {
  const [form] = Form.useForm()
  const history = useHistory()
  const location = useLocation()
  const id_cdgame = location.pathname.split('/')[3]
  const queryClient = useQueryClient()
  const { data: cdgame } = useCDGameDetailQuery(id_cdgame)
  const updateCDGame = useCDGameUpdate()
  const searchUrl = QueryString.parse(location.search.substr(1))
  const [limit] = useState(searchUrl?.limit || 10)
  const [keyword] = useState(searchUrl?.keyword || '')
  const [page] = useState(searchUrl?.page || 1)
  const { data: trademark } = useTradeMarkQuery([limit, keyword, page])
  console.log(trademark)
  const trademark_list = trademark?.data

  useEffect(() => {
    form.setFieldsValue({
      name: cdgame?.name,
      quantity: cdgame?.quantity,
      discount: cdgame?.discount,
      price: cdgame?.price,
      image: cdgame?.image,
      trademark_id: cdgame?.trademark_id,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cdgame])

  const onUpdateCDGame = (value) => {
    value.updated_at = moment().format('YYYY-MM-DD HH:mm:ss')
    value.id = Number(id_cdgame)

    updateCDGame.mutate(value, {
      onSuccess: (data) => {
        if (data.status === 1) {
          queryClient.invalidateQueries(['cdgame', 'cdgame_detail'])
          toast.success(data?.message)
          setTimeout(() => {
            history.push(CDGAME)
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
      <div className="cdgame-create">
        <div className="cdgame-create__title">Update CD GAME</div>
        <Form form={form} onFinish={onUpdateCDGame} layout="vertical" className="cdgame-create__form">
          <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input name of cd game!' }]}>
            <Input placeholder="Name of CD Game" />
          </Form.Item>
          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[{ required: true, message: 'Please input name of quantity!' }]}
          >
            <Input placeholder="Quantity of CD Game" />
          </Form.Item>
          <Form.Item
            label="Discount"
            name="discount"
            rules={[{ required: true, message: 'Please input discount of cd game!' }]}
          >
            <Input placeholder="Discount of CD Game" />
          </Form.Item>
          <Form.Item label="Price" name="price" rules={[{ required: true, message: 'Please input price of cd game!' }]}>
            <Input placeholder="Price of CD Game" />
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

export default UpdateCDGame
