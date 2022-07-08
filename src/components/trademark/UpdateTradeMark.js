import { Button, Form, Input } from 'antd'
import moment from 'moment'
import React, { useEffect } from 'react'
import { useQueryClient } from 'react-query'
import { useHistory, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { TRADEMARK } from '../../config/path'
import useTradeMarkDetailQuery from '../../hooks/useTradeMarkDetailQuery'
import useUpdateTradeMark from '../../hooks/useTradeMarkUpdate'
import PrivateLayout from '../../layout/PrivateLayout'

const UpdateTradeMark = () => {
  const [form] = Form.useForm()
  const history = useHistory()
  const location = useLocation()
  const id_trademark = location.pathname.split('/')[3]
  const queryClient = useQueryClient()
  const { data: trademark } = useTradeMarkDetailQuery(id_trademark)
  const updateTradeMark = useUpdateTradeMark()
  console.log(trademark)

  useEffect(() => {
    form.setFieldsValue({
      name: trademark?.name,
      image: trademark?.image,
    })
  }, [trademark])

  const onCreateTradeMark = (value) => {
    value.updated_at = moment().format('YYYY-MM-DD HH:mm:ss')
    value.id = Number(id_trademark)

    updateTradeMark.mutate(value, {
      onSuccess: (data) => {
        if (data.status === 1) {
          queryClient.invalidateQueries(['trademark', 'trademark_detail'])
          toast.success(data?.message)
          setTimeout(() => {
            history.push(TRADEMARK)
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
      <div className="trademark-create">
        <div className="trademark-create__title">Update Trade Mark</div>
        <Form form={form} onFinish={onCreateTradeMark} layout="vertical" className="trademark-create__form">
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input name of trademarkment!' }]}
          >
            <Input placeholder="Name of trademarkment" />
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

export default UpdateTradeMark
