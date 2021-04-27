import Form from "../common/form";
import Joi from "joi-browser";
import http from "../../services/http";
import { apiUrl } from "../../config.json";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

class CreateUser extends Form {
  state = {
    data: {
      email: "",
      password: "",
      name: "",
      phone: "",
      address: "",
      bio: "",
      image: "",
    },
    errors: {},
  };

  async doSubmit() {
    const { image, ...data } = this.state.data;
    if (image) {
      data.image = image;
    }
    try {
      await http.post(`${apiUrl}/users`, data);
      toast.info("New user created successfully");
      this.props.history.replace("/home");
    } catch (err) {
      if (err.response && err.response.status === 400) {
        this.setState({ errors: err.response.data.errors });
      }
    }
  }
  schema = {
    _id: Joi.string(),
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(6).required().label("Password"),
    name: Joi.string().min(2).required().label("Name"),
    phone: Joi.string()
      .min(9)
      .max(10)
      .required()
      .regex(/^0[2-9]\d{7,8}$/)
      .label(" Phone"),
    address: Joi.string().min(2).max(400).required().label("Address"),
    bio: Joi.string().min(2).max(400).required().label("Bio"),
    image: Joi.string().min(11).max(1024).uri().allow("").required(),
  };

  render() {
    return (
      <div className="ml-4 col-lg-10" style={{ marginTop: "130px" }}>
        <div className="row">
          <div className="bg-white p-5" style={{ borderRadius: "12px" }}>
            <Link to="/home">
              <button
                onClick={this.hendleCancel}
                className="btn text-white ml-4"
                style={{ background: "#04a8f4" }}
              >
                <i class="fas fa-arrow-left mr-1"></i> Back
              </button>
            </Link>
            <h1 className="text-center my-4" style={{ color: "#003047" }}>
              Create new User
            </h1>
            <form className="form-row" noValidate onSubmit={this.handleSubmit}>
              <div className="col-lg-6">
                {this.renderInput("email", "Email:", "email")}
              </div>
              <div className="col-lg-6">
                {this.renderInput("password", "Password:", "password")}
              </div>
              <div className="col-lg-6">
                {this.renderInput("name", " Full name:")}
              </div>
              <div className="col-lg-6">
                {this.renderInput("phone", "Phone:")}
              </div>
              <div className="col-lg-12">
                {this.renderInput("address", "Address:")}
              </div>
              <div className="col-lg-12">
                {this.renderInput("image", "Profile Image:")}
              </div>
              <div className="col-lg-12">
                {this.renderTextarea("bio", "Bio:")}
              </div>
              {this.renderButton("Create")}
              <Link to="/home">
                <button
                  className="btn text-white ml-3"
                  style={{ background: "#003047" }}
                >
                  Cancel
                </button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateUser;
