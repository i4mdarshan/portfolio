import ProjectDetailsPageContainer from "@/components/layout/ProjectDetailsPageContainer";
import ProjectDetailsHeader from "@/components/sections/ProjectDetailsHeader";
import ProjectDetailsHero from "@/components/sections/ProjectDetailsHero";
import ProjectDetailsDivider from "@/components/sections/ProjectDetailsDivider";

const ProjectDetailsPage = () => {
  const pageSubSectionCaption = "Test Project details caption";
  const pageSubSectionTitleFocus = "Lorem ipsum dolor sit amet.";
  const pageSubSectionTitleItalics = "Lorem ipsum dolor sit amet.";
  const pageSubSectionDescription =
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam praesentium qui officia ex? Quidem quis ipsam molestiae tempore totam voluptatum esse ut cumque harum aspernatur aut cum non id repellendus asperiores laudantium nulla consequatur corrupti sunt, repellat pariatur recusandae? Similique necessitatibus minima perspiciatis ullam earum iusto. Ullam aliquam sunt incidunt.";
  return (
    <>
      <ProjectDetailsPageContainer>
        {/* ══ HEADER ════════════════════════════════════════════════════ */}
        <ProjectDetailsHeader />

        {/* ══ HERO ══════════════════════════════════════════════════════════ */}
        <ProjectDetailsHero
          subSectionNavs={[]}
          subSectionCaption={pageSubSectionCaption}
          subSectionTitleFocus={pageSubSectionTitleFocus}
          subSectionTitleItalics={pageSubSectionTitleItalics}
          subSectionDescription={pageSubSectionDescription}
        />

        <ProjectDetailsDivider />
      </ProjectDetailsPageContainer>
    </>
  );
};

export default ProjectDetailsPage;
