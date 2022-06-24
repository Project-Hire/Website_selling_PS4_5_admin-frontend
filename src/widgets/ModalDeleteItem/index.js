import React from 'react'
import { Button } from 'antd'
import './index.css'

export const ModalDeleteItem = ({ title, handleClose, handleDelete }) => {
  return (
    <div className="modal-delete">
      <div className="modal-delete__title">
        <div className="modal-delete__title">{title}</div>
        <div>close</div>
      </div>
      <div>
        <Button onClick={handleDelete}>Yes</Button>
        <Button onClick={handleClose}>No</Button>
      </div>
    </div>
  )
}
