import {
  Box,
  Grid,
  TextField,
  Link,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import { registerService } from "../../Service/RegisterService";
import { useNavigate } from "react-router-dom";
import {
  isAllFieldsValid,
  messages,
  validateEmail,
  validatePassword,
} from "../UserUtils";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface RegisterProps {
  [key: string]: string;
  emailOrPhone: string;
  password: string;
  name: string;
  phone: string;
}

const RegisterForm = () => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [showError, setShowError] = useState("");
  const [errors, setErrors] = useState({
    emailOrPhone: "",
    password: "",
    name: "",
    phone: "",
  });
  const [touched, setTouched] = useState({
    emailOrPhone: false,
    password: false,
    name: false,
    phone: false,
  });
  const navigate = useNavigate();
  const initData = {
    emailOrPhone: "",
    password: "",
    name: "",
    phone: "",
  };
  const [showPassword, setShowPassword] = useState(false);

  const [registerDetails, setRegisterDetails] =
    useState<RegisterProps>(initData);

  const handleItems = (e: any) => {
    setShowError("");
    const inputType = e?.target.name;
    setRegisterDetails((prev) => ({
      ...prev,
      [inputType]: e.target.value,
    }));
  };

  const handleBlur = (e: any) => {
    const field = e.target.name;
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));
  };
  const allFieldsValid = useMemo(
    () => isAllFieldsValid(registerDetails),
    [registerDetails]
  );

  useEffect(() => {
    const newErrors = { emailOrPhone: "", password: "", name: "", phone: "" };

    if (!registerDetails.name && touched.name) {
      newErrors.name = messages.nameRequired;
    } else if (touched.name && registerDetails.name.length < 3) {
      newErrors.name = messages.nameMinLength;
    }

    if (!registerDetails.emailOrPhone && touched.emailOrPhone) {
      newErrors.emailOrPhone = messages.emailRequired;
    } else if (
      touched.emailOrPhone &&
      validateEmail(registerDetails.emailOrPhone)
    ) {
      newErrors.emailOrPhone = messages.emailMatchCase;
    }

    if (!registerDetails.phone && touched.phone) {
      newErrors.phone = messages.phoneRequired;
    } else if (touched.phone) {
      const phone = registerDetails.phone.trim();
      // Check if it's numeric and exactly 10 digits long
      if (phone.length !== 10 || isNaN(Number(phone))) {
        newErrors.phone = messages.phoneInvalid;
      }
    }
    if (!registerDetails.password && touched.password) {
      newErrors.password = messages.passwordRequired;
    } else if (touched.password && validatePassword(registerDetails.password)) {
      newErrors.password = messages.passwordMatchCase;
    }

    setErrors(newErrors);
    console.log(newErrors);
    setIsFormValid(
      !newErrors.emailOrPhone &&
        !newErrors.password &&
        !newErrors.name &&
        !newErrors.phone &&
        allFieldsValid
    );
  }, [registerDetails, touched]);

  const signup = () => {
    if (!allFieldsValid) return;
    const { emailOrPhone, password, phone, name } = registerDetails;

    registerService
      .signup({
        emailId: emailOrPhone,
        password,
        phone,
        fullName: name,
      })
      .catch((e) => {
        if (e.response && e.response.data && e.response.data.message) {
          console.log(e.response.data.message);
          setShowError(e.response.data.message);
        } else {
          console.log("An error occurred:", e.message || e);
        }
      });
  };

  const switchToLogin = () => {
    navigate("/login");
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="current">
      <div className="container-item-head">
        <span className="left-item">Register</span>
        <button
          className="right-item"
          onClick={(e) => {
            e.preventDefault();
            setRegisterDetails(initData);
          }}
        >
          <RefreshIcon />
        </button>
      </div>
      <Box component="form" noValidate sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <TextField
              autoComplete="given-name"
              name="name"
              required
              fullWidth
              id="name"
              label="Name"
              type="text"
              value={registerDetails?.name}
              onChange={(e) => {
                handleItems(e);
                handleBlur(e);
              }}
              error={!!errors.name && touched.name}
              helperText={touched.name ? errors.name : ""}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              autoComplete="given-email"
              name="emailOrPhone"
              required
              fullWidth
              id="email"
              label="Email"
              type="email"
              value={registerDetails?.emailOrPhone}
              onChange={(e) => {
                handleItems(e);
                handleBlur(e);
              }}
              error={!!errors.emailOrPhone && touched.emailOrPhone}
              helperText={touched.emailOrPhone ? errors.emailOrPhone : ""}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              autoComplete="given-phone"
              name="phone"
              required
              fullWidth
              id="phone"
              type="text"
              label="Phone"
              value={registerDetails?.phone}
              onChange={(e) => {
                handleItems(e);
                handleBlur(e);
              }}
              error={!!errors.phone && touched.phone}
              helperText={touched.phone ? errors.phone : ""}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              autoComplete="given-name"
              name="password"
              required
              fullWidth
              id="password"
              type={showPassword ? "text" : "password"}
              label="Password"
              value={registerDetails?.password}
              onChange={(e) => {
                handleItems(e);
                handleBlur(e);
              }}
              error={!!errors.password && touched.password}
              helperText={touched.password ? errors.password : ""}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <button
              className={"add-item-btn"}
              onClick={(e) => {
                e.preventDefault();
                signup();
              }}
              disabled={!isFormValid} // Disable button if form is not valid
            >
              Sign up
            </button>
          </Grid>
          {showError && (
            <Grid item xs={12} sm={12} className="login-error">
              {showError}
            </Grid>
          )}
          <Grid item xs={12} sm={12} className="signup-login-link-holder">
            <Link onClick={switchToLogin}>Login</Link>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default RegisterForm;
