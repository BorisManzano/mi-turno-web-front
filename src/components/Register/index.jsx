import React, { useState } from "react";
import s from "./style.module.scss";
import Eye from "../../assets/Eye";
import Check from "../../assets/Check";
import Wrong from "../../assets/Wrong";
import Close from "../../assets/Close";
import ArrowLeft from "../../assets/ArrowLeft";

export default function Register(params) {
  const [password, setPassword] = useState("");
  const [confirmPswd, setConfirmPswd] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focus, setFocus] = useState(false);
  const [dni, setDNI] = useState("");
  const [checklist, setChecklist] = useState({
    uppercaseLetter: false,
    lowercaseLetter: false,
    oneNumber: false,
    large: false,
  });

  const handleToggleFocus = () => {
    setFocus(!focus);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleInputConfirmPswd = (e) => {
    const newValue = e.target.value;
    setConfirmPswd(newValue);
  };

  const handleInputPassword = (e) => {
    const newValue = e.target.value;
    setPassword(newValue);
    setChecklist({
      uppercaseLetter: /[A-ZÑ]/.test(newValue),
      lowercaseLetter: /[a-zñ]/.test(newValue),
      oneNumber: /\d/.test(newValue),
      large: newValue.length >= 8,
    });
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value.replace(/[^0-9]/g, "");
    setDNI(newValue);
  };

  return (
    <div className={s.divs}>
      <form className={s.f}>
        <div className={s.head}>
          <button className={s.none}>
            <ArrowLeft className={s.none} />
            Back
          </button>
          <h1 className={s.textTittle}>Create account</h1>
        </div>
        <div className={s.inputs}>
          <div className={s.rowForm}>
            <div className={s.allInputs}>
              <label htmlFor="name" className={s.textInputs}>
                Fullname
              </label>
              <input
                type="text"
                name="fullname"
                id="fn"
                placeholder="Name Lastname"
                className={s.inputArea}
              />
            </div>
            <div>
              <label htmlFor="dni" className={s.textInputs}>
                DNI
              </label>
              <input
                type="text"
                id="dni"
                name="dni"
                maxLength="8"
                pattern="[0-9]{1,8}"
                placeholder="9999999"
                value={dni}
                onChange={handleInputChange}
                className={s.inputArea}
              />
            </div>
          </div>
          <div className={s.inputMail}>
            <label htmlFor="email" className={s.textInputs}>
              Email
            </label>
            <input
              type="email"
              name="email"
              id="em"
              placeholder="example_name@example.com"
            />
          </div>
          <div className={s.rowForm}>
            <div>
              <label htmlFor="password" className={s.textInputs}>
                Password
              </label>
              <div
                className={
                  focus && password === confirmPswd
                    ? s.focus
                    : password === ""
                    ? s.inputArea
                    : s.err
                }
              >
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="password"
                  value={password}
                  className={s.inputPassword}
                  onChange={handleInputPassword}
                  onFocus={handleToggleFocus}
                  onBlur={handleToggleFocus}
                />
                <div onClick={handleTogglePassword}>
                  <Eye />
                </div>
              </div>
            </div>
            <div>
              {password !== confirmPswd ? (
                <label htmlFor="password" className={s.textInputsErr}>
                  Confirm Password
                </label>
              ) : (
                <label htmlFor="password" className={s.textInputs}>
                  Confirm Password
                </label>
              )}
              <div
                className={
                  focus && password === confirmPswd
                    ? s.focus
                    : password !== confirmPswd
                    ? s.err
                    : s.inputArea
                }
              >
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="password"
                  id="pswd"
                  placeholder="password"
                  value={confirmPswd}
                  className={s.inputPassword}
                  onChange={handleInputConfirmPswd}
                  onFocus={handleToggleFocus}
                  onBlur={handleToggleFocus}
                />
                <div onClick={handleToggleConfirmPassword}>
                  <Eye />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={s.warning}>
          {password === "" ? (
            <p className={s.marg2}>The password must have:</p>
          ) : (
            <p className={s.marg}>The password must have:</p>
          )}

          <div className={s.bBorder}></div>
          <div className={s.container}>
            <div className={s.rowOne}>
              {password === "" ? (
                <>
                  <div className={s.row3}>
                    <p>ABC</p> <p>One uppercase letter</p>
                  </div>
                  <div className={s.row3}>
                    <p>abc</p> <p>One lowercase letter</p>
                  </div>
                </>
              ) : (
                <>
                  {checklist.uppercaseLetter ? (
                    <div className={s.row1}>
                      <Check /> <p>ABC</p> <p>One uppercase letter</p>
                    </div>
                  ) : (
                    <div className={s.row2}>
                      <Wrong /> <p>ABC</p> <p>One uppercase letter</p>
                    </div>
                  )}
                  {checklist.lowercaseLetter ? (
                    <div className={s.row1}>
                      <Check /> <p>abc</p> <p>One lowercase letter</p>
                    </div>
                  ) : (
                    <div className={s.row2}>
                      <Wrong /> <p>abc</p> <p>One lowercase letter</p>
                    </div>
                  )}
                </>
              )}
            </div>
            <div className={s.rowOne}>
              {password === "" ? (
                <>
                  <div className={s.row3}>
                    <p>123</p> <p>One number</p>
                  </div>
                  <div className={s.row3}>
                    <p>***</p> <p>Minimum 8 characters</p>
                  </div>
                </>
              ) : (
                <>
                  {checklist.oneNumber ? (
                    <div className={s.row1}>
                      <Wrong /> <p>123</p> <p>One number</p>
                    </div>
                  ) : (
                    <div className={s.row2}>
                      <Wrong /> <p>123</p> <p>One number</p>
                    </div>
                  )}
                  {checklist.large ? (
                    <div className={s.row1}>
                      <Check /> <p>***</p> <p>Minimum 8 characters</p>
                    </div>
                  ) : (
                    <div className={s.row2}>
                      <Wrong /> <p>***</p> <p>Minimum 8 characters</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        <button className={s.btnSingIn}>
          <h3>Sign up</h3>
        </button>
        <div className={s.bBorder}></div>
        <button className={s.btnLog}>
          Do you already have an account? Log in.
        </button>
      </form>
    </div>
  );
}
