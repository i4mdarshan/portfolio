import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import React from "react";

interface navIconCardProps {
  navCardIcon: React.ComponentType<any>;
  navCardLinkURL: string;
  navCardLinkLabel: string;
  navCardDescription: string;
}

const NavIconCard = ({
  navCardIcon: NavCardIcon,
  navCardLinkURL,
  navCardLinkLabel,
  navCardDescription,
}: navIconCardProps) => {
  return (
    <motion.a
      key={navCardLinkLabel}
      href={navCardLinkURL}
      target='_blank'
      rel='noopener noreferrer'
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ duration: 0.05 }}
      className='relative p-6 rounded-2xl glass group'
    >
      <div className='absolute inset-0 rounded-2xl bg-gradient-rainbow opacity-0 group-hover:opacity-10 transition-opacity duration-200' />

      <div className='relative flex items-center gap-4'>
        <div className='w-12 h-12 rounded-xl bg-gradient-rainbow flex items-center justify-center group-hover:shadow-glow transition-all duration-200'>
          <NavCardIcon className='w-6 h-6 text-white' />
        </div>
        <div className='flex-1 text-left'>
          <h3 className='font-display text-lg font-semibold mb-1'>
            {navCardLinkLabel}
          </h3>
          <p className='text-sm text-muted-foreground'>{navCardDescription}</p>
        </div>
        <ArrowRight className='w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all duration-300' />
      </div>
    </motion.a>
  );
};

export default NavIconCard;
