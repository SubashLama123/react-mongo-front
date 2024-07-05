import React from 'react'
import { useNavigate, useParams } from 'react-router'
import { useSearchProductsQuery } from '../shared/productApi';
import { imageUrl } from '../../constants/constants';
import { Button, Card, CardBody, CardFooter, CardHeader, Typography } from '@material-tailwind/react';

const SearchPage = () => {
  const { query } = useParams();
  const nav = useNavigate();
  const { data, isLoading } = useSearchProductsQuery(query);
  if (isLoading) {
    return <h1>Loading.....</h1>
  }
  return (
    <div className='px-5 py-5'>

      <div className=' grid grid-cols-3 gap-5 items-start '>

        {data?.data.map(({ _id, product_name, product_detail, product_image }) => {
          return <Card className="mt-6 " key={_id}>
            <CardHeader color="blue-gray" className="relative ">
              <img
                className='w-full'
                src={`${imageUrl}${product_image}`}
                alt="card-image"
              />
            </CardHeader>
            <CardBody>
              <Typography variant="h5" color="blue-gray" className="mb-2">
                {product_name}
              </Typography>
              <Typography>
                {product_detail}
              </Typography>
            </CardBody>
            <CardFooter className="pt-0">
              <Button onClick={() => nav(`/product/${_id}`)}>Read More</Button>
            </CardFooter>
          </Card>
        })}



      </div>
    </div>
  )
}

export default SearchPage