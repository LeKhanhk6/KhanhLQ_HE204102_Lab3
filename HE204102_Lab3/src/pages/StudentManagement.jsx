import {useState, useEffect, useContext, useReducer, useMemo,useCallback} from "react";

import { ThemeContext } from "../context/ThemeContext";
import { studentReducer } from "../hooks/studentReducer";
import initialStudents from "../data/student";

import SearchBar from "../components/SearchBar";
import MajorFilter from "../components/MajorFilter";
import StudentCounter from "../components/StudentCounter";
import ThemeToggle from "../components/ThemeToggle";

const majors = [
  "Information Technology",
  "Business Administration",
  "Marketing",
  "Software Engineering",
];

function StudentManagement() {
  const { darkMode } =
    useContext(ThemeContext);

  const [students, dispatch] = useReducer(
    studentReducer,
    [],
    () => {
      const saved =
        localStorage.getItem("students");

      return saved
        ? JSON.parse(saved)
        : initialStudents;
    }
  );

  const [studentName, setStudentName] =
    useState("");

  const [studentAge, setStudentAge] =
    useState("");

  const [studentMajor, setStudentMajor] =
    useState("");

  const [searchTerm, setSearchTerm] =
    useState("");

  const [filterMajor, setFilterMajor] =
    useState("All Majors");

  const [editingId, setEditingId] =
    useState(null);

  useEffect(() => {
    localStorage.setItem(
      "students",
      JSON.stringify(students)
    );
  }, [students]);

  const resetForm = () => {
    setStudentName("");
    setStudentAge("");
    setStudentMajor("");
    setEditingId(null);
  };

  const handleAddStudent = useCallback(() => {
    if (
      !studentName.trim() ||
      !studentAge ||
      !studentMajor
    ) {
      alert("Please fill all fields");
      return;
    }

    dispatch({
      type: "ADD_STUDENT",
      payload: {
        id: Date.now(),
        name: studentName,
        age: Number(studentAge),
        major: studentMajor,
      },
    });

    resetForm();
  }, [studentName, studentAge, studentMajor]);

  const handleDeleteStudent =
    useCallback((id) => {
      dispatch({
        type: "DELETE_STUDENT",
        payload: id,
      });
    }, []);

  const handleEditStudent =
    useCallback((student) => {
      setStudentName(student.name);
      setStudentAge(student.age);
      setStudentMajor(student.major);
      setEditingId(student.id);
    }, []);

  const handleUpdateStudent =
    useCallback(() => {
      if (
        !studentName.trim() ||
        !studentAge ||
        !studentMajor
      ) {
        alert("Please fill all fields");
        return;
      }

      dispatch({
        type: "UPDATE_STUDENT",
        payload: {
          id: editingId,
          name: studentName,
          age: Number(studentAge),
          major: studentMajor,
        },
      });

      resetForm();
    }, [
      editingId,
      studentName,
      studentAge,
      studentMajor,
    ]);

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const searchMatch =
        student.name
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          );

      const majorMatch =
        filterMajor === "All Majors"
          ? true
          : student.major === filterMajor;

      return searchMatch && majorMatch;
    });
  }, [students, searchTerm, filterMajor]);

  return (
    <div
      className={`container ${
        darkMode ? "dark" : "light"
      }`}
    >
      <h1>Student Management</h1>

      <ThemeToggle />

      <div className="form-row">
        <input
          type="text"
          placeholder="Name"
          value={studentName}
          onChange={(e) =>
            setStudentName(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Age"
          value={studentAge}
          onChange={(e) =>
            setStudentAge(e.target.value)
          }
        />

        <select
          value={studentMajor}
          onChange={(e) =>
            setStudentMajor(e.target.value)
          }
        >
          <option value="">
            Select Major
          </option>

          {majors.map((major) => (
            <option
              key={major}
              value={major}
            >
              {major}
            </option>
          ))}
        </select>

        <button
          onClick={
            editingId
              ? handleUpdateStudent
              : handleAddStudent
          }
        >
          {editingId
            ? "Update Student"
            : "Add Student"}
        </button>
      </div>

      <div className="filter-row">
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <MajorFilter
          filterMajor={filterMajor}
          setFilterMajor={setFilterMajor}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Major</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredStudents.map(
            (student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.age}</td>
                <td>{student.major}</td>
                <td>
                  <button
                    onClick={() =>
                      handleEditStudent(
                        student
                      )
                    }
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDeleteStudent(
                        student.id
                      )
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>

      <StudentCounter
        total={filteredStudents.length}
      />
    </div>
  );
}

export default StudentManagement;