import { Button, Form, Input } from 'antd'
import React, { useState } from 'react'
import moment from 'moment'
import { useHistory } from 'react-router-dom'
import PrivateLayout from '../../layout/PrivateLayout'
import '../../style/Advertisement.css'
import { useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { ADVERTISEMENT } from '../../config/path'
import useAdvertisementCreate from '../../hooks/useAdvertisementCreate'
import UploadFormItem from '../../common/UploadFormItem/index.js'
import { API_UPLOAD, UPLOAD_PRESET } from '../../config/const'
import axios from 'axios'

const updateDefault = {
  previewVisible: false,
  previewImage: '',
  previewTitle: '',
  isFileValidFormat: true,
  fileList: [],
}

const CreateAdvertisement = () => {
  const history = useHistory()
  const [uploadState, setUploadState] = useState(updateDefault)
  const queryClient = useQueryClient()
  const createAdvertise = useAdvertisementCreate()

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e
    }

    return e && e.fileList
  }

  const onCreateAdvertisement = (value) => {
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
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <PrivateLayout>
      <div className="advertise-create">
        <div className="advertise-create__title">Create Advertisement</div>
        <Form onFinish={onCreateAdvertisement} layout="vertical" className="advertise-create__form">
          <UploadFormItem
            uploadState={uploadState}
            className="advertise-create-upload"
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
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input name of advertisement!' }]}
          >
            <Input placeholder="Name of advertisement" />
          </Form.Item>
          <Button htmlType="submit">Create</Button>
        </Form>
      </div>
    </PrivateLayout>
  )
}

export default CreateAdvertisement
