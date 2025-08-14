import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { deleteAppointment, fetchAppointments } from "../../store/API/Appointment";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";

export default function TimeSlots({ predefinedSlots, bookedSlots, selectedSlot, setSelectedSlot, selectedDate, doctorId }) {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [slotToCancel, setSlotToCancel] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.LoginAPI?.data?.[0]?.user?._id) || [] 
  console.log("user id",userId)

  const handleSlotClick = (slot, isBooked) => {
    if (isBooked) {
      // Open modal for confirmation
      setSlotToCancel(slot);
      setShowCancelModal(true);
    } else {
      // Select slot normally
      setSelectedSlot(slot);
    }
  };

  const confirmCancel = async () => {
    try {
      const res = await dispatch(
        deleteAppointment({
          doctorId,
          userId,
          date: format(selectedDate, "yyyy-MM-dd"),
          timeSlot: slotToCancel,
        })
      ).unwrap();

      setSuccessMessage("Appointment cancelled successfully!");
      setTimeout(() => {
        setSuccessMessage("");
        setShowCancelModal(false);
        
      }, 1500);
      await dispatch(fetchAppointments({doctorId,date:format(selectedDate, "yyyy-MM-dd")}))
    } catch (error) {
      console.error("Cancel failed:", error);
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {predefinedSlots.map((slot) => {
          const isBooked = bookedSlots.includes(slot);
          const isSelected = selectedSlot === slot;
          return (
            <Button
              key={slot}
              variant={
                isBooked ? "outline" : isSelected ? "default" : "outline"
              }
              className={isSelected ? "" : "hover:brightness-95"}
              onClick={() => handleSlotClick(slot, isBooked)}
            >
              {slot} {isBooked && "(Booked)"}
            </Button>
          );
        })}
      </div>

      {/* Cancel Confirmation Modal */}
      <Dialog open={showCancelModal} onOpenChange={setShowCancelModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Appointment</DialogTitle>
          </DialogHeader>
          <p>
            Are you sure you want to cancel the appointment for{" "}
            <strong>{slotToCancel}</strong> on{" "}
            <strong>{format(selectedDate, "PPP")}</strong>?
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCancelModal(false)}>
              No
            </Button>
            <Button variant="destructive" onClick={confirmCancel}>
              Yes, Cancel
            </Button>
          </DialogFooter>
          {successMessage && (
            <p className="text-green-600 mt-3">{successMessage}</p>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
