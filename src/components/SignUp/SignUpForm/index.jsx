import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const SignUpForm = ({ handleChangeInput, handleFormSubmit, errors }) => (
  <div
    className="mh-fullscreen bg-img center-vh p-20"
    style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/assets/img/bg-girl.jpg)` }}
  >
    <div className="card card-shadowed p-50 w-400 mb-0" style={{ maxWidth: '100%' }}>
      <h5 className="text-uppercase text-center">Register</h5>
      <br />
      <br />
      <form className="form-type-material" onSubmit={handleFormSubmit}>
        <div className="form-group">
          <input
            onChange={handleChangeInput}
            type="text"
            name="username"
            className="form-control"
            placeholder="Username"
          />
          { errors.username && <small className="text-danger">{errors.username}</small> }
        </div>
        <div className="form-group">
          <input
            onChange={handleChangeInput}
            name="email"
            type="text"
            className="form-control"
            placeholder="Email address"
          />
          {errors.email && <small className="text-danger">{errors.email}</small>}
        </div>
        <div className="form-group">
          <input
            onChange={handleChangeInput}
            name="password"
            type="password"
            className="form-control"
            placeholder="Password"
          />
          {errors.password && <small className="text-danger">{errors.password}</small>}
        </div>
        <div className="form-group">
          <input
            onChange={handleChangeInput}
            name="password_confirmation"
            type="password"
            className="form-control"
            placeholder="Password (confirm)"
          />
        </div>
        <br />
        <button className="btn btn-bold btn-block btn-primary" type="submit">Register</button>
      </form>
      <hr className="w-30" />
      <p className="text-center text-muted fs-13 mt-20">
Already have an account?
        <Link to="/login">Sign in</Link>
      </p>
    </div>
  </div>
);

SignUpForm.propTypes = {
  handleChangeInput: PropTypes.func.isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
  errors: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default SignUpForm;
