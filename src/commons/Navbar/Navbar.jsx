import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../state/user";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const user = useSelector((state) => state.user);
  const handleButtonRigth = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API_URL}:3001/api/users/logout`, null, {
        withCredentials: true,
      })
      .then(() => {
        if (!user.email) {
          pathname !== "/register" ? navigate("/register") : navigate("/login");
        } else {
          dispatch(logout());
          navigate("/index");
        }
      })
      .catch((err) => console.error(err));
  };
  return (
    <div>
      {user.isAdmin ? (
        <div>
          <div className="navbar">
            <div className="navbar-buttons-container">
              <button
                className="navbar-button-administrator"
                onClick={() => navigate("/admin/create/branch")}
              >
                <h4 className="h4-navbar">Crear Sucursal</h4>
              </button>
              <button
                className="navbar-button-administrator"
                onClick={() => navigate("/admin/create/operador")}
              >
                <h4 className="h4-navbar">Crear Operador</h4>
              </button>
            </div>
            <div className="div-navbar-text">
              <Link to={"/admin/allBranches"}>
                <h5 className="h5-navbar-text">Sucursales </h5>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M3.75 3C3.33579 3 3 3.33579 3 3.75V5.74219L0.890625 8.55469L0.75 8.74219V9C0.75 10.2341 1.76591 11.25 3 11.25V20.25C3 20.6642 3.33579 21 3.75 21H14.25C14.6642 21 15 20.6642 15 20.25V14.25H16.5V20.25C16.5 20.6642 16.8358 21 17.25 21H20.25C20.6642 21 21 20.6642 21 20.25V11.25C22.2341 11.25 23.25 10.2341 23.25 9V8.74219L23.1094 8.55469L21 5.74219V3.75C21 3.33579 20.6642 3 20.25 3H3.75ZM4.5 4.5H19.5V5.25H4.5V4.5ZM4.125 6.75H19.875L21.6797 9.16406C21.5977 9.48948 21.3518 9.75 21 9.75C20.7597 9.75 20.5467 9.63848 20.4097 9.4641C20.2391 9.24697 20.0261 9 19.75 9H19.25C18.9739 9 18.7609 9.24696 18.5903 9.4641C18.4533 9.63848 18.2403 9.75 18 9.75C17.7597 9.75 17.5467 9.63848 17.4097 9.4641C17.2391 9.24697 17.0261 9 16.75 9H16.25C15.9739 9 15.7609 9.24696 15.5903 9.4641C15.4533 9.63848 15.2403 9.75 15 9.75C14.7597 9.75 14.5467 9.63848 14.4097 9.4641C14.2391 9.24697 14.0261 9 13.75 9H13.25C12.9739 9 12.7609 9.24696 12.5903 9.4641C12.4533 9.63848 12.2403 9.75 12 9.75C11.7597 9.75 11.5467 9.63848 11.4097 9.4641C11.2391 9.24697 11.0261 9 10.75 9H10.25C9.97386 9 9.7609 9.24696 9.59029 9.4641C9.45327 9.63848 9.24029 9.75 9 9.75C8.75971 9.75 8.54673 9.63848 8.40971 9.4641C8.2391 9.24697 8.02614 9 7.75 9H7.25C6.97386 9 6.7609 9.24697 6.59029 9.4641C6.45327 9.63848 6.24029 9.75 6 9.75C5.75971 9.75 5.54673 9.63848 5.40971 9.4641C5.2391 9.24696 5.02614 9 4.75 9H4.25C3.97386 9 3.7609 9.24697 3.59029 9.4641C3.45327 9.63848 3.24029 9.75 3 9.75C2.64818 9.75 2.40234 9.48948 2.32031 9.16406L4.125 6.75ZM4.5 10.6641C4.89966 11.0248 5.4247 11.25 6 11.25C6.41484 11.25 6.80354 11.1329 7.13795 10.9323C7.35781 10.8005 7.64219 10.8005 7.86205 10.9323C8.19646 11.1329 8.58516 11.25 9 11.25C9.41484 11.25 9.80354 11.1329 10.1379 10.9323C10.3578 10.8005 10.6422 10.8005 10.8621 10.9323C11.1965 11.1329 11.5852 11.25 12 11.25C12.4148 11.25 12.8035 11.1329 13.1379 10.9323C13.3578 10.8005 13.6422 10.8005 13.8621 10.9323C14.1965 11.1329 14.5852 11.25 15 11.25C15.4148 11.25 15.8035 11.1329 16.1379 10.9323C16.3578 10.8005 16.6422 10.8005 16.8621 10.9323C17.1965 11.1329 17.5852 11.25 18 11.25C18.5753 11.25 19.1003 11.0248 19.5 10.6641V19.5H18V13.5C18 13.0858 17.6642 12.75 17.25 12.75H14.25C13.8358 12.75 13.5 13.0858 13.5 13.5V19.5H4.5V10.6641ZM6.75 12.75C6.33579 12.75 6 13.0858 6 13.5V17.25C6 17.6642 6.33579 18 6.75 18H11.25C11.6642 18 12 17.6642 12 17.25V13.5C12 13.0858 11.6642 12.75 11.25 12.75H6.75ZM7.5 14.25H10.5V16.5H7.5V14.25Z"
                    fill="black"
                  />
                </svg>
              </Link>
              <Link to={"/admin/operators"}>
                <h5 className="h5-navbar-text">Operadores </h5>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 2.25C7.46591 2.25 3.75 5.96591 3.75 10.5V11.6484C3.29633 12.1356 3 12.773 3 13.5C3 14.6959 3.77087 15.6056 4.78125 16.1016C5.63254 19.3013 8.51555 21.75 12 21.75C14.4539 21.75 16.6226 20.6016 17.9766 18.75H18C19.4502 18.75 20.65 17.7267 20.9297 16.3594C21.0775 16.2914 21.212 16.1943 21.3281 16.0781C21.6109 15.7954 21.75 15.3917 21.75 15V11.25C21.75 10.8583 21.6109 10.4546 21.3281 10.1719C21.0454 9.8891 20.6417 9.75 20.25 9.75H20.2031C19.8215 5.56224 16.2821 2.25 12 2.25ZM12 3.75C15.2748 3.75 18.0037 6.10808 18.6094 9.21094C18.4732 9.15947 18.3372 9.12392 18.2109 9.09375C17.6783 8.96651 17.1625 8.93125 16.6875 8.8125C16.2125 8.69375 15.8299 8.52304 15.5391 8.15625C15.2482 7.78946 15 7.16471 15 6H13.5C13.5 7.47955 13.0763 8.07444 12.4453 8.46094C11.8143 8.84743 10.813 8.97737 9.72656 9C8.64008 9.02263 7.52119 8.93812 6.51562 9.14062C6.09129 9.22608 5.65773 9.36043 5.29688 9.63281C5.72776 6.32634 8.57989 3.75 12 3.75ZM14.2031 8.83594C14.258 8.92016 14.3065 9.01718 14.3672 9.09375C14.9201 9.79103 15.6625 10.1031 16.3125 10.2656C16.9625 10.4281 17.5717 10.4726 17.8828 10.5469C17.9808 10.5703 17.9761 10.5798 18 10.5938V15.75V16.5H18.75H19.3125C19.0708 16.9612 18.6076 17.25 18 17.25H13.4297C13.2768 16.8102 12.8669 16.5 12.375 16.5C11.7537 16.5 11.25 17.0037 11.25 17.625C11.25 18.2463 11.7537 18.75 12.375 18.75H15.9844C14.9415 19.6929 13.5503 20.25 12 20.25C9.13547 20.25 6.73982 18.1787 6.14062 15.5156L6.04688 15.0938L5.625 14.9531C4.9264 14.7382 4.5 14.2286 4.5 13.5C4.5 12.8712 5.00212 12.2359 5.4375 12.1172L6 11.9766V11.3906C6 11.0596 6.06701 10.9703 6.16406 10.875C6.26112 10.7797 6.45591 10.6859 6.79688 10.6172C7.47881 10.4799 8.60992 10.5242 9.77344 10.5C10.937 10.4758 12.1857 10.3737 13.2422 9.72656C13.6064 9.5035 13.9375 9.20235 14.2031 8.83594ZM19.5 11.25H20.25V15H19.5V11.25ZM9.375 12C8.75368 12 8.25 12.5037 8.25 13.125C8.25 13.7463 8.75368 14.25 9.375 14.25C9.99632 14.25 10.5 13.7463 10.5 13.125C10.5 12.5037 9.99632 12 9.375 12ZM14.625 12C14.0037 12 13.5 12.5037 13.5 13.125C13.5 13.7463 14.0037 14.25 14.625 14.25C15.2463 14.25 15.75 13.7463 15.75 13.125C15.75 12.5037 15.2463 12 14.625 12Z"
                    fill="black"
                  />
                </svg>
              </Link>
              <Link to={"/admin/reports"}>
                <h5 className="h5-navbar-text">Reportes </h5>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M5.25 2.25C4.83579 2.25 4.5 2.58579 4.5 3V21C4.5 21.4142 4.83579 21.75 5.25 21.75H18.75C19.1642 21.75 19.5 21.4142 19.5 21V7.5C19.5 7.30385 19.4274 7.11464 19.2962 6.96884L19.2891 6.96094L14.7891 2.46094L14.7812 2.45383C14.6354 2.32261 14.4462 2.25 14.25 2.25H5.25ZM6 3.75H13.5V7.5C13.5 7.91421 13.8358 8.25 14.25 8.25H18V20.25H6V3.75ZM15 4.82812L16.9219 6.75H15V4.82812ZM9 9.75C8.58579 9.75 8.25 10.0858 8.25 10.5C8.25 10.9142 8.58579 11.25 9 11.25H15C15.4142 11.25 15.75 10.9142 15.75 10.5C15.75 10.0858 15.4142 9.75 15 9.75H9ZM9 12.75C8.58579 12.75 8.25 13.0858 8.25 13.5C8.25 13.9142 8.58579 14.25 9 14.25H15C15.4142 14.25 15.75 13.9142 15.75 13.5C15.75 13.0858 15.4142 12.75 15 12.75H9ZM9 15.75C8.58579 15.75 8.25 16.0858 8.25 16.5C8.25 16.9142 8.58579 17.25 9 17.25H15C15.4142 17.25 15.75 16.9142 15.75 16.5C15.75 16.0858 15.4142 15.75 15 15.75H9Z"
                    fill="black"
                  />
                </svg>
              </Link>
              <Link to={"/admin/profile"}>
                <h5 className="h5-navbar-text">Mi cuenta </h5>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 3C8.91668 3 6.4 5.57388 6.4 8.72727C6.4 10.6852 7.37631 12.4237 8.85 13.4574C6.21621 14.6033 4.32207 17.1599 4.03723 20.2008C3.99602 20.6407 4.35817 21 4.8 21C5.24183 21 5.59503 20.6402 5.64569 20.2013C6.02289 16.933 8.69138 14.4545 12 14.4545C15.3086 14.4545 17.9771 16.933 18.3543 20.2013C18.405 20.6402 18.7582 21 19.2 21C19.6418 21 20.004 20.6407 19.9628 20.2008C19.6779 17.1599 17.7838 14.6033 15.15 13.4574C16.6237 12.4237 17.6 10.6852 17.6 8.72727C17.6 5.57388 15.0833 3 12 3ZM12 4.63636C14.2186 4.63636 16 6.45824 16 8.72727C16 10.9963 14.2186 12.8182 12 12.8182C9.78139 12.8182 8 10.9963 8 8.72727C8 6.45824 9.78139 4.63636 12 4.63636Z"
                    fill="black"
                  />
                </svg>
              </Link>
              <div style={{ margin: "0px 0px 0px 35px" }}>
                <button className="navbar-button" onClick={handleButtonRigth}>
                  <h4 className="h4-navbar">
                    {user.email
                      ? `Logout`
                      : pathname !== "/register"
                      ? `Register`
                      : `Login`}
                  </h4>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : user.isOperator ? (
        <div>
          {document.querySelector(".navbar").classList.add("special-operator")}{" "}
          <div className="navbar">
            <span></span>
            <div className="div-navbar-text">
              <Link to={"/operator/reservationsList"}>
                <h5 className="h5-navbar-text">Reservas</h5>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M6.75 3C6.33579 3 6 3.33579 6 3.75H3C2.58579 3.75 2.25 4.08579 2.25 4.5V7.5V8.25V19.5C2.25 19.9142 2.58579 20.25 3 20.25H21C21.4142 20.25 21.75 19.9142 21.75 19.5V7.5V6.75V4.5C21.75 4.08579 21.4142 3.75 21 3.75H18C18 3.33579 17.6642 3 17.25 3C16.8358 3 16.5 3.33579 16.5 3.75H7.5C7.5 3.33579 7.16421 3 6.75 3ZM3.75 5.25H6C6 5.66421 6.33579 6 6.75 6C7.16421 6 7.5 5.66421 7.5 5.25H16.5C16.5 5.66421 16.8358 6 17.25 6C17.6642 6 18 5.66421 18 5.25H20.25V6.75H3.75V5.25ZM3.75 8.25H20.25V18.75H3.75V8.25ZM13.5 10.5C13.0858 10.5 12.75 10.8358 12.75 11.25V15.75C12.75 16.1642 13.0858 16.5 13.5 16.5H18C18.4142 16.5 18.75 16.1642 18.75 15.75V11.25C18.75 10.8358 18.4142 10.5 18 10.5H13.5ZM6.3 11.25C6.13431 11.25 6 11.3843 6 11.55V12.45C6 12.6157 6.13431 12.75 6.3 12.75H7.2C7.36569 12.75 7.5 12.6157 7.5 12.45V11.55C7.5 11.3843 7.36569 11.25 7.2 11.25H6.3ZM9.3 11.25C9.13431 11.25 9 11.3843 9 11.55V12.45C9 12.6157 9.13431 12.75 9.3 12.75H10.2C10.3657 12.75 10.5 12.6157 10.5 12.45V11.55C10.5 11.3843 10.3657 11.25 10.2 11.25H9.3ZM14.25 12H17.25V15H14.25V12ZM6.3 14.25C6.13431 14.25 6 14.3843 6 14.55V15.45C6 15.6157 6.13431 15.75 6.3 15.75H7.2C7.36569 15.75 7.5 15.6157 7.5 15.45V14.55C7.5 14.3843 7.36569 14.25 7.2 14.25H6.3ZM9.3 14.25C9.13431 14.25 9 14.3843 9 14.55V15.45C9 15.6157 9.13431 15.75 9.3 15.75H10.2C10.3657 15.75 10.5 15.6157 10.5 15.45V14.55C10.5 14.3843 10.3657 14.25 10.2 14.25H9.3Z"
                    fill="black"
                  />
                </svg>
              </Link>
              <Link to={"/operator/profile"}>
                <h5 className="h5-navbar-text">Mi Cuenta </h5>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 3C8.91668 3 6.4 5.57388 6.4 8.72727C6.4 10.6852 7.37631 12.4237 8.85 13.4574C6.21621 14.6033 4.32207 17.1599 4.03723 20.2008C3.99602 20.6407 4.35817 21 4.8 21C5.24183 21 5.59503 20.6402 5.64569 20.2013C6.02289 16.933 8.69138 14.4545 12 14.4545C15.3086 14.4545 17.9771 16.933 18.3543 20.2013C18.405 20.6402 18.7582 21 19.2 21C19.6418 21 20.004 20.6407 19.9628 20.2008C19.6779 17.1599 17.7838 14.6033 15.15 13.4574C16.6237 12.4237 17.6 10.6852 17.6 8.72727C17.6 5.57388 15.0833 3 12 3ZM12 4.63636C14.2186 4.63636 16 6.45824 16 8.72727C16 10.9963 14.2186 12.8182 12 12.8182C9.78139 12.8182 8 10.9963 8 8.72727C8 6.45824 9.78139 4.63636 12 4.63636Z"
                    fill="black"
                  />
                </svg>
              </Link>
              <div style={{ margin: "0px 0px 0px 35px" }}>
                <button className="navbar-button" onClick={handleButtonRigth}>
                  <h4 className="h4-navbar">
                    {user.email
                      ? `Logout`
                      : pathname !== "/register"
                      ? `Register`
                      : `Login`}
                  </h4>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="navbar">
            {user.email ? (
              <div>
                <Link to={"/client/newReservation"}>
                  <button
                    className="navbar-button"
                    style={{
                      display:
                        pathname === `/client/newReservation` ||
                        pathname.includes(`/client/editReservation`)
                          ? `none`
                          : `flex`,
                    }}
                  >
                    <h4 className="h4-navbar">Reservar</h4>
                  </button>
                </Link>
              </div>
            ) : (
              <div></div>
            )}

            <div className="div-navbar-text">
              {user.email ? (
                <div style={{ display: "flex" }}>
                  <Link to={"/client/reservations"}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <h5 className="h5-navbar-text">Mis reservas</h5>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M6.75 3C6.33579 3 6 3.33579 6 3.75H3C2.58579 3.75 2.25 4.08579 2.25 4.5V7.5V8.25V19.5C2.25 19.9142 2.58579 20.25 3 20.25H21C21.4142 20.25 21.75 19.9142 21.75 19.5V7.5V6.75V4.5C21.75 4.08579 21.4142 3.75 21 3.75H18C18 3.33579 17.6642 3 17.25 3C16.8358 3 16.5 3.33579 16.5 3.75H7.5C7.5 3.33579 7.16421 3 6.75 3ZM3.75 5.25H6C6 5.66421 6.33579 6 6.75 6C7.16421 6 7.5 5.66421 7.5 5.25H16.5C16.5 5.66421 16.8358 6 17.25 6C17.6642 6 18 5.66421 18 5.25H20.25V6.75H3.75V5.25ZM3.75 8.25H20.25V18.75H3.75V8.25ZM13.5 10.5C13.0858 10.5 12.75 10.8358 12.75 11.25V15.75C12.75 16.1642 13.0858 16.5 13.5 16.5H18C18.4142 16.5 18.75 16.1642 18.75 15.75V11.25C18.75 10.8358 18.4142 10.5 18 10.5H13.5ZM6.3 11.25C6.13431 11.25 6 11.3843 6 11.55V12.45C6 12.6157 6.13431 12.75 6.3 12.75H7.2C7.36569 12.75 7.5 12.6157 7.5 12.45V11.55C7.5 11.3843 7.36569 11.25 7.2 11.25H6.3ZM9.3 11.25C9.13431 11.25 9 11.3843 9 11.55V12.45C9 12.6157 9.13431 12.75 9.3 12.75H10.2C10.3657 12.75 10.5 12.6157 10.5 12.45V11.55C10.5 11.3843 10.3657 11.25 10.2 11.25H9.3ZM14.25 12H17.25V15H14.25V12ZM6.3 14.25C6.13431 14.25 6 14.3843 6 14.55V15.45C6 15.6157 6.13431 15.75 6.3 15.75H7.2C7.36569 15.75 7.5 15.6157 7.5 15.45V14.55C7.5 14.3843 7.36569 14.25 7.2 14.25H6.3ZM9.3 14.25C9.13431 14.25 9 14.3843 9 14.55V15.45C9 15.6157 9.13431 15.75 9.3 15.75H10.2C10.3657 15.75 10.5 15.6157 10.5 15.45V14.55C10.5 14.3843 10.3657 14.25 10.2 14.25H9.3Z"
                          fill="black"
                        />
                      </svg>
                    </div>
                  </Link>
                  <Link to={"/client/myAccount"}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <h5 className="h5-navbar-text">Mi Cuenta </h5>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M12 3C8.91668 3 6.4 5.57388 6.4 8.72727C6.4 10.6852 7.37631 12.4237 8.85 13.4574C6.21621 14.6033 4.32207 17.1599 4.03723 20.2008C3.99602 20.6407 4.35817 21 4.8 21C5.24183 21 5.59503 20.6402 5.64569 20.2013C6.02289 16.933 8.69138 14.4545 12 14.4545C15.3086 14.4545 17.9771 16.933 18.3543 20.2013C18.405 20.6402 18.7582 21 19.2 21C19.6418 21 20.004 20.6407 19.9628 20.2008C19.6779 17.1599 17.7838 14.6033 15.15 13.4574C16.6237 12.4237 17.6 10.6852 17.6 8.72727C17.6 5.57388 15.0833 3 12 3ZM12 4.63636C14.2186 4.63636 16 6.45824 16 8.72727C16 10.9963 14.2186 12.8182 12 12.8182C9.78139 12.8182 8 10.9963 8 8.72727C8 6.45824 9.78139 4.63636 12 4.63636Z"
                          fill="black"
                        />
                      </svg>
                    </div>
                  </Link>
                </div>
              ) : (
                <div>
                  {/* {document
                    .querySelector(".navbar")
                    ?.classList.add("special-notLoggedIn")} */}
                  <button
                    className="navbar-button"
                    onClick={() => navigate("/login")}
                    style={{
                      display: pathname === `/index` ? `flex` : `none`,
                    }}
                  >
                    <h4 className="h4-navbar">Login</h4>
                  </button>
                </div>
              )}
              <div style={{ margin: "0px 0px 0px 35px" }}>
                <button className="navbar-button" onClick={handleButtonRigth}>
                  <h4 className="h4-navbar">
                    {user.email
                      ? `Logout`
                      : pathname !== "/register"
                      ? `Register`
                      : `Login`}
                  </h4>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
