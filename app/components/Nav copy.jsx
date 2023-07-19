"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
  Input,
  Button,
} from "@material-tailwind/react";
import { collection, onSnapshot, query } from "firebase/firestore";
import SearchList from "./search/SearchList";
import ProjectForm from "./forms/ProjectForm";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/config/firebase";

import UserSettingsForm from "./forms/UserSettingsForm";

const AddProjectButton = ({ user }) => {
  const [openProjectForm, setOpenProjectForm] = useState(false);

  const handleNewProject = () => {
    setOpenProjectForm(!openProjectForm);
  };

  return (
    <>
      <Button onClick={handleNewProject} color="white">
        New Project
      </Button>
      <ProjectForm
        authUser={user}
        openProjectForm={openProjectForm}
        setOpenProjectForm={setOpenProjectForm}
      />
    </>
  );
};

export default function Nav() {
  const [openNav, setOpenNav] = useState(false);

  const { user } = useAuth();

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-5 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-40">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal text-lg"
      >
        <Link href="/" className="flex items-center text-white">
          Home
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal text-lg"
      >
        <Link href="/projects" className="flex items-center text-white">
          Projects
        </Link>
      </Typography>

      {user ? (
        <>
          <AddProjectButton user={user} />
          <Link href="/profile">Profile</Link>
          <UserSettingsForm />
        </>
      ) : (
        <>
          <Link
            variant="gradient"
            href="/login"
            size="sm"
            className="hidden lg:inline-block bg-orange-500 text-white px-4 py-2 rounded text-lg"
          >
            <span>Login</span>
          </Link>
        </>
      )}
    </ul>
  );
  //
  const [searchProjects, setSearchProjects] = useState();
  const handleSearch = (e) => {
    const q = query(collection(db, "projects"));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let projectsArr = [];
      QuerySnapshot.forEach((doc) => {
        projectsArr.push({ ...doc.data(), id: doc.id });
      });
      if (e.target.value !== "") {
        setSearchProjects(
          projectsArr.filter((project) =>
            project.name.toLowerCase().includes(e.target.value.toLowerCase())
          )
        );
      } else {
        setSearchProjects();
      }
    });
  };

  const [values, setValues] = useState();
  const handleClick = () => {
    setSearchProjects();
    setValues("");
  };

  return (
    <Navbar className="max-w-full rounded-none top-0 left-0 right-0  bg-black py-2 px-4 lg:px-8 lg:py-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center justify-between w-full">
          <Typography className="cursor-pointer py-1.5 font-medium text-white text-lg">
            <Link href="/">Givingly</Link>
          </Typography>

          <div className="relative flex w-full md:w-max mx-5">
            <Input
              onChange={handleSearch}
              onClick={() => setValues()}
              type="search"
              color="white"
              label="Search for projects"
              className=""
              value={values}
              containerProps={{
                className: "min-w-[160px]  lg:w-[350px] ",
              }}
            />

            <div
              onClick={handleClick}
              className={`${
                !searchProjects ? "hidden" : "flex"
              } absolute top-12 w-full`}
            >
              <SearchList searchProjects={searchProjects} />
            </div>
          </div>
          <div className="hidden lg:flex lg:items-center gap-20">{navList}</div>

          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-orange-500 hover:bg-transparent focus:bg-transparent active:bg-orange-500 lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
      </div>
      <Collapse open={openNav}>
        <div className="container mx-auto bg-orange py-2">
          {navList}

          <>
            <Link
              href="/login"
              className=" bg-orange-500 text-white px-4 py-1 rounded"
            >
              Login
            </Link>
          </>
        </div>
      </Collapse>
    </Navbar>
  );
}