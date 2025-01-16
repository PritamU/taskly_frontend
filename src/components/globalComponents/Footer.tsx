import { SOCIALS } from "@/data/constants";
import { IconButton, Paper, Stack } from "@mui/material";
import Link from "next/link";
import { TextDark, TextDarkSecondary } from "./globalStyledComponents";

const Footer = () => {
  return (
    <Stack
      sx={{
        width: "100%",
      }}
      component={Paper}
      gap={".5rem"}
      p={"1rem"}
      alignItems={"center"}
    >
      <Stack
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={"1rem"}
      >
        {SOCIALS.map((social) => {
          return (
            <IconButton
              sx={{ color: "primary.main" }}
              component={"a"}
              key={social.title}
              href={social.link}
              target="_blank"
            >
              <social.icon />
            </IconButton>
          );
        })}
      </Stack>
      <div>
        <TextDarkSecondary textAlign={"center"}>Developed by</TextDarkSecondary>
        <Link
          href={"https://pritamupadhya.site"}
          style={{ textDecoration: "none" }}
          target="_blank"
        >
          <TextDark sx={{ textDecoration: "none", color: "primary.main" }}>
            Pritam Upadhya
          </TextDark>
        </Link>
      </div>
    </Stack>
  );
};

export default Footer;
