import { forwardRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageSectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
}

const PageSection = forwardRef<HTMLElement, PageSectionProps>(
  ({ children, id, className }, ref) => {
    return (
      <>
        <section ref={ref} id={id} className={cn("py-4 px-6", className)}>
          <div className='container mx-auto max-w-6xl'>{children}</div>
        </section>
      </>
    );
  },
);

export default PageSection;
