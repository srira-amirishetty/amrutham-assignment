import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogin,doctorLogin } from "../store/API/Auth";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role:""
  });

  const { data, status, error } = formData.role ==="doctor"? useSelector((state) => state.DoctorLoginAPI) :  useSelector((state) => state.LoginAPI);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formData.role ==="doctor"? dispatch(doctorLogin(formData)):
    dispatch(userLogin(formData));
  };

  useEffect(() => {
    // Navigate based on role after successful login
    if (status === "succeeded" && data && data.length > 0) {
      console.log("API Response Data:", data); // Log the entire data object for inspection

      // Access the first element in the data array
      const userData = data[0];
      console.log("User data:", userData); // Log the first element in the data array
      if (userData) {
        const { role } = userData; // Correctly destructure role from user object
        if (role === "patient") {
          navigate("/doctors"); // Redirect to subscriber page
        } else if (role === "doctor") {
          navigate("/bookedAppointments"); // Redirect to admin page
      } else {
        console.error("User data or role is missing:", userData);
        // Optionally handle the case where user data is missing
      }
    }
  }
  }, [status, data, navigate]);


  return (
    <>
  
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-6 bg-white rounded-lg shadow-md space-y-4">
        <h2 className="text-2xl font-bold text-center">Login</h2>

        <div>
          <Label htmlFor="username" className="pb-1">Name</Label>
          <Input id="username" type="text" placeholder="Enter your name" value={formData.username}
              onChange={handleChange} />
        </div>

        <div>
          <Label htmlFor="password" className="pb-1">Password</Label>
          <Input id="password" type="password" placeholder="Enter your password" value={formData.password}
              onChange={handleChange} />
        </div>

        <div>
          <Label className="pb-1">Role</Label>
          <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="doctor">Doctor</SelectItem>
              <SelectItem value="patient">Patient</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" className="w-full">
          Login
        </Button>
        {status === "loading" && <p>Logging in...</p>}
        {status === "failed" && (
          <p className="text-red-500">Error: {error?.message}</p>
        )}
        <h3 onClick={() => navigate('/register')} className="transition duration-500 ease-in-out transform hover:scale-105" >New user Register Now</h3>
      </form>
      
    </div>

    </>
  )
}

export default App
