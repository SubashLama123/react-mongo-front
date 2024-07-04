import React from 'react'
import { useParams } from 'react-router'
import { useSearchProductsQuery } from '../shared/productApi';

const SearchPage = () => {
  const { query } = useParams();
  const { data, isLoading } = useSearchProductsQuery(query);
  console.log(data);
  return (
    <div>SearchPage</div>
  )
}

export default SearchPage