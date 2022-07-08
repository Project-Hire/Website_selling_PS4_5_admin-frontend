import React from 'react'
import { useLocation } from 'react-router-dom'
import useAdvertisementDetailQuery from '../../hooks/useAdvertisementDetailQuery'
import PrivateLayout from '../../layout/PrivateLayout'

const AdvertisementDetail = () => {
  const location = useLocation()
  const id_advertisement = location.pathname.split('/')[4]
  const { data: advertise } = useAdvertisementDetailQuery(id_advertisement)

  return (
    <PrivateLayout>
      <div>
        <img src={advertise?.image} alt={advertise} />
      </div>
    </PrivateLayout>
  )
}

export default AdvertisementDetail
