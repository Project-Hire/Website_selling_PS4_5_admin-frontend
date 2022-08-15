import { Button, Form, Input } from 'antd'
import moment from 'moment'
import { useHistory, useLocation } from 'react-router-dom'
import PrivateLayout from '../../layout/PrivateLayout'
import '../../style/Advertisement.css'
import { API_TRADEMARK_STORE } from '../../config/endpointAPi'
import { postAxios } from '../../Http'
import { useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { TRADEMARK } from '../../config/path'

const CreateTradeMark = () => {
  const history = useHistory()
  const queryClient = useQueryClient()

  const onCreateTradeMark = (value) => {
    value.created_at = moment().format('YYYY-MM-DD HH:mm:ss')

    postAxios(API_TRADEMARK_STORE, value)
      .then((res) => {
        if (res.status === 1) {
          queryClient.invalidateQueries(['trademark'])
          toast.success(res?.message)
          setTimeout(() => {
            history.push(TRADEMARK)
          }, 1000)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <PrivateLayout>
      <div className="trademark-create">
        <div className="trademark-create__title">Create Trade Mark</div>
        <Form onFinish={onCreateTradeMark} layout="vertical" className="trademark-create__form">
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input the name of trade mark!' }]}
          >
            <Input placeholder="Name of trade mark" />
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

export default CreateTradeMark
