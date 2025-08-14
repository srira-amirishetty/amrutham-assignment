import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { fetchDoctors } from "../store/API/Doctors";
import { fetchCategories } from "@/store/API/categories";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function DoctorsPage() {

  const [nameFilter, setNameFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const  data = useSelector((state) => state.DoctorsAPI?.getDoctors?.[0].data);
  const totalPages = useSelector((state) => state.DoctorsAPI?.getDoctors?.[0].totalPages);

  const categories = useSelector((state) => state.CategoryAPI?.getCategories?.[0] || []);
  console.log(categories)

  // Fetch categories once
  useEffect(() => {
    dispatch(fetchCategories());
    console.log("category")
  }, []);

  // Fetch doctors whenever filters or page changes
  useEffect(() => {
    dispatch(fetchDoctors({
      search: nameFilter,
      category: categoryFilter,
      page: currentPage
    }));
  }, [dispatch, nameFilter, categoryFilter, currentPage]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Find a Doctor</h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Label htmlFor="name" className="pb-1">Filter by Name</Label>
          <Input
            id="name"
            placeholder="Search doctors..."
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
          />
        </div>

        <div className="flex-1">
          <Label className="pb-1">Category</Label>
          <Select
            value={categoryFilter}
            onValueChange={(value) => setCategoryFilter(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories && categories.map((cat) => (
                <SelectItem key={cat._id} value={cat.name}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Doctor list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        { data && data?.map((doc) => (
          <div
            key={doc.id} onClick={()=> navigate(`/appointment/${doc._id}`)}
            className="p-4 border rounded-lg shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold">{doc.username}</h2>
            <p className="text-gray-500">{doc.specialization}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2 overflow-x-scroll">
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index + 1}
            variant={currentPage === index + 1 ? "default" : "outline"}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </Button>
        ))}
      </div>
    </div>
  );
}

