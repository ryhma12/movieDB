import { useEffect } from "react";

const useOutsideClick = (refs, callback) => {
  useEffect(() => {
    const handleClick = (e) => {
      const refContainsTarget = (ref) => ref.current && ref.current.contains(e.target);
      const isOutside = refs.every((ref) => !refContainsTarget(ref));
      
      // if refs do not contain what is clicked, the callback is run.
      if (isOutside) callback();
    };

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [refs, callback]);
};

export { useOutsideClick };
