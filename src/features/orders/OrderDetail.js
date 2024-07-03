import React from 'react'
import { useParams } from 'react-router'
import { useGetOrderByIdQuery } from './orderApi'
import { useSelector } from 'react-redux'
import { imageUrl } from '../../constants/constants'


const OrderDetail = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.userSlice);
  const { data, isLoading, error } = useGetOrderByIdQuery({
    id,
    token: user.token
  });

  if (isLoading) {
    return <h1>Loading....</h1>
  }

  return (
    <div className='p-4'>



      <div className="">
        <div >
          {data.data?.products.map(({ qty, product: { product_image, product_price, product_name }, _id }) => {
            return <div key={_id} className="grid grid-cols-2">
              <div>
                <img src={`${imageUrl}${product_image}`} alt="" className='h-[70px]  w-[90px]' />
              </div>
              <div>
                <h1>{product_name}</h1>
                <h1>{`Rs.${product_price}`}</h1>
              </div>

            </div>
          })}

          {<div className="flex justify-between mt-10">
            <h1 className="text-xl font-semibold">Sub Total</h1>
            <h1>Rs.{data?.data?.totalAmount}</h1>
          </div>}
        </div>

      </div>


    </div>
  )
}

export default OrderDetail