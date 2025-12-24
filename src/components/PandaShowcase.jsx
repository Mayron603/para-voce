import React from 'react';
import { motion } from 'framer-motion';
import RealisticPanda from './RealisticPanda';

export default function PandaShowcase() {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 
            className="font-dancing text-5xl md:text-6xl text-white mb-4"
            style={{ textShadow: '0 0 30px rgba(255,215,0,0.3)' }}
          >
          Pandas
          </h2>
          <p className="text-yellow-300 font-poppins text-lg">
            Meus companheiros fofos de Natal 🐼
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20">
          {/* Panda with sign */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <RealisticPanda variant="single-with-sign" name="Chata" showSign={true} />
            <p className="mt-4 text-white/70 font-poppins text-sm">
              
            </p>
          </motion.div>

          {/* Panda with rose */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center"
          >
            <RealisticPanda variant="single-with-rose" showRose={true} />
            <p className="mt-4 text-white/70 font-poppins text-sm">
              
            </p>
          </motion.div>
        </div>

        {/* Additional message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-16"
        >
          <p 
            className="font-dancing text-2xl md:text-3xl text-white/80"
            style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}
          >
            "Até que ficou bonito, né? Fui eu que fiz."
          </p>
        </motion.div>
      </div>
    </section>
  );
}