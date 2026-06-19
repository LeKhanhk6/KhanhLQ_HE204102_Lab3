const majors = [
  "Information Technology",
  "Business Administration",
  "Marketing",
  "Software Engineering",
];

function MajorFilter({
  filterMajor,
  setFilterMajor,
}) {
  return (
    <select
      value={filterMajor}
      onChange={(e) =>
        setFilterMajor(e.target.value)
      }
    >
      <option value="All Majors">
        All Majors
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
  );
}

export default MajorFilter;