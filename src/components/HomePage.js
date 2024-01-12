import React from 'react';
import CarSaleForm from './CarSaleForm'; 

const HomePage = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">Car Sale Form</div>
            <div className="card-body">
              <CarSaleForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;