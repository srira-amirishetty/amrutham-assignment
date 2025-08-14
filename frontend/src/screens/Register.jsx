import { useState } from 'react'
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { userRegister,doctorRegister } from "../store/API/Auth"; // Fixed spelling of RegisterApi
import { useNavigate } from "react-router-dom";

function Register() {

 const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.RegisterAPI);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
    specialization:""
  });

    const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
    let resultAction

    formData.role === "doctor" ?
     resultAction  = await dispatch(doctorRegister(formData)) :
     resultAction = await dispatch(userRegister(formData))

    // Check if the registration was successful
    if (resultAction.meta.requestStatus === "fulfilled") {
      // Registration succeeded, redirect to login
      navigate("/");
    }
    // If registration failed, the error message will be shown below
  };

  return (
    <>
  
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form className="w-full max-w-md p-6 bg-white rounded-lg shadow-md space-y-4" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-center">Register</h2>

        <div>
          <Label htmlFor="username" className="pb-1">Name</Label>
          <Input id="username" type="text" placeholder="Enter your name" value={formData.username}
              onChange={handleChange} />
        </div>

        <div>
          <Label htmlFor="email" className="pb-1">Email</Label>
          <Input id="email" type="email" placeholder="Enter your email" value={formData.email}
              onChange={handleChange} />
        </div>

        <div>
          <Label htmlFor="password" className="pb-1">Password</Label>
          <Input id="password" type="password" placeholder="Enter your password"  value={formData.password}
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

        {formData.role === "doctor" && (
          <div>
            <Label htmlFor="specialization" className="pb-1">Specialization</Label>
            <Select value={formData.specialization} onValueChange={(value) => setFormData({ ...formData, specialization: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select your Specialization" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Bones">Bone</SelectItem>
              <SelectItem value="Heart">Heart</SelectItem>
               <SelectItem value="Nerves">Nerves</SelectItem>
               <SelectItem value="Skin">Skin</SelectItem>
            </SelectContent>
          </Select>
          </div>
        )}

        <Button type="submit" className="w-full">
          Register
        </Button>
     
       {status === "failed" && (
        <p className="text-red-500">
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">
              Error:{" "}
              {typeof error === "object"
                ? error.Message || JSON.stringify(error)
                : error}
            </span>
          </div>
        </p>
      )}
       </form>
    </div>

    </>
  )
}

export default Register
