/* 
Course Buy steps :-

1. Load script .. Razorpay sdk (as per documentation)

2. Create options-object to create Razorpay-modal (on buy-btn click)

3. Options object also has handlers to call.. if payment is successful.

*/

// import hooks & React-tools
// =====================================
import { toast } from "react-hot-toast";

// import API-related modules
// ====================================
import { apiConnector } from "../apiConnector";

// import reducers (from slices)
// ====================================
import { resetCart } from "../../slices/cartSlice";
import { setPaymentLoading } from "../../slices/courseSlice";

// import assets
// ====================================
import rzpLogo from "../../assets/Logo/rzp_logo.png";

// import Endpoints
// =====================================
import { studentEndpoints } from "../apis";

const {
    COURSE_PAYMENT_API,
    COURSE_VERIFY_API,
    SEND_PAYMENT_SUCCESS_EMAIL_API,
} = studentEndpoints;

// Step 1 : Load Script
// ====================================

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;

        // Load & Error handlers
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };

        document.body.appendChild(script);
        // Above statement is equivalent to attaching a <script></script> in HTML document.
    });
}

// Step 2 : Buy Course
// ====================================

export async function buyCourse(
    token,
    courses,
    userDetails,
    navigate,
    dispatch
) {
    // create toast ---------
    const toastId = toast.loading("Loading...");

    try {
        // load script - fire API call ----------
        const response = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        // Condition on API-response ----------
        if (!response) {
            // Handle error
            toast.error("Razorpay SDK failed to load !");
            return;
        }

        // Initiate the order ----------
        const orderResponse = await apiConnector(
            "POST",
            COURSE_PAYMENT_API,
            { courses },
            {
                Authorization: `Bearer ${token}`,
            }
        );

        // Validate the orderResponse ----------
        if (!orderResponse.data.success) {
            throw new Error(orderResponse.data.message);
        }

        // console.log("Printing orderResponse : ", orderResponse);

        // Create options object (to open Razorpay modal) ----------
        const options = {
            key: process.env.RAZORPAY_KEY,
            currency: orderResponse.data.message.currency,
            amount: `${orderResponse.data.message.amount}`,
            order_id: orderResponse.data.message.id,
            name: "StudyNotion",
            description: "Thank You for purchasing the course.",
            image: rzpLogo,
            prefill: {
                name: `${userDetails.firstName}`,
                email: userDetails.email,
            },
            handler: function (response) {
                // send success-mail to user
                sendPaymentSuccessEmail(
                    response,
                    orderResponse.data.message.amount,
                    token
                );

                // verify-payment
                verifyPayment(
                    { ...response, courses },
                    token,
                    navigate,
                    dispatch
                );
            },
        };

        // Create payment-modal ----------
        const paymentObject = new window.Razorpay(options);

        // Open payment-modal ----------
        paymentObject.open();

        // Define actions ---------
        paymentObject.on("payment.failed", function (response) {
            toast.error("oops, payment failed !");
            // console.log(response.error);
        });

        //miss hogya tha
        // const paymentObject = new window.Razorpay(options);
        // paymentObject.open();
        // paymentObject.on("payment.failed", function (response) {
        //     toast.error("oops, payment failed");
        //     console.log(response.error);
        // });
    } catch (error) {
        // console.log("Error in Payment !", error);
        toast.error("Could not make payment !");
    }

    toast.dismiss(toastId);
}

async function sendPaymentSuccessEmail(response, amount, token) {
    try {
        await apiConnector(
            "POST",
            SEND_PAYMENT_SUCCESS_EMAIL_API,
            {
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                amount,
            },
            {
                Authorization: `Bearer ${token}`,
            }
        );
    } catch (error) {
        // console.log("PAYMENT SUCCESS EMAIL error : ", error);
    }
}

// Step 3 : Verify Payment
// ==================================

async function verifyPayment(bodyData, token, navigate, dispatch) {
    // initialise toast ---------
    const toastId = toast.loading("Verifying payment...");
    // start loading ---------
    dispatch(setPaymentLoading(true));

    try {
        // fire API-call (for verifying) --------
        const response = await apiConnector(
            "POST",
            COURSE_VERIFY_API,
            bodyData,
            {
                Authorization: `Bearer ${token}`,
            }
        );

        // Condition over API-response ---------
        if (!response.data.success) {
            throw new Error(response.data.message);
        } else {
            toast.success(
                "Payment Successful ! You are enrolled to the course !"
            );

            // Navigate to Enrolled-courses ---------
            navigate("/dashboard/enrolled-courses");

            // Reset the student's cart --------
            dispatch(resetCart());
        }
    } catch (error) {
        // console.log("PAYMENT VERIFY error : ", error);
        toast.error("Could not verify payment !");
    }

    // dismiss toast ---------
    toast.dismiss(toastId);

    // hide loader --------
    dispatch(setPaymentLoading(false));
}
