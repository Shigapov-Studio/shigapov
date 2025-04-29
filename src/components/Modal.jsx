import { useModalStore } from '../store/modalStore';
import Portal from './Portal';
import '../assets/styles/Modal.css';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Modal() {
  const { isOpen, content, closeModal } = useModalStore();

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'visible';
  }, [isOpen]);

  return (
    <Portal>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="modal"
            initial={{ y: "-100vh" }}
            animate={{ y: 0 }}
            exit={{ y: "-100vh" }}
            transition={{ duration: 0.3 }}
            className="modal"
          >
            <div className="lcontainer">
              <div className="modal__header">
                <span>Shigapov</span>
                <motion.div
                  onClick={closeModal}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.3, ease: "easeOut" }}
                  className="hamburger__wrapper"
                >
                  <span className={`topline ${isOpen && 'activespan'}`}></span>
                  <span className={`topline ${isOpen && 'activespan'}`}></span>
                </motion.div>
              </div>
            </div>
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
}

export default Modal;
