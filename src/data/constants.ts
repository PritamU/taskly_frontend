import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { PriorityTypes } from "./commonTypes";

const APP_NAME = "Taskly";

const TAG_DATA_FOR_FORM = [
  {
    title: "personal",
  },
  {
    title: "work",
  },
  {
    title: "chores",
  },
  {
    title: "study",
  },
  {
    title: "health",
  },
];

const PRIORITY_DATA_FOR_FORM: { title: PriorityTypes }[] = [
  {
    title: "low",
  },
  {
    title: "medium",
  },
  {
    title: "high",
  },
];

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type MuiIconType = OverridableComponent<SvgIconTypeMap<{}, "svg">>;

interface Social {
  title: string;
  link: string;
  icon: MuiIconType;
}

const SOCIALS: Social[] = [
  {
    title: "Github",
    link: "https://github.com/PritamU",
    icon: GitHubIcon,
  },
  {
    title: "LinkedIn",
    link: "https://www.linkedin.com/in/pritam-upadhya/",
    icon: LinkedInIcon,
  },
  {
    title: "Instagram",
    link: "https://www.instagram.com/iampritamupadhya/",
    icon: InstagramIcon,
  },
  {
    title: "Facebook",
    link: "https://www.facebook.com/pritam.casanova/",
    icon: FacebookIcon,
  },
];

export { APP_NAME, PRIORITY_DATA_FOR_FORM, SOCIALS, TAG_DATA_FOR_FORM };
