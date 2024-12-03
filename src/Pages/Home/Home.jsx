import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faUpload } from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import axios from "axios";

function Home() {
  const [files, setFiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/files", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setFiles(response.data.files || []);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    fetchFiles();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const APISHARE = async (event) => {
    const uploadedFile = event.target.files[0];
    if (!uploadedFile) return;

    const formData = new FormData();
    formData.append("file", uploadedFile);

    try {
      await axios.post("http://127.0.0.1:5000/upload", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // Sau khi upload xong, cập nhật lại danh sách file
      const updatedFiles = await axios.get("http://127.0.0.1:5000/files", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setFiles(updatedFiles.data.files || []);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleCopy = (fileId) => {
    navigator.clipboard.writeText(`http://127.0.0.1:5000/download/${fileId}`);
  };

  // Lọc file theo searchTerm
  const filteredFiles = files.filter(
    (file) =>
      file.filename &&
      file.filename.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Phân trang file
  const paginatedFiles = filteredFiles.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div className="p-4 space-y-12">
      <div className="flex items-center justify-between mb-[27px]">
        <p className="text-[30px] font-[700] text-[white] ">
          Welcome Back, Thang
        </p>
        <div className="flex items-center gap-3 border px-4 py-3 rounded-lg w-[350px]">
          <FontAwesomeIcon
            className="text-white text-[20px]"
            icon={faMagnifyingGlass}
          />
          <input
            type="text"
            placeholder="Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="focus:outline-none w-full h-full bg-transparent text-white"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <p className="text-[white] text-[20px] font-[800]">Recently Edited</p>
          <a href="#!" className="text-[#6E47D5] font-[14px] font-[700]">
            View all
          </a>
        </div>

        <Swiper
          slidesPerView={4}
          spaceBetween={40}
          navigation={true}
          modules={[Navigation]}
          className="mt-3"
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            480: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1440: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1460: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
          }}
        >
          {files.slice(0, 5).map((file, index) => (
            <SwiperSlide key={index}>
              <div className="relative">
                <img
                  src={file.preview_url || "/path/to/default-image.jpg"}
                  alt={file.filename}
                  className="w-[270px] h-[250px] object-cover"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div>
        <p className="text-lg font-[700] text-white">Upload Files</p>
        <div className="w-full h-[200px] border rounded-lg flex items-center justify-center text-gray-500 mt-2">
          <div className="flex flex-col items-center gap-2">
            <label
              htmlFor="file-upload"
              className="w-[50px] h-[50px] bg-[#E4DDF4] flex items-center justify-center rounded-full cursor-pointer"
            >
              <FontAwesomeIcon icon={faUpload} />
            </label>
            <label className="text-[18px] text-[white] font-[700]">
              Drag and drop files, or Browse
            </label>
            <label className="text-[14px] text-[white] font-[600]">
              Support zip and rar files
            </label>
          </div>
          <input
            id="file-upload"
            type="file"
            onChange={APISHARE}
            className="hidden"
          />
        </div>
      </div>

      <div>
        <p className="text-lg font-semibold text-[#E4DDF4]">Your Files</p>
        <div className="mt-4">
          <Paper className="w-full overflow-hidden">
            <TableContainer component={Paper} className="shadow-md">
              <Table>
                <TableHead>
                  <TableRow className="bg-gray-100">
                    <TableCell>
                      <strong>Name</strong>
                    </TableCell>
                    <TableCell align="center">
                      <strong>File Size</strong>
                    </TableCell>
                    <TableCell align="center">
                      <strong>Last Modified</strong>
                    </TableCell>
                    <TableCell align="center">
                      <strong>Action</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedFiles.map((file, index) => (
                    <TableRow key={index} hover>
                      <TableCell>{file.filename}</TableCell>
                      <TableCell align="center">{file.file_size}</TableCell>
                      <TableCell align="center">{file.upload_date}</TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleCopy(file.file_id)}
                          disabled={file.link === "N/A"}
                        >
                          Copy Link
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 100]}
              component="div"
              count={filteredFiles.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      </div>
    </div>
  );
}

export default Home;
