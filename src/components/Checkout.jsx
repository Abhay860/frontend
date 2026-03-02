import React , {useState} from 'react';
import Layout from "./common/Layout";
import { Link } from "react-router-dom";
import ProductImg from "../assets/images/Mens/seven.jpg";
const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const handlePaymentMethod = (e) =>{
    setPaymentMethod(e.target.value);
  }
  return (
    <Layout>
      <div className="container pb-5">
        <div className="row">
          <div className="col-md-12">
            <div className="col-md-12">
              <nav aria-label="breadcrumb" className="py-4">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li class="breadcrumb-item " aria-current="page">
                    <Link to="/cart">Cart</Link>
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-7">
            <h3 className="border-bottom pb-3">Billing Details</h3>
            <form action="">
              <div className="row pt-3">
                <div className="col-md-6">
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Full Name"
                    />
                  </div>

                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email Address"
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <textarea name="" className="form-control" id="" placeholder="Address" rows={3}></textarea>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <input
                      type="city"
                      className="form-control"
                      placeholder="City"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <input
                      type="state"
                      className="form-control"
                      placeholder="State"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <input
                      type="zipcode"
                      className="form-control"
                      placeholder="Zipcode"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <input
                      type="mobile"
                      className="form-control"
                      placeholder="Mobile Number"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className="col-md-5">
            <h3 className="border-bottom pb-"><strong>Items</strong></h3>
            <table className="table">
              <tbody>
                <tr>
                  <td width={100}>
                    {" "}
                    <img src={ProductImg} alt="image" width={80} />
                  </td>
                  <td width={600}>
                    <h4 className="mb-0">Dummy product title</h4>
                    <div className="d-flex align-items-center pt-3">
                      <span>$10</span>
                      <div className="ps-3">
                        <button className="btn btn-size">S</button>
                      </div>
                      <div className="ps-5">
                        X 1
                      </div>
                    </div>
                  </td>


                </tr>
              </tbody>
            </table>
            <table className="table">
              <tbody>
                <tr>
                  <td width={100}>
                    {" "}
                    <img src={ProductImg} alt="image" width={80} />
                  </td>
                  <td width={600}>
                    <h4 className="mb-0">Dummy product title</h4>
                    <div className="d-flex align-items-center pt-3">
                      <span>$10</span>
                      <div className="ps-3">
                        <button className="btn btn-size">S</button>
                      </div>
                      <div className="ps-5">
                        X 1
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="row">
              <div className="col-md-12">
                <div className="d-flex justify-content-between border-bottom pb-2">
                  <div> Subtotal </div>
                  <div>$20</div>
                </div>
                <div className="d-flex justify-content-between border-bottom py-2">
                  <div>Shipping</div>
                  <div>$5</div>
                </div>
                <div className="d-flex justify-content-between  border-bottom py-2">
                  <div>
                    <strong>Grand Total</strong>
                  </div>
                  <div>$25</div>
                </div>
               
              </div>
            </div>

            <h3 className="border-bottom pt-4 pb-3">
              <strong>Payment Method</strong>
            </h3>
            
            <div className='pt-2'>
              <input type="radio"  onClick={handlePaymentMethod}
              checked={paymentMethod == 'stripe'}  value={'stripe'}/>
              <label htmlFor="stripe" className="form-lable ps-2">Stripe</label>
            
              <input type="radio"  onClick={handlePaymentMethod}
               checked={paymentMethod == 'cod'}  className="ms-3" value={'cod'} />
              <label htmlFor="cash" className="form-lable ps-2">Cash on Delivery</label>
            </div>
             <div className="d-flex py-3">
                  <button className="btn btn-primary ">
                  pay Now
                  </button>
                </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
