import NoPriorityIcon from "../../assets/icons/No-priority.svg"
import LowPriorityIcon from "../../assets/icons/Img - Low Priority.svg"
import MediumPriorityIcon from "../../assets/icons/Img - Medium Priority.svg"
import HighPriorityIcon from "../../assets/icons/Img - High Priority.svg"
import UrgentPriorityIcon from "../../assets/icons/SVG - Urgent Priority colour.svg"

export const priorityObj = {
    4: "Urgent",
    3: "High",
    2: "Medium",
    1: "Low",
    0: "No priority",
  };

  export const priorityIconObj = {
    4: UrgentPriorityIcon,
    3: HighPriorityIcon,
    2: MediumPriorityIcon,
    1: LowPriorityIcon,
    0: NoPriorityIcon,
  };

  export const reversedPriorityObj = {
    Urgent: 4,
    High: 3,
    Medium: 2,
    Low: 1,
    "No priority": 0
  };

  export const getUserInitials = (name) => {
    if (name.split(" ").length === 1) {
      const initials = name.trim().slice(0, 2);
      return initials.toUpperCase();
    } else {
      const words = name.trim().split(/\s+/);
      return words
        .map((word) => word.charAt(0))
        .join("")
        .toUpperCase();
    }
  }
