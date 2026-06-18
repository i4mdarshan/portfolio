const ProjectDetailsSectionTitle = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <h2
      className='mb-4'
      style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: "clamp(1.7rem, 3.5vw, 2.6rem)",
        fontWeight: 700,
        letterSpacing: "-0.025em",
        lineHeight: 1.1,
      }}
    >
      {children}
    </h2>
  );
};

export default ProjectDetailsSectionTitle;
