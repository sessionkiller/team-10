"use client";
import { IconButton } from "@mui/material";
import {
  Button,
  Dialog,
  Input,
  Checkbox,
  Typography,
} from "@material-tailwind/react";
import { Controller, useForm } from "react-hook-form";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { InformationCircleIcon } from "@heroicons/react/24/solid";

////// These need to be where the new project form button is //////
// const [openDonationForm, setOpenDonationForm] = useState(false);
// const handleDonationForm = () => {
//   openDonationForm === false ? setOpenDonationForm(true) : setOpenDonationForm(false);
// };
// <DonationForm openDonationForm={openDonationForm} setOpenDonationForm={setOpenDonationForm} />
const schema = yup
  .object({
    donation: yup
      .number()
      .min(1, "Donation Amount Can't Be Lower Than 1 Dollar !")
      .typeError("Donation Amount Must Be a Number !")
      .required("Donation Amount is Required !"),
  })
  .required();

const DonationForm = ({ openDonationForm, setOpenDonationForm }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      donation: "",
      charity: false,
      userId: "userId",
      projectId: "projectId",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const donationData = `
        donation: ${data.donation}
        charity: ${data.charity}
        userId: ${data.userId}
        projectId: ${data.projectId}
        `;
    alert(donationData);
    console.log(data);
  };

  const handleClose = () => {
    setOpenDonationForm(false);
  };

  return (
    <div>
      <Dialog open={openDonationForm} size={"md"} className="-z-50">
        <div className="p-6 -z-50">
          <IconButton onClick={handleClose} aria-label="back">
            <ArrowBackIosNewIcon />
          </IconButton>
          <h1 className="lg:text-[40px] md:text-[30px] text-[20px] text-black font-bold mt-3">
            Enter the donation <br />
            amount:
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="grid">
            <Input
              id="donation"
              name="donation"
              placeholder="$1"
              variant="standard"
              {...register("donation")}
            />
            <Typography
              variant="small"
              className="flex items-center gap-1 font-normal mt-2 text-red-800 mb-4"
            >
              {errors.donation && (
                <InformationCircleIcon className="w-4 h-4 -mt-px" />
              )}
              {errors.donation?.message}
            </Typography>
            <div className="flex items-center">
              <label htmlFor="charity">Add 2% for charity ?</label>
              <Controller
                name="charity"
                control={control}
                render={({ field: props }) => (
                  <Checkbox
                    {...props}
                    checked={props.value}
                    onChange={(e) => props.onChange(e.target.checked)}
                  />
                )}
              />
            </div>

            <Button variant="contained" type="submit" className="mt-32">
              Pay Now
            </Button>
          </form>
        </div>
      </Dialog>
    </div>
  );
};

export default DonationForm;