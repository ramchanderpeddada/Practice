import { Box, Stack } from "@mui/material";
import { FieldErrors, useFieldArray, useForm } from "react-hook-form";

let renderCount = 0;

type formValues = {
  username: string;
  email: string;
  channel: string;
  social: {
    facebook: string;
    twitter: string;
  };
  phoneNumbers: string[];
  phNumbers: {
    number: string;
  }[];
  age: number;
  dob: Date;
};

const YoutubeForm = () => {
  const form = useForm<formValues>({
    defaultValues: {
      username: "",
      email: "",
      channel: "",
      social: {
        facebook: "",
        twitter: "",
      },
      phoneNumbers: ["", ""],
      phNumbers: [{ number: "" }],
      age: 0,
      dob: new Date(),
    },
  });
  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    reset,
    formState: { isDirty, isValid, errors, isSubmitting, isSubmitted },
  } = form;

  console.log({ isSubmitted, isSubmitting });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "phNumbers",
  });

  const onSubmit = (data: formValues) => {
    console.log("form submitted", data);
    reset();
  };

  const handleGetValues = () => {
    console.log("get values", getValues());
  };

  const handleSetValue = () => {
    setValue("username", "example");
  };

  const onError = (errors: FieldErrors<formValues>) => {
    console.log("errors", errors);
  };

  // useEffect(() => {
  //   //this is to watch the changes in the form values
  //   const subscription = watch((value) => {
  //     console.log("vvalue in useeffect", value);
  //   });
  //   return () => {
  //     subscription.unsubscribe();
  //   };
  // }, [watch]);

  renderCount++;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
      }}
    >
      <h1>Youtube form ({renderCount / 2})</h1>
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <Stack gap={3} direction={"column"} width={"300px"}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            {...register("username", {
              required: "username is required",
            })}
          />
          {<p>{errors.username?.message}</p>}
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "email is required",
              pattern: {
                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                message: "invalid email format",
              },
              validate: {
                notAdmin: (value) => {
                  return (
                    value !== "admin@example.com" || "admin is not allowed"
                  );
                },
                notBlacklisted: (value) => {
                  return !value.endsWith(".xyz") || "email is blacklisted";
                },
              },
            })}
          />
          {<p>{errors.email?.message}</p>}
          <label htmlFor="channel">Channel</label>
          <input
            type="text"
            id="channel"
            {...register("channel", {
              required: "channel is required",
            })}
          />
          {<p>{errors.channel?.message}</p>}
          <label htmlFor="facebook">Facebook</label>
          <input
            type="text"
            id="facebook"
            {...register("social.facebook", {
              required: "facebook is required",
            })}
          />
          <label htmlFor="twitter">Twitter</label>
          <input
            type="text"
            id="twitter"
            {...register("social.twitter", {
              required: "twitter is required",
            })}
          />
          <label htmlFor="primaryPhoneNumber">Primary Phone Number</label>
          <input
            type="text"
            id="primaryPhoneNumber"
            {...register("phoneNumbers.0")}
          />
          <label htmlFor="secondaryPhoneNumber">Secondary Phone Number</label>
          <input
            type="text"
            id="secondaryPhoneNumber"
            {...register("phoneNumbers.1")}
          />
          <label htmlFor="phoneNumber">List of Phone numbers</label>
          {fields.map((field, index) => {
            return (
              <div key={field.id}>
                <input type="text" {...register(`phNumbers.${index}.number`)} />
                {index > 0 && (
                  <button type="button" onClick={() => remove(index)}>
                    Remove
                  </button>
                )}
              </div>
            );
          })}
          <button type="button" onClick={() => append({ number: "" })}>
            Add Number
          </button>
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            {...register("age", {
              required: "age is required",
              valueAsNumber: true,
              min: {
                value: 18,
                message: "you must be at least 18 years old",
              },
            })}
          />
          {<p>{errors.age?.message}</p>}
          <label htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            id="dob"
            {...register("dob", {
              valueAsDate: true,
              required: "dob is required",
            })}
          />
          {<p>{errors.dob?.message}</p>}
          <button
            type="submit"
            // disabled={!isDirty || !isValid}>
          >
            Submit
          </button>
          <button type="button" onClick={() => reset()}>
            Reset
          </button>
          <button type="button" onClick={handleGetValues}>
            Get Values
          </button>
          <button type="button" onClick={handleSetValue}>
            Set Value
          </button>
        </Stack>
      </form>
    </Box>
  );
};

export default YoutubeForm;
