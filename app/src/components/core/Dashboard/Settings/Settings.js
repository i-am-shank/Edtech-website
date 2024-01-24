// import components
// ================================
import "./Settings.css";
import ChangeProfilePicture from "./ChangeProfilePicture";
import EditProfile from "./EditProfile";
import UpdatePassword from "./UpdatePassword";
import DeleteAccount from "./DeleteAccount";

export default function Settings() {
    return (
        <div className="settings-page">
            <h1 className="settings-heading">Edit Profile</h1>

            {/* Change Profile ----------- */}
            <ChangeProfilePicture />

            {/* Edit Profile ----------- */}
            <EditProfile />

            {/* Update Password ----------- */}
            <UpdatePassword />

            {/* Delete Account ----------- */}
            <DeleteAccount />
        </div>
    );
}
