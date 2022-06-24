import { Button, Form, Input } from 'antd'
import React from 'react'
import moment from 'moment'
import { useHistory } from 'react-router-dom'
import PrivateLayout from '../../layout/PrivateLayout'
import '../../style/Advertisement.css'
import { API_CDGAME_STORE } from '../../config/endpointAPi'
import { postAxios } from '../../Http'
import { useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { CDGAME } from '../../config/path'

const CreateCDGame = () => {
  const history = useHistory()
  const queryClient = useQueryClient()

  const onCreateCDGame = (value) => {
    value.created_at = moment().format('YYYY-MM-DD HH:mm:ss')

    postAxios(API_CDGAME_STORE, value)
      .then((res) => {
        if (res.status === 1) {
          queryClient.invalidateQueries(['cdgame'])
          toast.success(res?.message)
          setTimeout(() => {
            history.push(CDGAME)
          }, 1000)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <PrivateLayout>
      <div className="cdgame-create">
        <div className="cdgame-create__title">Create CD_Game</div>
        <Form onFinish={onCreateCDGame} layout="vertical" className="cdgame-create__form">
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input name of CD_Games!' }]}
          >
            <Input placeholder="Name of CD_Games" />
          </Form.Item>
          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[{ required: true, message: 'Please input the quantity!' }]}
          >
            <Input placeholder="Number of products" />
          </Form.Item>
          <Button htmlType="submit">Create</Button>
        </Form>
      </div>
    </PrivateLayout>
  )
}

export default CreateCDGame
