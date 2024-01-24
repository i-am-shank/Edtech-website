// import React-assets
// ================================
import { toast } from "react-hot-toast";

// import slices
// ================================
import { setLoading, setToken } from "../../slices/authSlice";
import { resetCart } from "../../slices/cartSlice";
import { setUser } from "../../slices/profileSlice";

// import api-connector
// ================================
import { apiConnector } from "../apiConnector";

// import endpoints & it's API-endpoints
// ================================
import { endpoints } from "../apis";
const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API,
} = endpoints;

// send-OTP ===============================
// ========================================
export function sendOtp(email, navigate) {
    return async (dispatch) => {
        // Start loader-animation -----------
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));

        try {
            // API call -------------
            const response = await apiConnector("POST", SENDOTP_API, {
                email,
                checkUserPresent: true,
            });
            console.log("SENDOTP API RESPONSE............", response);
            console.log(response.data.success);

            if (!response.data.success) {
                throw new Error(response.data.message);
            } else {
                // API call is successful.. show success toast
                toast.success("OTP Sent Successfull");
                navigate("/verify-email");
            }
        } catch (error) {
            console.log("SENDOTP API ERROR..........", error);
            toast.error("Could Not Send OTP");
        }

        // stop loader animation -----------
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    };
}

// signUp =================================
// ========================================
export function signUp(
    accountType,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    otp,
    navigate
) {
    return async (dispatch) => {
        // start loading animation ------------
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));

        try {
            // API call -----------
            const response = await apiConnector("POST", SIGNUP_API, {
                accountType,
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                otp,
            });
            console.log("SIGNUP API RESPONSE........", response);

            if (!response.data.success) {
                // API call failed
                console.log("Response isn't success");
                throw new Error(response.data.message);
            } else {
                // API call successful .. success toast
                toast.success("Signup Successful");
                navigate("/login");
            }
        } catch (error) {
            // Some error occured while API call
            // Divert to signup-page
            console.log("SIGNUP API ERROR.........", error);
            toast.error("Signup Failed");
            navigate("/signup");
        }

        // stop the loader ----------
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    };
}

// login ==================================
// ========================================
export function login(email, password, navigate) {
    return async (dispatch) => {
        // start loader ------------
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));

        try {
            // API call ------------
            const response = await apiConnector("POST", LOGIN_API, {
                email,
                password,
            });
            console.log("LOGIN API RESPONSE..........", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            } else {
                // API call successful .. success toast
                toast.success("Login Successful");
                dispatch(setToken(response.data.token));

                // update dp & user
                const userImage = response.data?.user?.image
                    ? response.data.user.image
                    : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;
                dispatch(setUser({ ...response.data.user, image: userImage }));

                // Storing token & user in localStorage
                localStorage.setItem(
                    "token",
                    JSON.stringify(response.data.token)
                );
                localStorage.setItem(
                    "user",
                    JSON.stringify(response.data.user)
                );
            }
        } catch (error) {
            // Error in API-call -----------
            console.log("LOGIN API ERROR..........", error);
            toast.error("Login Failed");
        }

        // stop the loader-animation ------------
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    };
}

// get-password-reset-token ===============
// ========================================
export function getPasswordResetToken(email, setEmailSent) {
    return async (dispatch) => {
        // start loader animation
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));

        try {
            // API call ------------
            const response = await apiConnector("POST", RESETPASSTOKEN_API, {
                email,
            });
            console.log("RESETPASSTOKEN RESPONSE...........", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            } else {
                // API call successful .. success toast
                toast.success("Reset Email Sent");
                setEmailSent(true);
            }
        } catch (error) {
            // Error while API call
            console.log("RESETPASSTOKEN ERROR..........", error);
            toast.error("Failed to send reset email");
        }

        // stop loader animation ------------
        toast.dismiss(toastId);
        dispatch(setLoading(false));
    };
}

// reset-password =========================
// ========================================
export function resetPassword(password, confirmPassword, token) {
    return async (dispatch) => {
        // start loader animation ------------
        dispatch(setLoading(true));

        try {
            // API call -------------
            const response = await apiConnector("POST", RESETPASSWORD_API, {
                password,
                confirmPassword,
                token,
            });
            console.log("RESETPASSWORD RESPONSE : ", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            } else {
                // API call successful .. success toast
                toast.success("Password Reset Successfully");
            }
        } catch (error) {
            // Error in API process
            console.log("RESETPASSWORD ERROR............", error);
            toast.error("Failed to Reset Password");
        }

        // stop loader animation ------------
        dispatch(setLoading(false));
    };
}

// logout =================================
// ========================================
export function logout(navigate) {
    return (dispatch) => {
        // update user, token, cart -----------
        dispatch(setToken(null));
        dispatch(setUser(null));
        dispatch(resetCart());

        // update localStorage ------------
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        // Success toast .. of logged-out ------------
        toast.success("Logged Out");

        // Return to home-page ------------
        navigate("/");
    };
}

// Get password-reset token ================
// =========================================
export function getResetPasswordToken(email, setEmailSent) {
    return async (dispatch) => {
        // Start showing loader
        dispatch(setLoading(true));

        try {
            // Backend API-call
            // (In backend, only email is fetched from body .. so, passing only that.)
            const response = await apiConnector("POST", RESETPASSTOKEN_API, {
                email,
            });
            console.log("RESET PASSWORD TOKEN RESPONSE : ", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            } else {
                // Successful response
                toast.success("Reset-password Email Sent !!");
                // Also update Email, to show in UI
                setEmailSent(email);
            }
        } catch (error) {
            console.log(
                "Some error in Reset-password token API call to backend.",
                error
            );
            toast.error("Failed to send email for resetting password.");
        }

        // Hide the Loader
        dispatch(setLoading(false));
    };
}
