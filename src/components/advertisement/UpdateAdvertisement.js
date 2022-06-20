import { Button, Form, Input } from 'antd'
import moment from 'moment'
import React from 'react'
import { useQueryClient } from 'react-query'
import { useHistory, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { API_ADVERTISEMENT_UPDATE } from '../../config/endpointAPi'
import { ADVERTISEMENT } from '../../config/path'
import useAdvertisementDetailQuery from '../../hooks/useAdvertisementDetailQuery'
import { putAxios } from '../../Http'
import PrivateLayout from '../../layout/PrivateLayout'

const UpdateAdvertisement = () => {
  const history = useHistory()
  const location = useLocation()
  const id_advertisement = location.pathname.split('/')[3]
  const queryClient = useQueryClient()
  const { data: advertise } = useAdvertisementDetailQuery(id_advertisement)

  const onCreateAdvertisement = (value) => {
    value.updated_at = moment().format('YYYY-MM-DD HH:mm:ss')
    value.id = id_advertisement

    putAxios(API_ADVERTISEMENT_UPDATE, value)
      .then((res) => {
        if (res.status === 1) {
          queryClient.invalidateQueries(['advertisement', 'advertisement_detail'])
          toast.success(res?.message)
          setTimeout(() => {
            history.push(ADVERTISEMENT)
          }, 1000)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <PrivateLayout>
      <div className="advertise-create">
        <div className="advertise-create__title">Update Advertisement</div>
        <Form
          initialValues={{
            name: advertise?.name,
            image: advertise?.image,
          }}
          onFinish={onCreateAdvertisement}
          layout="vertical"
          className="advertise-create__form"
        >
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
