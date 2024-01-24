// import hooks
// ===================================
import { useEffect } from "react";

// This hook detects clicks outside of specified component & calls corresponding handler function.

export default function useOnClickOutside(ref, handler) {
    useEffect(() => {
        // Define listener function (on click/touch events)
        // ====================
        const listener = (event) => {
            if (!ref.current || ref.current.contains(event.target)) {
                // click/touch originated inside the ref-element --> do nothing
                return;
            } else {
                // Click outside specified component --> fire handler
                handler(event);
            }
        };

        // Add event-listeners for "mousedown" & "touchstart" events (on the document)
        // ====================
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);

        // Cleanup-function ==> to remove event-listeners (when components unmounts ..OR.. when ref/handler dependencies change)
        // ====================
        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };

        // Dependencies of useEffect-hook :-
        // ====================
    }, [ref, handler]);
}
