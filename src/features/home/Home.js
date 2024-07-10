import React, { useState } from 'react'
import { useGetProductsQuery } from '../shared/productApi'
import { Button, Card, CardBody, CardFooter, CardHeader, Typography } from '@material-tailwind/react';
import Cara from './Cara';
import { useNavigate } from 'react-router';
import { imageUrl } from '../../constants/constants';
import Spinner from '../../ui/Spinner';
import { IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useEffect } from 'react';

const Home = () => {
  const [active, setActive] = useState(1);
  const { data, isLoading, error } = useGetProductsQuery({ page: active });

  const nav = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [active])

  if (isLoading) {
    return <Spinner />;
  }



  return (
    <div className='px-5'>
      <Cara />
      <div className=' grid grid-cols-3 gap-5 items-start '>

        {data?.data.map(({ _id, product_name, product_detail, product_image }) => {
          return <Card className="mt-6 " key={_id}>
            <CardHeader color="blue-gray" className="relative ">
              <img
                className='w-full'
                src={`${product_image}`}
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
      <CircularPagination data={data} active={active} setActive={setActive} />
    </div>
  )
}

export default Home






export function CircularPagination({ data, active, setActive }) {

  const total = data.total;
  const numShow = Math.ceil(total / 10);

  const getItemProps = (index) =>
  ({
    variant: active === index ? "filled" : "text",
    color: "gray",
    onClick: () => setActive(index),
    className: "rounded-full",
  });

  const next = () => {
    if (active === 10) return;

    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;

    setActive(active - 1);
  };



  return (
    <div className="flex items-center gap-4 p-5 justify-center">
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full"
        onClick={prev}
        disabled={active === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>
      <div className="flex items-center gap-2">
        {[...Array(numShow).keys()].map((c) => {
          return <IconButton key={c + 1} {...getItemProps(c + 1)}>{c + 1}</IconButton>;
        })}


      </div>
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full"
        onClick={next}
        disabled={active === numShow}
      >
        Next
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
}