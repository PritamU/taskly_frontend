import { CustomTextField } from "@/components/pageComponents/LoginPageComponent/styledComponents";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { IconButtonDark } from "../globalStyledComponents";

const GlobalTextField = ({
  fieldName,
  fieldType,
  fieldValue,
  fieldValueChangeHandler,
  minMaxLength,
  showErrors,
}: {
  fieldName: string;
  fieldValue: { value: string; hasError: boolean; isOptional?: boolean };
  fieldValueChangeHandler: (
    fieldName: string,
    value: string,
    hasError: boolean,
    isOptional?: boolean
  ) => void;
  fieldType: "text" | "email" | "password";
  minMaxLength: { min: number; max: number };
  showErrors: boolean;
}) => {
  const [errorType, setErrorType] = useState<"empty" | "length" | "format">(
    "empty"
  );
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showHiddenInfo, setShowHiddenInfo] = useState<boolean>(false);

  useEffect(() => {
    if (errorType === "empty") {
      setErrorMessage(`Please Enter your ${fieldName}`);
    } else if (errorType === "format") {
      if (fieldType === "email") {
        setErrorMessage(`Invalid Email Format`);
      } else if (fieldType === "password") {
        setErrorMessage(
          `Password must be atleast 8 digits, with atleast one uppercase, one number and one special character`
        );
      }
    } else if (errorType === "length") {
      setErrorMessage(
        `Length must be between ${minMaxLength.min} and ${minMaxLength.max}`
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorType]);

  const onChangeHandler = (value: string) => {
    try {
      let errorCheck = false;
      if (!value) {
        if (fieldValue.isOptional) {
          errorCheck = false;
        } else {
          errorCheck = true;
          setErrorType("empty");
        }
      } else {
        switch (fieldType) {
          case "password":
            const passwordRegex =
              /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!passwordRegex.test(value)) {
              errorCheck = true;
              setErrorType("format");
            }
            break;
          case "text":
            if (
              value.length > minMaxLength.max ||
              value.length < minMaxLength.min
            ) {
              errorCheck = true;
              setErrorType("length");
            }
            break;
          case "email":
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
              errorCheck = true;
              setErrorType("format");
            }
            break;

          default:
            throw new Error("Invalid Field Type!");
        }
      }

      fieldValueChangeHandler(
        fieldName,
        value,
        errorCheck,
        fieldValue.isOptional
      );
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message); // Access `message` safely
      } else {
        console.error("Unknown error occurred");
      }
    }
  };

  return (
    <CustomTextField
      type={fieldType === "password" && !showHiddenInfo ? "password" : "text"}
      fullWidth
      multiline={fieldName === "Description"}
      minRows={3}
      maxRows={3}
      placeholder={fieldName}
      size="small"
      value={fieldValue.value}
      onChange={(e) => {
        onChangeHandler(e.target.value);
      }}
      error={showErrors && fieldValue.hasError}
      helperText={showErrors && fieldValue.hasError && errorMessage}
      slotProps={{
        input: {
          endAdornment:
            fieldType === "password" ? (
              <IconButtonDark
                onClick={() => setShowHiddenInfo(!showHiddenInfo)}
              >
                {showHiddenInfo ? <VisibilityOff /> : <Visibility />}
              </IconButtonDark>
            ) : null,
        },
      }}
    />
  );
};

export default GlobalTextField;
