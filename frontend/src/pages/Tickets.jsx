import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTickets, resetTicket } from '../features/tickets/ticketSlice';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
import TicketItem from '../components/TicketItem';

function Tickets() {
  const dispatch = useDispatch();
  const { tickets, isLoading, isSuccess } = useSelector(
    (state) => state.tickets
  );

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(resetTicket());
      }
    };
  }, [dispatch, isSuccess]);

  useEffect(() => {
    dispatch(getTickets());
  }, [dispatch]);

  if (isLoading) {
    <Spinner />;
  }

  return (
    <>
      <BackButton url='/' />
      <h1>Tickets</h1>
      <div className='tickets'>
        <div className='ticket-headings'>
          <div>Date</div>
          <div>Product</div>
          <div>Status</div>
          <div></div>
        </div>
        {tickets.map((ticket) => (
          <TicketItem key={ticket._id} ticket={ticket} />
        ))}
      </div>
    </>
  );
}

export default Tickets;
