import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createTicket, reset } from '../features/tickets/ticketSlice'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'

export default function NewTicket() {
  const { user } = useSelector(state => state.auth)
  const { isLoading, isError, isSuccessful, message } = useSelector(
    state => state.ticket
  )

  const [product, setProduct] = useState('iPhone')
  const [description, setDescription] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccessful) {
      toast.success('Ticket Created')
      navigate('/tickets')
    }

    dispatch(reset())
  }, [dispatch, isError, isSuccessful, navigate, message])

  const onSubmit = e => {
    e.preventDefault()
    dispatch(createTicket({ product, description }))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <BackButton url='/' />
      <section className='heading'>
        <h1>Create new Ticket</h1>
        <p>Please fill the form below</p>
      </section>

      <section className='form'>
        <div className='form-group'>
          <label htmlFor='name'>Customer Name</label>
          <input
            type='text'
            className='form-control'
            value={user.name}
            disabled
          />
        </div>
        <div className='form-group'>
          <label htmlFor='name'>Customer Email</label>
          <input
            type='text'
            className='form-control'
            value={user.email}
            disabled
          />
        </div>

        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <label htmlFor='product'>Product</label>
            <select
              name='product'
              id='product'
              value={product}
              onChange={e => setProduct(e.target.value)}
            >
              <option value='iPhone'>iPhone</option>
              <option value='Macbook Pro'>Macbook Pro</option>
              <option value='Macbook Air'>Macbook Air</option>
              <option value='iPad'>iPad</option>
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='description'>Please describe the issue</label>
            <textarea
              name='description'
              id='description'
              className='form-group'
              placeholder='Description'
              value={description}
              onChange={e => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className='form-group'>
            <button className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}
