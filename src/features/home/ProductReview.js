import { Button, Rating, Textarea } from '@material-tailwind/react'
import { useFormik } from 'formik'
import React from 'react'
import * as Yup from 'yup';
import { useReviewAddMutation } from '../shared/productApi';
import { toast } from 'react-toastify';




const ProductReview = ({ user, id, reviews }) => {
  const [addReview, { isLoading }] = useReviewAddMutation();

  const commentSchema = Yup.object({
    rating: Yup.number().required('required'),
    comment: Yup.string().min(5).required(),
  });

  const { handleChange, handleSubmit, values, setFieldValue } = useFormik({
    initialValues: {
      rating: 0,
      comment: ''
    },
    onSubmit: async (val) => {
      try {
        const response = await addReview({
          body: {
            rating: val.rating,
            comment: val.comment
          },
          id,
          token: user.token
        }).unwrap();
        toast.success('review added');
      } catch (err) {
        toast.error(`${err.data?.message}`)
      }

    },
    validationSchema: commentSchema
  });

  return (
    <div className='space-y-2 p-7'>

      {!user?.isAdmin && user && <div>
        <h1>Add Review here</h1>
        <form onSubmit={handleSubmit}>
          <div className="w-96 space-y-2" >
            <Rating onChange={(e) => setFieldValue('rating', e)} name="rating" />
            <Textarea label="Message" name='comment' onChange={handleChange} />
          </div>
          <Button loading={isLoading} type='submit' className="mt-6 w-[10%]" size='sm' fullWidth>
            Submit
          </Button>
        </form>
      </div>
      }

      <div className='mt-5'>
        {reviews.map(({ _id, comment, rating, user }) => {
          return <div key={_id} className=' space-y-1'>
            <h1>{user.username}</h1>
            <Rating value={rating} readonly />
            <p>{comment}</p>
          </div>
        })}
      </div>

    </div>
  )
}

export default ProductReview