import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createTicket, resetTicket } from '../features/tickets/ticketSlice';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';

function NewTicket() {
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.ticket
  );

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [product, setProduct] = useState('');
  const [description, setDescription] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createTicket({ product, description }));
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      dispatch(resetTicket());
      navigate('/tickets');
    }
    dispatch(resetTicket());
  }, [isError, isSuccess, message, navigate, dispatch]);

  if (isLoading) {
    <Spinner />;
  }

  return (
    <>
      <BackButton url='/' />
      <section className='heading'>
        <h1>Create new Ticket</h1>
        <p>Please fill out the form</p>
      </section>
      <section className='form'>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            className='form-control'
            id='name'
            value={name}
            disabled
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>E-Mail</label>
          <input
            type='text'
            className='form-control'
            id='email'
            value={email}
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
              onChange={(e) => setProduct(e.target.value)}
            >
              <option value=''>Select Product</option>
              <option value='Phone'>Phone</option>
              <option value='Laptop'>Laptop</option>
              <option value='Tablet'>Tablet</option>
              <option value='Desktop'>Desktop</option>
              <option value='Printer'>Printer</option>
              <option value='Network'>Network</option>
              <option value='Other'>Other</option>
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='description'>Description</label>
            <textarea
              name='description'
              id='description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default NewTicket;
