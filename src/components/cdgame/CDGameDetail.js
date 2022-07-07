import React from 'react'
import { useLocation } from 'react-router-dom'
import useCDGameDetailQuery from '../../hooks/useCDGameDetailQuery'
import PrivateLayout from '../../layout/PrivateLayout'
import '../../style/CDGame.css'
const CDGameDetail = () => {
  const location = useLocation()
  const id_cdgame = location.pathname.split('/')[4]
  const { data: cdgame } = useCDGameDetailQuery(id_cdgame)
  console.log(id_cdgame);

  return (
    <PrivateLayout>
      <div className="cdgame-detail">
        <div className="cdgame-detail__title">{cdgame?.name}</div>

        <div className="cdgame-detail__container">
          <div className="cdgame-detail__image">
            <img src={cdgame?.image} alt={cdgame} />
          </div>
          <div className="cdgame-detail__info">
            <div className="cdgame-detail__content">Number of products : {cdgame?.quantity}</div>
            <div className="cdgame-detail__content">Price : {cdgame?.price}</div>

            <div className="cdgame-detail__content">Label : {cdgame?.trademark_id}</div>

            <div className="cdgame-detail__content">Discount : {cdgame?.discount} %</div>

            <div className="cdgame-detail__content">Viewer : {cdgame?.viewer}</div>
          </div>
        </div>
      </div>
    </PrivateLayout>
  )
}

export default CDGameDetail
