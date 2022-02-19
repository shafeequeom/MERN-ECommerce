const ShowPaymentInfo = ({ order }) => {
  const { paymentIntent } = order;
  return (
    <div>
      <p className="d-flex justify-content-between">
        <span>Order ID: {paymentIntent && paymentIntent.id.toUpperCase()}</span>
        <span>
          Amount:{" "}
          {paymentIntent &&
            (paymentIntent.amount /= 100).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
        </span>
        <span>
          Currency: {paymentIntent && paymentIntent.currency.toUpperCase()}
        </span>
        <span>
          Method: {paymentIntent && paymentIntent.payment_method_types[0]}
        </span>
        <span>
          Payment: {paymentIntent && paymentIntent.status.toUpperCase()}
        </span>
        <span>
          Order On:{" "}
          {paymentIntent &&
            new Date(paymentIntent.created * 100).toLocaleString()}
        </span>
        <span className="badge bg-primary text-white">
          Status: {order.orderStatus}
        </span>
      </p>
    </div>
  );
};

export default ShowPaymentInfo;
