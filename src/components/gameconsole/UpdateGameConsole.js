import { Button, Form, Input, Select } from 'antd'
import { Option } from 'antd/lib/mentions'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'
import { useHistory, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { GAMECONSOLE } from '../../config/path'
import useGameConsoleDetailQuery from '../../hooks/useGameConsoleDetailQuery'
import useUpdateGameConsole from '../../hooks/useGameConsoleUpdate'
import useTradeMarkQuery from '../../hooks/useTradeMarkQuery'
import QueryString from 'qs'
import PrivateLayout from '../../layout/PrivateLayout'

const UpdateGameConsole = () => {
  const [form] = Form.useForm()
  const history = useHistory()
  const location = useLocation()
  const id_gameconsole = location.pathname.split('/')[3]
  const queryClient = useQueryClient()
  const { data: gameconsole } = useGameConsoleDetailQuery(id_gameconsole)
  const updateGameConsole = useUpdateGameConsole()
  const searchUrl = QueryString.parse(location.search.substr(1))
  const [limit] = useState(searchUrl?.limit || 10)
  const [keyword] = useState(searchUrl?.keyword || '')
  const [page] = useState(searchUrl?.page || 1)

  const { data: trademark } = useTradeMarkQuery([limit, keyword, page])
  const trademark_list = trademark?.data

  useEffect(() => {
    form.setFieldsValue({
      name: gameconsole?.name,
      image: gameconsole?.image,
      quantity: gameconsole?.quantity,
      price: gameconsole?.price,
      viewer: gameconsole?.viewer,
      discount: gameconsole?.discount,
      trademark_id: gameconsole?.trademark_id,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameconsole])

  const onCreateGameConsole = (value) => {
    value.updated_at = moment().format('YYYY-MM-DD HH:mm:ss')
    value.id = id_gameconsole

    updateGameConsole.mutate(value, {
      onSuccess: (data) => {
        if (data.status === 1) {
          queryClient.invalidateQueries(['gameconsole', 'gameconsole_detail'])
          toast.success(data?.message)
          setTimeout(() => {
            history.push(GAMECONSOLE)
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
      <div className="gameconsole-create">
        <div className="gameconsole-create__title">Update Game Console</div>
        <Form form={form} onFinish={onCreateGameConsole} layout="vertical" className="gameconsole-create__form">
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input name of gameconsole!' }]}
          >
            <Input placeholder="Name of gameconsole" />
          </Form.Item>
          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[{ required: true, message: 'Please input the quantity of game console!' }]}
          >
            <Input placeholder="Quantity of gameconsole" />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: 'Please input price of gameconsole!' }]}
          >
            <Input placeholder="Price of gameconsole" />
          </Form.Item>
          <Form.Item
            label="Discount"
            name="discount"
            rules={[{ required: true, message: 'Please input discount of gameconsole!' }]}
          >
            <Input placeholder="Discount of gameconsole" />
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

export default UpdateGameConsole
