import { Button, Form, Input } from 'antd'
import moment from 'moment'
import React, { useEffect } from 'react'
import { useQueryClient } from 'react-query'
import { useHistory, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ADVERTISEMENT } from '../../config/path'
import useAdvertisementDetailQuery from '../../hooks/useAdvertisementDetailQuery'
import useUpdateAdvertisement from '../../hooks/useUpdateAdvertisement'
import PrivateLayout from '../../layout/PrivateLayout'

const UpdateAdvertisement = () => {
  const [form] = Form.useForm()
  const history = useHistory()
  const location = useLocation()
  const id_advertisement = location.pathname.split('/')[3]
  const queryClient = useQueryClient()
  const { data: advertise } = useAdvertisementDetailQuery(id_advertisement)
  const updateAdervise = useUpdateAdvertisement()

  useEffect(() => {
    form.setFieldsValue({
      name: advertise?.name,
      image: advertise?.image,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [advertise])

  const onCreateAdvertisement = (value) => {
    value.updated_at = moment().format('YYYY-MM-DD HH:mm:ss')
    value.id = id_advertisement

    updateAdervise.mutate(value, {
      onSuccess: (data) => {
        if (data.status === 1) {
          queryClient.invalidateQueries(['advertisement', 'advertisement_detail'])
          toast.success(data?.message)
          setTimeout(() => {
            history.push(ADVERTISEMENT)
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
      <div className="advertise-create">
        <div className="advertise-create__title">Update Advertisement</div>
        <Form form={form} onFinish={onCreateAdvertisement} layout="vertical" className="advertise-create__form">
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
          <Button htmlType="submit">Update</Button>
        </Form>
      </div>
    </PrivateLayout>
  )
}

export default UpdateAdvertisement
