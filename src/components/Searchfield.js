import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

export default function Searchfield() {
  return (
    <div className="search">
      <input
        style={{
          color: "#f0f2f5",
          width: window.innerWidth > 700 ? "300px" : "150px",
        }}
        type="text"
        placeholder="Search..."
      />
      <SearchOutlinedIcon color="primary" />
    </div>
  );
}
