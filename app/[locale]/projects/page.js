"use client";
import { useEffect, useState } from "react";
import SummaryCard from "@/components/cards/SummaryCard";
import { Box } from "@mui/material";
import Link from "next/link";
import ProjectOfTheWeek from "@/components/cards/ProjectOfTheWeek";

import CategoryFiltering from "@/components/category/CategoryFiltering";
import LoaderStyle from "@/components/helper/LoaderStyle";
import { useAuth } from "@/context/AuthContext";

const Home = () => {
  const { projects } = useAuth();
  const [data, setData] = useState(projects ?? []);
  const [projectOfWeek, setProjectOFWeek] = useState("");
  useEffect(() => {
    setData(projects);
  }, [projects]);

  // Find project with maximum contributions
  useEffect(() => {
    let max = 0;

    if (data.length > 0) {
      data.forEach((project) => {
        if (project.raised > max) {
          max = project.raised;
          setProjectOFWeek(project); // Update the projectOfWeek variable
        }
      });
    }
  });

  //projects mapping
  const allProjects = projects ? (
    data.length > 0 ? (
      data.map((card) => {
        return (
          <SummaryCard
            key={card.id}
            img={card.url}
            cardUrl={card.id}
            title={card.name}
            raised={card.raised}
            goal={card.goal}
            category={card.category}
            creator={card.creator}
          />
        );
      })
    ) : (
      <Box className="header-4 px-10">No Projects In This Category</Box>
    )
  ) : (
    <Box className="scale-[0.6]">
      <LoaderStyle />
    </Box>
  );

  return (
    <div className="container mx-auto  py-20">
      <ProjectOfTheWeek projectOfWeek={projectOfWeek} />
      <CategoryFiltering data={projects} filtrindData={setData} />
      <Box className="bg-cards-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {allProjects}
      </Box>
    </div>
  );
};

export default Home;
