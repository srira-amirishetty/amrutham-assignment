import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getAppointmentByDoctorId } from "@/store/API/Appointment";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


export default function AppointmentListForDoctors() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { doctorId } = useParams();
  console.log(doctorId)
  
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchAppointments() {
        const res = await dispatch(getAppointmentByDoctorId({doctorId:doctorId}))
        console.log(res)
        setAppointments(res?.payload)
    }
    fetchAppointments();
    setLoading(false)
  }, [doctorId]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Your Appointments</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        ) : appointments.length === 0 ? (
          <p className="text-muted-foreground">No appointments found.</p>
        ) : (
          <Table>
            <TableCaption>A list of your appointments</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead >Doctor</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Slot</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((appt) => (
                <TableRow key={appt.id}>
                  <TableCell className="font-medium">{appt?.patient?.username}</TableCell>
                  <TableCell>
                    {new Date(appt.date).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell>{appt?.timeSlot}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
