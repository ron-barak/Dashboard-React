import Form from "../common/form";
import Joi from "joi-browser";
import userService from "../../services/userService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

class EditUser extends Form {
  state = {
    data: {
      email: "",
      password: "",
      name: "",
      phone: "",
      address: "",
      image: "",
      bio: "",
    },
    errors: {},
  };

  async componentDidMount() {
    const postId = this.props.match.params.id;
    const data = await userService.userInfoById(postId);
    this.setState({ data: this.mapDataToState(data) });
  }

  async doSubmit() {
    const { image, password, ...data } = this.state.data;
    if (image) {
      data.image = image;
    }
    if (password) {
      data.password = password;
    }
    await userService.updateUser(data);
    this.props.history.replace("/home");
    toast.info("User successfully updated");
  }
  mapDataToState(data) {
    return {
      _id: data._id,
      email: data.email,
      password: data.password,
      name: data.name,
      phone: data.phone,
      address: data.address,
      image: data.image,
      bio: data.bio,
    };
  }

  schema = {
    _id: Joi.string(),
    name: Joi.string().min(2).max(255).required().label("Name"),
    email: Joi.string().min(6).max(255).required().email().label("Email"),
    password: Joi.string().min(6).max(1024).label("Password").allow(""),
    phone: Joi.string()
      .min(9)
      .max(10)
      .required()
      .regex(/^0[2-9]\d{7,8}$/)
      .label("Phone"),
    address: Joi.string().min(2).max(400).required().label("Address"),
    image: Joi.string().min(11).max(1024).uri().allow("").required(),
    bio: Joi.string().min(2).max(400).required().label("Bio"),
  };

  render() {
    return (
      <div className=" ml-4 col-lg-10" style={{ marginTop: "120px" }}>
        <div className="row">
          <div className="bg-white p-5" style={{ borderRadius: "12px" }}>
            <Link to="/home">
              <button
                onClick={this.hendleCancel}
                className="btn text-white"
                style={{ background: "#04a8f4" }}
              >
                <i class="fas fa-arrow-left mr-1"></i> Back
              </button>
            </Link>
            <div className="text-center">
              <h1 className="my-4" style={{ color: "#003047" }}>
                Edit User
              </h1>
            </div>
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
              {this.renderButton("Update")}
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

export default EditUser;
