import { useState } from 'react'
import { useSelector } from 'react-redux'

export default function NewTicket() {
  const { user } = useSelector(state => state.auth)
  const [product, setProduct] = useState('iPhone')
  const [description, setDescription] = useState('')

  const onSubmit = e => {
    e.preventDefault()
  }
  return (
    <>
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
