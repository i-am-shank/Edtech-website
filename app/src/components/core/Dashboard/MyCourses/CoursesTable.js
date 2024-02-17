// import components
// ================================
import "./CoursesTable.css";
import ConfirmationModal from "../../../common/ConfirmationModal";

// import hooks & React-tools
// ================================
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

// import API-call functions
// ================================
import {
    deleteCourse,
    fetchInstructorCourses,
} from "../../../../services/operations/courseDetailsAPI";

// import services
// ================================
import { formatDate } from "../../../../services/formatDate";

// import assets
// ================================
import { FaCheck } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { HiClock } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";

// import constants
// ================================
import { COURSE_STATUS } from "../../../../utils/constants";

export default function CoursesTable({ courses, setCourses }) {
    // initialise hooks
    // ==============
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // states
    // ==============
    const { token } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [confirmationModal, setConfirmationModal] = useState(null);

    // constants
    // ==============
    const TRUNCATE_LENGTH = 30;

    // Handlers
    // ==============
    const handleCourseDelete = async (courseId) => {
        // start loading -----------
        setLoading(true);

        // fire API-call -----------
        await deleteCourse({ courseId: courseId }, token);

        // Fetch courses (by instructor) -----------
        const response = await fetchInstructorCourses(token);

        // condition over API-response -----------
        if (response) {
            setCourses(response);
        }

        // Remove confirmation modal & loading
        setConfirmationModal(null);
        setLoading(false);
    };

    return (
        <div>
            <Table className="courses-table">
                {/* Table heading ----------- */}
                <Thead>
                    <Tr className="courses-table-header-row">
                        <Th className="courses-table-header-heading flex-1">
                            Courses
                        </Th>
                        <Th className="courses-table-header-heading">
                            Duration
                        </Th>
                        <Th className="courses-table-header-heading">Price</Th>
                        <Th className="courses-table-header-heading">
                            Actions
                        </Th>
                    </Tr>
                </Thead>

                {/* Table body ----------- */}
                <Tbody>
                    {courses?.length === 0 ? (
                        <Tr>
                            <Td className="courses-table-no-course">
                                No Courses Found
                            </Td>
                        </Tr>
                    ) : (
                        courses?.map((course) => {
                            return (
                                <Tr
                                    key={course._id}
                                    className="courses-table-body-row"
                                >
                                    {/* Course Details */}
                                    {/* =============== */}
                                    <Td className="courses-table-course-details">
                                        <img
                                            src={course?.thumbnail}
                                            className="courses-table-course-thumbnail"
                                        />
                                        <div className="courses-table-course-text">
                                            <p className="courses-table-course-name">
                                                {course.courseName}
                                            </p>
                                            {/* Trim description conditionally */}
                                            <p className="courses-table-course-desc">
                                                {course.courseDescription.split(
                                                    " "
                                                ).length > TRUNCATE_LENGTH
                                                    ? course.courseDescription
                                                          .split(" ")
                                                          .slice(
                                                              0,
                                                              TRUNCATE_LENGTH
                                                          )
                                                          .join(" ") + "..."
                                                    : course.courseDescription}
                                            </p>
                                            <p className="courses-table-course-creation-time">
                                                Created:{" "}
                                                {formatDate(course.createdAt)}
                                            </p>
                                            {course.status ===
                                            COURSE_STATUS.DRAFT ? (
                                                <p className="courses-table-draft">
                                                    <HiClock size={14} />
                                                    DRAFTED
                                                </p>
                                            ) : (
                                                <p className="courses-table-published">
                                                    <div className="courses-table-published-check">
                                                        <FaCheck size={8} />
                                                    </div>
                                                    PUBLISHED
                                                </p>
                                            )}
                                        </div>
                                    </Td>

                                    {/* Course Duration */}
                                    {/* =============== */}
                                    <Td className="courses-table-course-feature">
                                        2hr 30min
                                    </Td>

                                    {/* Course Price */}
                                    {/* =============== */}
                                    <Td className="courses-table-course-feature">
                                        ₹{course.price}
                                    </Td>

                                    {/* Buttons */}
                                    {/* =============== */}
                                    <Td className="courses-table-course-feature">
                                        <button
                                            disabled={loading}
                                            className="courses-table-edit-btn"
                                            onClick={() => {
                                                navigate(
                                                    `/dashboard/edit-course/${course._id}`
                                                );
                                            }}
                                            title="Edit"
                                        >
                                            <FiEdit2 size={20} />
                                        </button>

                                        <button
                                            disabled={loading}
                                            onClick={() => {
                                                setConfirmationModal({
                                                    text1: "Do you want to delete this course ?",
                                                    text2: "All the data related to the course will be deleted",
                                                    btn1Text: "Delete",
                                                    btn2Text: "Cancel",
                                                    btn1Handler: !loading
                                                        ? () =>
                                                              handleCourseDelete(
                                                                  course._id
                                                              )
                                                        : () => {},
                                                    btn2Handler: !loading
                                                        ? () =>
                                                              setConfirmationModal(
                                                                  null
                                                              )
                                                        : () => {},
                                                });
                                            }}
                                            title="Delete"
                                            className="courses-table-delete-btn"
                                        >
                                            <RiDeleteBin6Line size={20} />
                                        </button>
                                    </Td>
                                </Tr>
                            );
                        })
                    )}
                </Tbody>
            </Table>

            {confirmationModal && (
                <ConfirmationModal modalData={confirmationModal} />
            )}
        </div>
    );
}
