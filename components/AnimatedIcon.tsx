import { motion } from 'framer-motion';

export const AnimatedIcon = ({ icon: Icon }) => (
  <motion.div
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
  >
    <Icon size={24} />
  </motion.div>
);
