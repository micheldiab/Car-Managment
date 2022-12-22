
import React from 'react';
import { Container, Row,Col} from 'react-bootstrap';
import Dashboard from './Dashboard';
const AboutUs = () => {
  return (
    <div className="container-fluid">
    <Dashboard />
    <Container>
      <Row>
        <Col>
         
           
              <h4 className="mb-4">Welcome</h4>
              <p>
                Welcome to our website for car management! We are a team of experienced professionals dedicated to helping you manage your car or fleet of cars effectively and efficiently.
              </p>
            
       
        </Col>
      </Row>
      <Row>
        <Col>
       
              <h4 className="mb-4">Our Services</h4>
              <p>
                Our website offers a range of tools and features designed to streamline the process of managing your car or cars. From scheduling maintenance and repairs, to tracking fuel usage and expenses, our website has everything you need to keep your car or cars running smoothly.
              </p>
   
        </Col>
      </Row>
      <Row>
        <Col>

          
              <h4 className="mb-4">Our Commitment</h4>
              <p>
                We are passionate about providing the best possible service to our customers, and we are always working to improve and expand our offerings. If you have any suggestions or feedback, we would love to hear from you.
              </p>
           

        </Col>
      </Row>
      <Row>
        <Col>
 
           
              <h4 className="mb-4">Thank You</h4>
              <p>
                Thank you for choosing us for your car management needs. We look forward to helping you keep your car or cars in top condition.
              </p>
           
    
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default AboutUs;