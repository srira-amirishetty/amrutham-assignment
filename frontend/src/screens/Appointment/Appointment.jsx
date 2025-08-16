import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { format, addMonths, startOfMonth, isSameMonth } from "date-fns";
import { fetchAppointments, createAppointment,verifyOtpAndBook,GetMonthStatus } from "../../store/API/Appointment";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import TimeSlots from "./Slots";
import { useNavigate } from "react-router-dom";

export default function BookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [pendingPayload, setPendingPayload] = useState(null);

  const [bookingData, setBookingData] = useState({});

    const fetchMonthData = async (monthDate) => {
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth() + 1; // 1-based
    const res = await dispatch(GetMonthStatus({doctorId,year,month}))
    const map = {};
    res?.payload?.forEach((d) => {
      map[d.date] = d.status;
    });
    setBookingData(map);
  };

  const doctorId = id
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(today));
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isodate,setIsoDate] = useState(null)
  
  useEffect(() => {
    fetchMonthData(currentMonth);
  }, [currentMonth]);

  const dispatch = useDispatch();

  const appointmentsData = useSelector((state) => state.AppointmentAPI);
  const bookedSlots =
    appointmentsData?.getAppointments?.[0] || [];

  const userId = useSelector((state) => state.LoginAPI?.data?.[0]?.user?._id) || []
  const predefinedSlots = ["10-12", "12-2", "2-4", "4-6"];

  useEffect(() => {
    if (selectedDate && doctorId) {
      setLoading(true);
      const dateStr = format(selectedDate, "yyyy-MM-dd");
      dispatch(fetchAppointments({ doctorId, date: dateStr }))
        .finally(() => setLoading(false))
      setSelectedSlot(null);
    }
  }, [selectedDate, doctorId, dispatch]);

  const handleSubmit = async () => {
    if (!selectedDate || !selectedSlot || !doctorId || !userId) return;

    const payload = {
      userId,
      doctorId,
      date: format(selectedDate, "yyyy-MM-dd"),
      timeSlot: selectedSlot,
    };



    try {
    await dispatch(createAppointment(payload)).unwrap?.();
    setPendingPayload(payload); // store for OTP verification
    setShowOtpModal(true); // open modal
  } catch (err) {
    console.error(err);
    alert(typeof err === "string" ? err : "Failed to send OTP");
  }
  };

  const handleVerifyOtp = async () => {
  if (!otp || !pendingPayload) return;

  try {
    await dispatch(verifyOtpAndBook({ ...pendingPayload, otp })).unwrap?.();
    alert("Appointment booked successfully!");
    setShowOtpModal(false);
    setPendingPayload(null);
    setOtp("");

    // Refresh booked slots
    await dispatch(fetchAppointments({ doctorId, date: pendingPayload.date }));
    setSelectedSlot(null);
  } catch (err) {
    console.error(err);
    alert(typeof err === "string" ? err : "Invalid OTP");
  }
};

  const canSubmit = Boolean(selectedDate && selectedSlot && userId && doctorId);

      useEffect(() => {
        if (!selectedDate) return;
          const today = new Date();
           const now = new Date();
  today.setHours(0, 0, 0, 0); // reset time to midnight

  const picked = new Date(selectedDate);
  picked.setHours(0, 0, 0, 0);
          if (picked < today) {
    alert("Date already completed");
    setSelectedDate(null);
  }

if (selectedSlot !== null){
if (picked.getTime() === today.getTime()) {
    const [startHour, endHour] = selectedSlot.split("-").map(Number);
    const currentHour = now.getHours();
    console.log(currentHour)
    const startHour12 = to24Hour(startHour)
    console.log(startHour12)

    if (currentHour >= startHour12) {
      alert(`The ${selectedSlot} slot has already passed`);
      setSelectedSlot(null);
      return;
    }
  }}
    }, [selectedDate,canSubmit,selectedSlot]);

  function to24Hour(hour) {
    if (hour === 12) return 12; 
    if (hour < 9) return hour + 12; 
    return hour; 
  }



  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Book Appointment</h1>

       <div className="flex mb-2" onClick={()=>navigate(`/ListAppointments/${userId}`)} >
         <button className="bg-neutral-950 hover:bg-neutral-900 text-white font-bold py-2 px-4 rounded-lg" onClick={() => history.push("/")} >See All Appointments</button>
       </div>

      <div className="mb-6">

         <Calendar
            className="rounded-lg border p-2"
            month={currentMonth}
            mode="single"
            selected={selectedDate}
            onSelect={(date) => {
              if (date) {
                setSelectedDate(date);
              }
            }}
            onMonthChange={(monthDate) => setCurrentMonth(monthDate)}
            components={{
              DayContent: ({ date }) => {
                      if (!date) return null;
                const dateStr = format(date, "yyyy-MM-dd")
                const status = bookingData[dateStr];
                setIsoDate(status)
                let colorClass = "bg-white";
                if (status === "yellow") colorClass = "bg-yellow-300";
      
                else if (status === "orange") colorClass = "bg-orange-400";
                else if (status === "brown") colorClass = "bg-amber-800 text-white";
                else if (status === "red") colorClass = "bg-red-500 text-white";
                const isSelected =
                selectedDate &&
      
                  date.toDateString() === selectedDate.toDateString();
                const selectedRing = isSelected
      
                  ? "ring-2 ring-blue-500"
                  : "";
                return (
      
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-full ${colorClass} ${selectedRing}`}
                    style={{
                backgroundColor: status || "transparent",
                color: color === "white" ? "black" : "white", // readable text
              }}
                  >
                    {date.getDate()}
                  </div>
                );
              }
           }}
        />
      </div>

      {/* Time Slots */}
      {selectedDate && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">
            Time slots for {format(selectedDate, "PPP")}
          </h2>

          {loading ? (
            <p>Loading slots...</p>
          ) : (
            <TimeSlots predefinedSlots={predefinedSlots} bookedSlots={bookedSlots} selectedSlot={selectedSlot}
            setSelectedSlot={setSelectedSlot} selectedDate={selectedDate} doctorId={doctorId}  />
          )}

          {/* Summary + Submit */}
          <div className="flex items-center justify-between pt-2">
            <div className="text-sm text-muted-foreground">
              {selectedSlot ? (
                <span>
                  Selected:{" "}
                  <strong>
                    {format(selectedDate, "PPP")} • {selectedSlot}
                  </strong>
                </span>
              ) : (
                <span>Select a time slot</span>
              )}
            </div>
            <Button onClick={handleSubmit} disabled={!canSubmit}>
              Book appointment
            </Button>
          </div>
        </div>
      )}

      {showOtpModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
    <div className="bg-white rounded-lg p-6 shadow-lg w-80">
      <h2 className="text-lg font-bold mb-4">Enter OTP</h2>
      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter OTP"
        className="border p-2 w-full rounded mb-4"
      />
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => setShowOtpModal(false)}>
          Cancel
        </Button>
        <Button onClick={handleVerifyOtp}>Verify</Button>
      </div>
    </div>
  </div>
      )}

    </div>
  );
}

