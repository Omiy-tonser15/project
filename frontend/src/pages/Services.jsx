import { useEffect, useState } from "react";
import api from "../api/axios";

function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    api.get("services/")
      .then((res) => setServices(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Available Services</h3>

      <div className="row">
        {services.map((service) => (
          <div key={service.id} className="col-md-4 mb-3">
            <div className="card shadow h-100">
              <div className="card-body">
                <h5 className="card-title">{service.service_name}</h5>
                <p className="card-text">{service.description}</p>
                <p className="fw-bold">
                  Price: TZS {service.price}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
