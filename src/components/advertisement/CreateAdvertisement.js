import { Button, Form, Input } from 'antd'
import React from 'react'
import moment from 'moment'
import { useHistory } from 'react-router-dom'
import PrivateLayout from '../../layout/PrivateLayout'
import '../../style/Advertisement.css'
import { useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { ADVERTISEMENT } from '../../config/path'
import useCreateAdvertisement from '../../hooks/useCreateAdvertisement'

const CreateAdvertisement = () => {
  const history = useHistory()
  const queryClient = useQueryClient()
  const createAdvertise = useCreateAdvertisement()

  const onCreateAdvertisement = (value) => {
    value.created_at = moment().format('YYYY-MM-DD HH:mm:ss')

    createAdvertise.mutate(value, {
      onSuccess: (data, variables, context) => {
        console.log(data, variables, context)
        if (data.status === 1) {
          queryClient.invalidateQueries(['advertisement'])
          toast.success(data?.message)
          setTimeout(() => {
            history.push(ADVERTISEMENT)
          }, 1000)
        }
      },
      onError: (error) => {
        toast.error(error?.message)
      },
    })
  }

  return (
    <PrivateLayout>
      <div className="advertise-create">
        <div className="advertise-create__title">Create Advertisement</div>
        <Form onFinish={onCreateAdvertisement} layout="vertical" className="advertise-create__form">
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input name of advertisement!' }]}
          >
            <Input placeholder="Name of advertisement" />
          </Form.Item>
          <Form.Item label="Image" name="image" rules={[{ required: true, message: 'Please input image!' }]}>
            <Input placeholder="Image url" />
          </Form.Item>
          <Button htmlType="submit">Create</Button>
        </Form>
      </div>
    </PrivateLayout>
  )
}

export default CreateAdvertisement
