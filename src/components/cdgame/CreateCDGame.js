import { Button, Form, Input } from 'antd'
import React, { useState } from 'react'
import moment from 'moment'
import { useHistory } from 'react-router-dom'
import PrivateLayout from '../../layout/PrivateLayout'
import '../../style/Advertisement.css'
import { API_CDGAME_STORE } from '../../config/endpointAPi'
import { postAxios } from '../../Http'
import { useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { CDGAME } from '../../config/path'
import { API_UPLOAD, UPLOAD_PRESET } from '../../config/const'
import axios from 'axios'
import useCDGameCreate from '../../hooks/useCDGameCreate'
import UploadFormItem from '../../common/UploadFormItem'

const updateDefault = {
  previewVisible: false,
  previewImage: '',
  previewTitle: '',
  isFileValidFormat: true,
  fileList: [],
}

const CreateCDGame = () => {
  const history = useHistory()
  const [uploadState, setUploadState] = useState(updateDefault)
  const queryClient = useQueryClient()
  const createAdvertise = useCDGameCreate()

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e
    }

    return e && e.fileList
  }

  const onCreateCDGame = (value) => {
    const { image } = value
    const formData = new FormData()

    formData.append('file', image[0].originFileObj)
    formData.append('upload_preset', UPLOAD_PRESET)

    value.created_at = moment().format('YYYY-MM-DD HH:mm:ss')

    axios
      .post(API_UPLOAD, formData)
      .then((res) => {
        value.image = res.data.secure_url
      })
      .then(() => {
        createAdvertise.mutate(value, {
          onSuccess: (data, variables, context) => {
            console.log(data, variables, context)
            if (data.status === 1) {
              queryClient.invalidateQueries(['cdgame'])
              toast.success(data?.message)
              setTimeout(() => {
                history.push(CDGAME)
              }, 1000)
            }
          },
          onError: (error) => {
            toast.error(error?.message)
          },
        })
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
            rules={[{ required: true, message: 'Please input the number of product!' }]}
          >
            <Input placeholder="Number of product" />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: 'Please input the price of the product!' }]}
          >
            <Input placeholder="Price of product" />
          </Form.Item>
          <Form.Item
            label="Discount"
            name="discount"
            rules={[{ required: true, message: 'Please input the discount!' }]}
          >
            <Input placeholder="Discount of product" />
          </Form.Item>
          <UploadFormItem
            uploadState={uploadState}
            className="cdgame-create-upload"
            setUploadState={setUploadState}
            uploadTitle={
              <>
                <p>{'Add Image'}</p>
              </>
            }
            limit={1}
            formItemProps={{
              label: 'Photo',
              name: 'image',
              rules: [
                {
                  required: true,
                  message: 'Please choose 1 photo',
                },
              ],
              valuePropName: 'fileList',
              getValueFromEvent: normFile,
            }}
          />
          <Button htmlType="submit">Create</Button>
        </Form>
      </div>
    </PrivateLayout>
  )
}

export default CreateCDGame
