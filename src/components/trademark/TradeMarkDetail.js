import React from 'react'
import { useLocation } from 'react-router-dom'
import useTradeMarkDetailQuery from '../../hooks/useTradeMarkDetailQuery'
import PrivateLayout from '../../layout/PrivateLayout'

const TradeMarkDetail = () => {
  const location = useLocation()
  const id_trademark = location.pathname.split('/')[4]
  const { data: trademark } = useTradeMarkDetailQuery(id_trademark)

  return (
    <PrivateLayout>
      <div>
        <h1>{trademark.name}</h1>
        <img src={trademark?.image} alt={trademark} />
      </div>
    </PrivateLayout>
  )
}

export default TradeMarkDetail
